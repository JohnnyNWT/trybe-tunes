import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import ComponentLoading from '../pages/ComponentLoading';
import Logo from '../images/logo2.png';
import ProfileIcon from '../images/profile-icon.png';
import '../css/Header.css';

export default class Header extends React.Component {
  state = {
    username: '',
    image: '',
    isLoading: false,
  };

  async componentDidMount() {
    const { username, image } = await getUser();
    this.setState({
      username,
      image,
    });
  }

  render() {
    const { username, isLoading, image } = this.state;
    return (
      isLoading ? <ComponentLoading />
        : (
          <header data-testid="header-component">
            <div className="container-header">
              <Link to="/">
                <img src={ Logo } className="img-header" alt="logo trybe tunes" />
              </Link>
              <div className="container-profile">
                <Link to="/profile">
                  <img
                    src={ !image ? ProfileIcon : image }
                    className="img-profile"
                    alt="profile icon"
                  />
                </Link>
                <span data-testid="header-user-name" className="username-text">
                  { username }
                </span>
              </div>
            </div>
            <div className="container-links">
              <Link data-testid="link-to-search" className="btn-header" to="/search">
                Pesquisa
              </Link>
              <Link
                data-testid="link-to-favorites"
                className="btn-header"
                to="/favorites"
              >
                Favoritas
              </Link>
              <Link data-testid="link-to-profile" className="btn-header" to="/profile">
                Perfil
              </Link>
            </div>
          </header>
        )
    );
  }
}
