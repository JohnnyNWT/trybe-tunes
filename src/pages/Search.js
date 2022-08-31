import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search">Search</div>
      </>
    );
  }
}
