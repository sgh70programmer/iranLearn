import React, { useState, useReducer, useEffect, useContext } from "react";
import validator from "../../validators/validator";
import AuthContext from "../../context/authContext";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        value: action.value,
        isValid: validator(action.value, action.validations,action.inputType)
      }
    }
    default: {
      return state
      
    }
  }
}

export default function Input(props) {
  const authContext = useContext(AuthContext)
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false
  })
  const { value, isValid } = mainInput;
  const { id, onInputHandler } = props;
  useEffect(() => {
    onInputHandler(id, value, isValid);
  }, [value]);

  const onChangeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      value: event.target.value,
      validations: props.validations,
      inputType:props.type

    })

  }

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.className} ${mainInput.isValid ? "success" : "error"}`}
        onChange={onChangeHandler}
        value={authContext.emptyInput ? "":mainInput.value}
        onFocus={() =>  {
          authContext.setEmptyInput(false)
          mainInput.value = ""
          mainInput.isValid= false
        }}
        
      />
    ) : (
      <textarea
        placeholder={props.placeholder}
        className={`${props.className} ${mainInput.isValid ? "success" : "error"}`}
        onChange={onChangeHandler}
        value={mainInput.value}
      />
    );

  return <div style={{width:"100%"}}>{element}</div>
}
