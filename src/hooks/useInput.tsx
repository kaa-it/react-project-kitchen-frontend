import {ChangeEvent, useEffect, useState} from "react";
import {useValidate} from "./useValidate";

export type TRegistrationValid = {
    empty?: boolean;
    min?: number;
    max?: number;
    validName?: boolean;
    email?: boolean;
}

export type TValid = {
    [key: string]: boolean | string
}

export const useInput = (initialValue: string, validations: TRegistrationValid = {}) => {
    const [value, setValue] = useState<string>(initialValue);
    const [dirty, setDirty] = useState<boolean>(false)
    const [isValid, setIsValidInput] = useState<boolean>(false);

    const inputValidation = useValidate(value, validations)
    const {isMin, isName, isMax, isEmail, isEmpty}: TValid = inputValidation;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const onBlur = () => {
        setDirty(true);
    }

    useEffect(() => {
        if (isMin || isMax || isName || isEmail || isEmpty) {
            setIsValidInput(false);
        } else {
            setIsValidInput(true);
        }
    }, [isMax, isMin, isName, isEmpty, isEmail])

    return {
        value,
        dirty,
        onChange,
        onBlur,
        inputValidation,
        isValid
    }

}