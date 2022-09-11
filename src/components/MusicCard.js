import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import ComponentLoading from '../pages/ComponentLoading';

export default class MusicCard extends React.Component {
  state = {
    isChecked: false,
    isLoading: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    console.log(favoriteSongs);
    const isFavorite = favoriteSongs.some((song) => song.trackId === trackId);
    this.setState({
      isChecked: isFavorite,
    });
  }

  handleClickFavorite = async (track) => {
    this.setState({
      isLoading: true,
    });
    await addSong(track);
    this.setState({
      isLoading: false,
      isChecked: true,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isChecked } = this.state;

    return (
      isLoading ? <ComponentLoading /> : (
        <div>
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
          <label htmlFor="favorites">
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ isChecked }
              onChange={ () => this.handleClickFavorite(trackId) }
            />
          </label>
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
