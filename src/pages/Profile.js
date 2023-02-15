/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ProfileIcon from '../images/profile-icon1.png';
import { getUser } from '../services/userAPI';
import '../css/Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Profile extends React.Component {
  state = {
    username: '',
    email: '',
    image: '',
    description: '',
  };

  async componentDidMount() {
    const { username, email, image, description } = await getUser();
    this.setState({
      username,
      email,
      image,
      description,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/profile/edit');
  };

  render() {
    const { username, email, image, description } = this.state;
    return (
      <>
        <Header />
        <div className="container-profille">
          <img
            src={ !image ? ProfileIcon : image }
            className="profile-image"
            alt="img profile"
          />
          <div>
            <label htmlFor="profile-name">
              <span className="title-style">Nome:</span>
              {' '}
              <span className="subtitle-style">{ username }</span>
            </label>
          </div>
          <div>
            <label htmlFor="profile-email">
              <span className="title-style">E-mail:</span>
              {' '}
              <span className="subtitle-style">
                { email }
              </span>
            </label>
          </div>
          <div>
            <label htmlFor="profile-description">
              <span className="title-style">Descrição:</span>
              {' '}
              <span className="subtitle-style">{ description }</span>
            </label>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={ this.handleClick }
          >
            Editar Perfil
          </button>
        </div>
      </>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
