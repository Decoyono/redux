import React, { Component } from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics';
import {setLyrics} from '../action-creators/lyrics';
import axios from 'axios'

// class Artist extends React.Component {
//

export default class extends Component {
  constructor(props){
    super(props);

    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
  }, store.getState);

    this.handleArtistInput = this.handleArtistInput.bind(this)
    this.handleSongInput = this.handleSongInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmont(){
    this.unsubscribe()
  }

  handleArtistInput(artist){
    this.setState({
      artistQuery: artist
    }
    )
  }

  handleSongInput(song){
    this.setState({
      songQuery: song
    })
  }


  handleSubmit(event) {
    console.log("pleaseeeee", event)
    event.preventDefault();
    if (this.state.artistQuery || this.state.songQuery) {

      axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
        .then(response => {
          console.log("please", response.data.lyric)
          const setLyricsAction = setLyrics(response.data.lyric);
          store.dispatch(setLyricsAction);
        });

    }



  }

  render(){
    return (
      <Lyrics
      text= {this.state.text}
      setArtist= {this.handleArtistInput}
      setSong= {this.handleSongInput}
      artistQuery={this.state.artistQuery}
      songQuery={this.state.songQuery}
      handleSubmit={this.handleSubmit}
      />
    )
  }
}
