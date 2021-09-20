import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../features/formValuesSlice";
import FormValidation from "../utils/formValidation";
import { useToasts } from "react-toast-notifications";

import Field from "./Field";
import "./DynamicForm.css";

export function DynamicForm() {
  const { addToast } = useToasts();

  const [formState, setFormState] = useState({
    isSubmitting: false,
    isError: false,
    message: "",
    errors: {},
    clientValidaton: true,
  });

  // Getting the Redux State
  const layout = useSelector((state) => state.layout);
  const fields = useSelector((state) => state.schema.fields);
  const formValues = useSelector((state) => state.values);

  const dispatch = useDispatch();

  const validateForm = () => {
    const result = FormValidation(fields, formValues);
    if (result && result.valid === true) {
      setFormState({ ...formState, errors: {}, isError: false });
      return true;
    } else {
      setFormState({
        ...formState,
        errors: result.fieldResults,
        isError: true,
      });
      return false;
    }
  };

  const handleChange = (field, value) => {
    dispatch(setValue({ field: field, value: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState.clientValidaton && !validateForm()) {
      return false;
    }

    setFormState({ ...formState, errors: {}, isSubmitting: true });
    addToast("Submitting", { appearance: "info", autoDismiss: true });

    // If I had move time, I would have moved this to the slices too
    const res = await fetch("http://localhost:3001/api/form", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setFormState({ ...formState, isSubmitting: false });
    const data = await res.json();
    if (!data.hasOwnProperty("error")) {
      addToast("Saved!", { appearance: "success", autoDismiss: true });
      setFormState({ ...formState, message: "" });
    } else {
      addToast("Failed to save", { appearance: "error", autoDismiss: true });
      setFormState({ ...formState, errors: data.error, isError: true });
    }
  };

  const rows = layout.header.rows;

  const errorsForField = (fieldId) => {
    if (!formState.errors) {
      return null;
    }
    const errors = formState.errors[fieldId];

    if (!errors || errors.errors.length === 0) {
      return null;
    } else {
      return errors.errors.join(",");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {rows.map((row, index) => {
          return (
            <div className="fields" key={`row-${index}`}>
              {row.columns.map((column, cindex) => {
                let element = null;
                if (column.type === "field") {
                  let fieldDef = fields.find(
                    (field) => field._id === column.fieldId
                  );
                  element = (
                    <Field
                      value={
                        formValues[column.fieldId]
                          ? formValues[column.fieldId]
                          : null
                      }
                      field={fieldDef}
                      fieldChanged={handleChange}
                      errorMessage={errorsForField(column.fieldId)}
                    />
                  );
                } else if (column.type === "button") {
                  element = <button>{column.label}</button>;
                } else {
                  // Unimplemented type of Input
                  element = <pre>{JSON.stringify(column, null, 3)}</pre>;
                }
                return (
                  <div key={`col-${index}-${cindex}`} className="fieldItem">
                    {element}
                  </div>
                );
              })}
              <hr />
            </div>
          );
        })}
      </form>
      {/* Below is just to be able to verify server-side validation */}
      <input
        type="checkbox"
        checked={formState.clientValidaton}
        onChange={() =>
          setFormState({
            ...formState,
            clientValidaton: !formState.clientValidaton,
          })
        }
      />
      Enable client side form-validaton
      {/* <pre>
          {JSON.stringify(formValues, null, 3)}
          {JSON.stringify(formState, null, 3)}
        </pre> */}
    </div>
  );
}

export default DynamicForm;
