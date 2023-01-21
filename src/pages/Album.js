import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../css/Album.css';

export default class Album extends React.Component {
  state = {
    albumTrackCollection: [],
    nameAlbum: '',
    artistName: '',
    imgAlbum: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const API = await getMusics(id);
    this.setState({
      artistName: API[0].artistName,
      nameAlbum: API[0].collectionName,
      imgAlbum: API[0].artworkUrl100,
      albumTrackCollection: API.filter(({ kind }) => kind === 'song'),
    });
  }

  render() {
    const { albumTrackCollection, nameAlbum, artistName, imgAlbum } = this.state;
    return (
      <>
        <Header />
        <div className="page-album" data-testid="page-album">
          <div className="container-info-album">
            <img src={ imgAlbum } width="290px" alt="imagem do album" />
            <h2 className="name-album" data-testid="album-name">
              {nameAlbum}
            </h2>
            <h3 className="name-artist" data-testid="artist-name">
              {artistName}
            </h3>
          </div>
          <div className="container-track-musics">
            <hr />
            {
              albumTrackCollection.map(({ trackName, previewUrl, trackId }) => (
                <>
                  <MusicCard
                    key={ trackId }
                    trackId={ trackId }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                  />
                  <hr />
                </>
              ))
            }
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
