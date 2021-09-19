import { Link } from 'react-router-dom';
import ListErrors from '../ListErrors';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../../constants/actionTypes';
import EyeIcon from '../../icons/EyeIcon';
import Input from '../Input/Input';
import registerStyle from './Register.module.css';
import Button from '../Button/Button';
import PropType from 'prop-types';
import { errorPropTypes } from '../../types';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

function Register({ username, password, email, onChangeEmail, onChangePassword, onChangeUsername, onSubmit, onUnload, errors, inProgress }) {
  const [visiblePass, setVisiblePass] = React.useState(true);
  const handleToggleShowPassword = () => {
    setVisiblePass(!visiblePass);
  }
  const handleSubmitForm = (username, email, password) => event => {
    event.preventDefault();
    onSubmit(username, email, password);
  }
  const handleChangeEmail = (event) => onChangeEmail(event.target.value);
  const handleChangePassword = (event) => onChangePassword(event.target.value);
  const handleChangeUserName = (event) => onChangeUsername(event.target.value);
  React.useEffect(() => {
    return () => {
      onUnload();
    }
  }, []);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center mb-10">Зарегистрироваться</h1>
            <p className="text-xs-center">
              <Link className={registerStyle.link} to="/login">
                Уже есть аккаунт?
              </Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={handleSubmitForm(username, email, password)}>
              <fieldset>

                <fieldset className="form-group mb-3">
                  <p className={registerStyle.input__title}>Имя пользователя</p>
                  <Input name='username' type="text" placeholder='Имя пользователя' onChange={handleChangeUserName} />
                </fieldset>

                <fieldset className="form-group mb-3">
                  <p className={registerStyle.input__title}>E-mail</p>
                  <Input name='email' type="email" placeholder='Почтовый адрес' onChange={handleChangeEmail} />
                </fieldset>

                <fieldset className="form-group mb-10">
                  <p className={`${registerStyle.input__title} pl-4`}>Пароль</p>
                  <div className={registerStyle.input__item}>
                    <Input name='password' type={`${visiblePass ? 'password' : 'text'}`} placeholder='Пароль' onChange={handleChangePassword} />
                    <div className={registerStyle.input__icon}><EyeIcon type={`${!visiblePass ? 'primary' : 'secondary'}`} onClick={handleToggleShowPassword} /></div>
                  </div>
                </fieldset>
                <Button type="submit" disabled={inProgress}>Зарегистрироваться</Button>
              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  username: PropType.string.isRequired,
  password: PropType.string.isRequired,
  email: PropType.string.isRequired,
  onChangeEmail: PropType.func.isRequired,
  onChangePassword: PropType.func.isRequired,
  onChangeUsername: PropType.func.isRequired,
  onSubmit: PropType.func.isRequired,
  onUnload: PropType.func.isRequired,
  errors: errorPropTypes,
  inProgress: PropType.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
