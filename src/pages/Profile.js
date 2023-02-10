import React from 'react';
import Header from '../components/Header';
import ProfileIcon from '../images/profile-icon1.png';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  state = {
    username: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      username: user.name,
    });
  }

  render() {
    const { username } = this.state;
    return (
      <>
        <Header />
        <img src={ ProfileIcon } alt="img  profile" />
        <div>
          <h5>Nome</h5>
          <p>{ username }</p>
          <h5>E-mail</h5>
          <p>usuario@usuario.com.br</p>
          <h5>Descrição</h5>
          <p>blablabla</p>
        </div>
      </>
    );
  }
}
