import React from "react";
import Button from "./Button";

function Form({ reqType, setReqType }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Button
        buttonText={buttonText}
        reqType={reqType}
        setReqType={setReqType}
      ></Button>
      <Button
        buttonText={buttonText}
        reqType={reqType}
        setReqType={setReqType}
      ></Button>
      <Button
        buttonText={buttonText}
        reqType={reqType}
        setReqType={setReqType}
      ></Button>
    </form>
  );
}

export default Form;
