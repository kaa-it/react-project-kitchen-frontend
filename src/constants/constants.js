const EMAIL_VALUE_ERROR = 'Проверьте правильность введенного email';
const EMPTY_VALUE_ERROR = 'Поле не должно быть пустым';
const MIN_VALUE_ERROR = 'Проверьте минимальную длинну поля';
const MAX_VALUE_ERROR = 'Проверьте максимальную длинну поля';
const NAME_VALUE_ERROR = 'Проверьте правильность введенного имени. Имя может содержать только английские буквы';

const EMAIL_REG_EXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NAME_REG_EXP =  /^[a-z ,.'-]+$/i;

export {
    EMPTY_VALUE_ERROR,
    EMAIL_VALUE_ERROR,
    MIN_VALUE_ERROR,
    MAX_VALUE_ERROR,
    NAME_VALUE_ERROR,
    EMAIL_REG_EXP,
    NAME_REG_EXP
}