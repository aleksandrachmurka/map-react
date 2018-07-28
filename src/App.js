import React, { Component } from 'react';
import './App.css';
import List from './List.js';
import Map from './Map.js';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        locations: [
          {}
          {}
          {}
          {}
          {}
        ]
      }
  }

    componentDiDMount() {
      load map
    // <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgQTQWxBfOFSIhHgG6tQvfm0krxQwolXo&callback=initMap"></script>
  }

    }

  render() {
    return (
      <div className="app">
          <div className="list-container">
              <List />
          </div>
          <div className="map-container">
              <Map />
          </div>
      </div>
    );
  }
}

export default App;
