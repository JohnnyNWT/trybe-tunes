import React from 'react';
import { getUser } from '../services/userAPI';
import ComponentLoading from '../pages/ComponentLoading';

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
            <h2 data-testid="header-user-name">{ userName }</h2>
          </header>
        )
    );
  }
}
