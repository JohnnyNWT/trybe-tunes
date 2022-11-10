import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ComponentLoading extends React.Component {
  render() {
    return (
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }
}
