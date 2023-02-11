import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ProfileIcon from '../images/profile-icon1.png';
import { getUser, updateUser } from '../services/userAPI';
import '../css/ProfileEdit.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ProfileEdit extends React.Component {
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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { username, email, image, description } = this.state;
    const { history } = this.props;
    await updateUser({ username, email, image, description });
    history.push('/profile');
  };

  render() {
    const {
      username,
      email,
      image,
      description,
    } = this.state;
    return (
      <>
        <Header />
        <form data-testid="page-profile-edit" className="page-profile-edit">
          <label htmlFor="img" className="label-profile-edit">
            <div className="input-link">
              <img
                src={ !image ? ProfileIcon : image }
                alt="profile img"
                className="img-profile-edit"
              />
              <input
                className="form-control"
                type="text"
                data-testid="edit-input-image"
                id="img"
                alt="img"
                name="image"
                value={ image }
                onChange={ this.handleChange }
                placeholder="insira um Link valido"
              />
            </div>
          </label>
          <label htmlFor="name" className="label-profile-edit">
            <span className="title-style">Nome</span>
            <input
              type="text"
              data-testid="edit-input-name"
              id="name"
              name="username"
              value={ username }
              onChange={ this.handleChange }
              className="form-control"
            />
          </label>
          <label htmlFor="email" className="label-profile-edit">
            <span className="title-style">Email</span>
            <input
              className="form-control"
              type="email"
              data-testid="edit-input-name"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description" className="label-profile-edit">
            <span className="title-style">Descrição</span>
            <textarea
              className="form-control"
              cols="25"
              rows="3"
              data-testid="edit-input-name"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="edit-button-save"
            onClick={ this.handleClick }
            className="btn btn-outline-primary"
          >
            Salvar
          </button>
        </form>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
