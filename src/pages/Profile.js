import React from 'react';
import Header from '../components/Header';

export default class Profile extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile">Profile</div>
      </>
    );
  }
}
