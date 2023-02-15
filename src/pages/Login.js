import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import ComponentLoading from './ComponentLoading';
import Logo from '../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';

export default class Login extends React.Component {
  state = {
    profileName: '',
    profileEmail: '',
    isLoading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(target.value);
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { profileName, profileEmail } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });
    await createUser({ username: profileName, email: profileEmail });
    history.push('/search');
  };

  render() {
    const { profileName, isLoading } = this.state;
    const minLength = 3;
    return (
      <div className="container-login" data-testid="page-login">
        <img src={ Logo } className="img-logo" alt="logo trybe tunes" />
        <input
          data-testid="login-name-input"
          className="input-login"
          type="text"
          name="profileName"
          placeholder="Insira seu nome"
          onChange={ this.handleChange }
        />
        <input
          data-testid="login-email-input"
          className="input-login"
          type="text"
          name="profileEmail"
          placeholder="Insira seu email"
          onChange={ this.handleChange }
        />
        <button
          data-testid="container-login"
          className="btn btn-outline-success"
          type="button"
          disabled={ profileName.length < minLength }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
        {
          isLoading && <ComponentLoading />
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};
