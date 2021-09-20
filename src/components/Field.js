import React from "react";

const Field = ({ field, fieldChanged, type, value, errorMessage }) => {
    return (
        <div key={field._id}>
            <label htmlFor={field._id}>{field.label}</label>
            <input
                id={field._id}
                name={field.name}
                value={value || ""}
                onChange={e => fieldChanged(field._id, e.target.value)}
            />
            {errorMessage ? <span style={{color: 'red'}}>{errorMessage}</span> : null}
        </div>
    );
};

export default Field;