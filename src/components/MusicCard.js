import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import ComponentLoading from '../pages/ComponentLoading';
import '../css/Album.css';

export default class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    // console.log(favoriteSongs);
    const isFavorite = favoriteSongs.some((song) => song.trackId === trackId);
    this.setState({
      isFavorite,
    });
  }

  handleClickFavorite = async (track) => {
    const { isFavorite } = this.state;
    this.setState({
      isFavorite: !isFavorite,
    });
    await addSong(track);
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isFavorite } = this.state;

    return (
      isLoading ? <ComponentLoading /> : (
        <div className="container-tracks">
          <hr />
          <h5>
            {trackName}
          </h5>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          {/* <button onClick={ () => this.handleClickFavorite(trackId)} className="button-favorite">
            <i class="bi bi-heart"></i>
            <i class="bi bi-heart-fill"></i>
          </button> */}
          <button
            type="button"
            className={ isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart' }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ () => this.handleClickFavorite(trackId) }
          />
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
