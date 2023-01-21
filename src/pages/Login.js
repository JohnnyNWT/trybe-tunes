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
    isLoading: false,
  };

  handleChange = ({ target }) => {
    this.setState({
      profileName: target.value,
    });
  };

  handleClick = async () => {
    const { profileName } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: profileName });
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
          name="nome"
          placeholder="Insira seu nome"
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
