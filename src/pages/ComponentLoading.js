import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ComponentLoading extends React.Component {
  render() {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
}
