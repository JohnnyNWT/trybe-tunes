import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import ComponentLoading from '../pages/ComponentLoading';
import Logo from '../images/logo2.png';
import ProfileIcon from '../images/profile-icon.png';
import '../css/Header.css';

export default class Header extends React.Component {
  state = {
    userName: '',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    this.setState({
      userName: user.name,
      isLoading: false,
    });
  }

  render() {
    const { userName, isLoading } = this.state;
    return (
      isLoading ? <ComponentLoading />
        : (
          <header data-testid="header-component">
            <div className="container-header">
              <img src={ Logo } className="img-header" alt="logo trybe tunes"/>
              <div className="container-profile">
                <img src={ ProfileIcon } className="img-profile" alt="profile icon" />
                <span data-testid="header-user-name" className="username-text">{ userName }</span>
              </div>
            </div>
            <div className="container-links">
              <Link data-testid="link-to-search" className="btn-header" to="/search">Pesquisa</Link>
              <Link data-testid="link-to-favorites" className="btn-header" to="/favorites">Favoritas</Link>
              <Link data-testid="link-to-profile" className="btn-header" to="/profile">Perfil</Link>
            </div>
          </header>
        )
    );
  }
}
