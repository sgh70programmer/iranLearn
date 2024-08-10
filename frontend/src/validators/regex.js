const testEmail = (value) => {
    const emailPattent = /^[a-z\._0-9]+@[a-z]+\.[a-z]{2,3}$/g
    return emailPattent.test(value)
}
const testPassword = (value) => {
    const passwordPattent = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g
    return passwordPattent.test(value)
}



const testPhoneNumber = (value) => {
    let regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    if (regex.test(value)) {
      return true;
    }
    else {
      return false;
    }
}

const isLength = (value) =>{
  if(value.trim().length){
    return true
  }else{
    return false
  }
}

const minValue = (min, value) =>{
  if(value.trim().length > min){
    return true
  }else{
    return false
  }
}

const maxValue = (max, value) =>{
  if(value.trim().length < max){
    return true
  }else{
    return false
  }
}

const check_username = (username) => {
  let regex = new RegExp("^(?=([^a-zA-Z]*[a-zA-Z]){3})[a-zA-Z0-9._-]{5,20}$")
  if (regex.test(username)) {
    return true;
  }
  else {
    return false;
  }
}




export default {
    testEmail,
    testPassword,
    testPhoneNumber,
    isLength,
    minValue,
    maxValue,
    check_username
}