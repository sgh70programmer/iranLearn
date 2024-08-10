import rules from "./rules";
import regex from "./regex";


const validator = (value, validations, inputType) => {

  let validationResults = [];
  let validationEmail = false;

  for (const validator of validations) {
    if (validator.value === rules.requiredValue) {
      value.trim().length === 0 && validationResults.push(false);
    }
    if (validator.value === rules.minValue) {
      value.trim().length < validator.min && validationResults.push(false);
    }
    if (validator.value === rules.maxValue) {
      value.trim().length > validator.max && validationResults.push(false);
    }
    if (validator.value === rules.emailValue) {
        if(regex.testEmail(value)){
          validationEmail = true
        }
    }
    if (validator.value === rules.phoneValue) {
        if(!regex.testPhoneNumber(value)){
          validationResults.push(false)
        }
    }
  }

  if(value.trim().includes("@") || inputType =="email"){
    return validationEmail
  }else{
    if(validationResults.length){
      return false
    }else{
      return true
    }
  }
 
};

export default validator;
