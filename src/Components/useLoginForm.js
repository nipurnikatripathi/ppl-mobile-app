import {useState} from 'react';

const useCustomValue = ({intialValue, error, regEx, validationError}) => {
  const [value, setValue] = useState(intialValue);
  const [errorMessage, setErrorMessage] = useState();

  const validation = (text) => {
    if (!text) {
      console.log('inside if');
      setErrorMessage(error || 'is required');
      return error || 'is required';
    } else if (regEx && !regEx.test(text)) {
      setErrorMessage(validationError || 'is not valid');
      return error || 'is required';
    } else {
      setErrorMessage('');
      setValue(text);
    }
  };
  return [value, setValue, validation, errorMessage];
};
export default useCustomValue;
