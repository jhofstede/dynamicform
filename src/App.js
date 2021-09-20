import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DynamicForm from "./components/DynamicForm";
import { ToastProvider } from "react-toast-notifications";
import { fetchSchema /*, recipesSelector */ } from "./features/schemaSlice";
import { fetchLayout /*, recipesSelector */ } from "./features/layoutSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // In my opinion these should be combined.
    dispatch(fetchSchema());
    dispatch(fetchLayout());
  }, [dispatch]);
  return (
    <ToastProvider>
      <div className="App">
        <DynamicForm />
      </div>
    </ToastProvider>
  );
};

export default App;
