import React, { Component } from 'react';
import './App.css';
import {GoogleApiWrapper} from 'google-maps-react';
import FilterList from './List';
import Map from './Map';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        locations: [
          {key: 1, title: 'Spa Park', lat: 50.861667, lng: 15.680833},
          {key: 2, title: 'Norvegian Park', lat: 50.856667, lng: 15.680833},
          {key: 3, title: 'Performing Arts Theatre', lat: 50.8631356, lng: 15.6791264},
          {key: 4, title: 'Schaffgotschs Palace', lat: 50.8647637, lng: 15.6798052},
          {key: 5, title: 'Nature Museum', lat: 50.8645209, lng: 15.6763343},
          {key: 6, title: 'Lutheran Church', lat: 50.865278, lng: 15.683889},
          {key: 7, title: 'Catholic Church', lat: 50.865278, lng: 15.678611}
        ],
        markers: [],
        activeMarker: {},
        infoWindow: new this.props.google.maps.InfoWindow
      };
  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    let self = this;

    let map = new this.props.google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: 50.863789, lng: 15.6788113}
    });

    map.addListener('click', function() {
      self.closeInfoWindow();
    });

    this.state.locations.forEach((location) => {
      let marker = new this.props.google.maps.Marker({
        position: {lat: location.lat, lng: location.lng},
        title: location.title,
        id: location.id,
        map: map,
        animation: this.props.google.maps.Animation.DROP
      });

    this.state.markers.push(marker);

    let self = this;
    marker.addListener('click', function() {
        self.displayInfoWindow(map, marker);
      });
    });

  }

  // highlightMarker = (marker) => {
  //   marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
  // }

  //FUNKCJE LISTENEROW MARKEROW DAC DO MAP??

  displayInfoWindow = (map, marker) => {
    this.setState({activeMarker: marker});

    this.state.infoWindow.open(map, marker)

  }

  closeInfoWindow() {
    this.state.infoWindow.close()
  }




  render() {
    return (
      <div className="app">
              <FilterList locations={this.state.locations} markers={this.state.markers} maps={this.props.google.maps}/>
          <div className="map-container">
            <div id='map' role='application'></div>
          </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyBgQTQWxBfOFSIhHgG6tQvfm0krxQwolXo'})(App);
