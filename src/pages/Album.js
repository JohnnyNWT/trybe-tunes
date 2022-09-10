import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  state = {
    albumTrackCollection: [],
    nameAlbum: '',
    artistName: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const API = await getMusics(id);
    this.setState({
      artistName: API[0].artistName,
      nameAlbum: API[0].collectionName,
      albumTrackCollection: API.filter(({ kind }) => kind === 'song'),
    });
  }

  render() {
    const { albumTrackCollection, nameAlbum, artistName } = this.state;
    console.log(albumTrackCollection);
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h2 data-testid="album-name">
            {nameAlbum}
          </h2>
          <h3 data-testid="artist-name">
            {artistName}
          </h3>
          {
            albumTrackCollection.map(({ trackName, previewUrl, trackId }) => (
              <MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
              />
            ))
          }
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
