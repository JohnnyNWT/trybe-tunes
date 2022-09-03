import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  state = {
    searchArtist: '',
  };

  handleChange = ({ target }) => {
    console.log(target);
    this.setState({
      searchArtist: target.value,
    });
  };

  render() {
    const { searchArtist } = this.state;
    const MAX_CHARACTER_LENGTH = 2;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <input
            data-testid="search-artist-input"
            type="text"
            name="artista"
            placeholder="Nome do Artista"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ searchArtist.length < MAX_CHARACTER_LENGTH }
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}
