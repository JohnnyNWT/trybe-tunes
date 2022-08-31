import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import ComponentLoading from './ComponentLoading';

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
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          name="nome"
          placeholder="Insira seu nome"
          onChange={ this.handleChange }
        />
        <button
          data-testid="login-submit-button"
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
