import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Search.css';

export default class Search extends React.Component {
  state = {
    searchArtist: '',
    savedArtist: '',
    albuns: [],
  };

  handleChange = ({ target }) => {
    this.setState({
      searchArtist: target.value,
    });
  };

  handleSearch = async () => {
    const { searchArtist } = this.state;
    const API = await searchAlbumsAPI(searchArtist);
    this.setState({
      savedArtist: searchArtist,
      albuns: API,
      searchArtist: '',
    });
  };

  render() {
    const { searchArtist, savedArtist, albuns } = this.state;
    const MAX_CHARACTER_LENGTH = 2;
    return (
      albuns.length > 0 ? (
        <div>
          <Header />
          <div data-testid="page-search" className="container-search">
            <input
              data-testid="search-artist-input"
              className="input-search"
              type="text"
              name="artista"
              placeholder="Nome do Artista"
              onChange={ this.handleChange }
            />
            <button
              data-testid="search-artist-button"
              className="btn btn-primary"
              type="button"
              onClick={ this.handleSearch }
              disabled={ searchArtist.length < MAX_CHARACTER_LENGTH }
            >
              Pesquisar
            </button>
          </div>
          <h2 className="text-result">
            {`Resultado de álbuns de: ${savedArtist}`}
          </h2>
          <div className="centralizar-albuns">
            <div className="container-cards">
              {
                albuns.map((album) => (
                  <Link
                    key={ album.collectionId }
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    <div className="card">
                      <img
                        src={ album.artworkUrl100 }
                        className="card-img-top"
                        alt={ album.collectionName }
                      />
                      <div className="card-body">
                        <h5 className="card-title">{album.collectionName}</h5>
                        <p className="card-text">{album.artistName}</p>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      )
        : (
          <>
            <Header />
            <div data-testid="page-search" className="container-search">
              <input
                data-testid="search-artist-input"
                className="input-search"
                type="text"
                name="artista"
                placeholder="Nome do Artista"
                onChange={ this.handleChange }
              />
              <button
                data-testid="search-artist-button"
                className="btn btn-primary"
                type="button"
                onClick={ this.handleSearch }
                disabled={ searchArtist.length < MAX_CHARACTER_LENGTH }
              >
                Pesquisar
              </button>
            </div>
          </>
        )
    );
  }
}
