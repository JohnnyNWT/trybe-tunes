import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../css/Favorites.css';

export default class Favorites extends React.Component {
  state = {
    favorite: [],
  };

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favorite: [...favoriteSongs],
    });
  }

  render() {
    const { favorite } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites" className="page-title">Músicas Favoritas: </div>
        <div className="tracks">
          {
            favorite.map(({ trackId, previewUrl, trackName }) => (
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
      </>
    );
  }
}
