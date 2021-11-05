import {useEffect, useState} from "react";
import {
  EMPTY_VALUE_ERROR,
  EMAIL_VALUE_ERROR,
  NAME_VALUE_ERROR,
  MIN_VALUE_ERROR,
  MAX_VALUE_ERROR,
  EMAIL_REG_EXP, NAME_REG_EXP
} from "../constants/constants";

export const useValidate = (value: string, validations: { [key: string]: string | number | boolean}) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isMin, setIsMin] = useState(false);
  const [isMax, setIsMax] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isName, setIsName] = useState(false);
  const [inputError, setInputError] = useState<string>('');

  useEffect(() => {
    validationLoop:
      for (const validation in validations) {
        if (validation === "email") {
          if (!EMAIL_REG_EXP.test(String(value).toLowerCase())) {
            console.log(!EMAIL_REG_EXP.test(String(value).toLowerCase()))
            setInputError(EMAIL_VALUE_ERROR);
            setIsEmail(true);
            break validationLoop;
          } else {
            setIsEmail(false);
            setInputError('');
          }
          ;
        } else if (validation === "min") {
          if (value.length < validations[validation]) {
            setIsMin(true);
            setInputError(MIN_VALUE_ERROR);
            break validationLoop;
          } else {
            setIsMin(false);
            setInputError('');
          }
        } else if (validation === "max") {
          if (value.length > validations[validation]) {
            setIsMax(true);
            setInputError(MAX_VALUE_ERROR);
            break validationLoop;
          } else {
            setIsMax(false);
            setInputError('');
          }
        } else if (validation === "empty") {
          if (!value) {
            setIsEmpty(true);
            setInputError(EMPTY_VALUE_ERROR);
            break validationLoop;
          } else {
            setIsEmpty(false);
            setInputError('');
          }
        } else if (validation === "validName") {
          if (!NAME_REG_EXP.test(String(value))) {
            setIsName(true);
            setInputError(NAME_VALUE_ERROR)
            break validationLoop;
          } else {
            setIsName(false);
            setInputError('')
          }
        }
      }
  }, [value]);


  return {
    isEmail,
    isEmpty,
    isMax,
    isName,
    isMin,
    inputError
  }
}