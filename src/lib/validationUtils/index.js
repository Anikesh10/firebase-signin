/**
 * Validate Text
 */

class ValidationUtils {
  checkIfspecialChar = (value) => {
    let regex = /[\\/=?`<>]/g;
    return regex.test(value);
  };

  validateEmail = (email) => {
    let re = /^([a-z0-9.\-_]+@[a-z0-9]+(\.[a-z]+)?\.[a-z]+)$/i;
    return re.test(String(email).toLowerCase());
  };

  checkIfEmptyField = (value) => {
    let re = /^$/;
    return re.test(value);
  };

  checkIfWhiteSpace = (value) => {
    if (typeof value !== "number" && value && value.trim().length === 0) {
      let re = /^\s/;
      return re.test(value);
    }
  };

  checkContactNumber = (value) => {
    let re = /^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/;
    return !re.test(value);
  };

  validatePassword = (password) => {
    // minimum eight characters, at least one uppercase letter, one lowercase letter and one special character
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  // By default max file size 5mb
  compareFileSize = (currentFileSizeInBytes, maximumFileSizeInMb = 5) => {
    //Convert mb to bytes
    let maxSizeInByte = maximumFileSizeInMb * Math.pow(2, 20);
    return !!(currentFileSizeInBytes < maxSizeInByte);
  };

  validateNumber = (value) => {
    let re = /^[0-9]*$/;
    return re.test(value);
  };
}

export default new ValidationUtils();
