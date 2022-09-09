import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  state = {
    searchArtist: '',
    savedArtist: '',
    albuns: [],
    naoEncontrado: false,
  };

  handleChange = ({ target }) => {
    this.setState({
      searchArtist: target.value,
    });
  };

  handleSearch = async () => {
    const { searchArtist } = this.state;
    this.setState({
      naoEncontrado: false,
    });
    const API = await searchAlbumsAPI(searchArtist);
    this.setState({
      savedArtist: searchArtist,
      albuns: API,
      searchArtist: '',
    });
    if (API.length === 0) {
      this.setState({ naoEncontrado: true });
    }
  };

  render() {
    const { searchArtist, savedArtist, albuns, naoEncontrado } = this.state;
    const MAX_CHARACTER_LENGTH = 2;
    return (
      albuns.length > 0 ? (
        <div>
          <Header />
          <div data-testid="page-search">
            <input
              data-testid="search-artist-input"
              type="text"
              name="artista"
              placeholder="Nome do Artista"
              value={ searchArtist }
              onChange={ this.handleChange }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              onClick={ this.handleSearch }
              disabled={ searchArtist.length < MAX_CHARACTER_LENGTH }
            >
              Pesquisar
            </button>
          </div>
          <h2>
            {`Resultado de álbuns de: ${savedArtist}`}
          </h2>
          {

            albuns.map((album) => (
              <Link
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                <section>
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <h3>{ album.collectionName }</h3>
                  <p>{ album.artistName }</p>
                </section>
              </Link>
            ))
          }
        </div>
      )
        : (
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
                onClick={ this.handleSearch }
                disabled={ searchArtist.length < MAX_CHARACTER_LENGTH }
              >
                Pesquisar
              </button>
              {naoEncontrado && <h2>Nenhum álbum foi encontrado</h2>}
            </div>
          </>
        )
    );
  }
}
