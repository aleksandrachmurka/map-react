import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import FilterList from './List';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        locations: [
          {key: 1, title: 'Spa Park', lat: 50.861667, lng: 15.680833, pageId: '3990181'},
          {key: 2, title: 'Norvegian Park', lat: 50.856667, lng: 15.680833, pageId: '3990147'},
          {key: 3, title: 'Performing Arts Theatre', lat: 50.8631356, lng: 15.6791264, pageId: '1813985' },
          {key: 4, title: 'Schaffgotschs Palace', lat: 50.8647637, lng: 15.6798052, pageId: '1605458'},
          {key: 5, title: 'Nature Museum', lat: 50.8645209, lng: 15.6763343, pageId: '3769108'},
          {key: 6, title: 'Lutheran Church', lat: 50.865278, lng: 15.683889, pageId: '2553194'},
          {key: 7, title: 'Catholic Church', lat: 50.865278, lng: 15.678611, pageId: '2553205'}
        ],
        markers: [],
        infoWindow: new this.props.google.maps.InfoWindow(),
        showList: false,
        map: {}
      };
  }

//initialize map after App mounts
  componentDidMount() {
    this.initMap();
  }

  initMap() {
    let self = this;
	//create new Google Map
    let map = new this.props.google.maps.Map(document.getElementById('map'), {
    	zoom: 15,
    	center: {lat: 50.863789, lng: 15.6788113}
    });
    //click on map closes info window
    map.addListener('click', function() {
    	self.closeInfoWindow();
    });
    //update map state (why setState was too late here?)
    this.state.map = Object.assign({map});
	//create markers based on locations defined in state
    this.state.locations.forEach((location) => {
    	let marker = new this.props.google.maps.Marker({
        	position: {lat: location.lat, lng: location.lng},
        	title: location.title,
        	key: location.key,
        	map: map,
        	animation: this.props.google.maps.Animation.DROP,
        	pageId: location.pageId
      	});
    	//update markers in state
    	this.state.markers.push(marker);
    	// open infowindow when marker is clicked
    	marker.addListener('click', function() {
        	self.displayInfoWindow(map, marker);
      	});
    });
  }

//display infoWindow - func. trigerred by clicking on marker and location from list
	displayInfoWindow = (map, marker) => {
	    this.state.infoWindow.setContent(`<h3>${marker.title}</h3>`)
	    this.state.infoWindow.open(map, marker)
	    this.getWikipediaInfo(marker);
	}

//close info window - triggered by cliking on a map
	closeInfoWindow() {
		this.state.infoWindow.close()
	}

//fetch data from Wikipedia to populate info window
	getWikipediaInfo(marker) {
    	let self = this;
    	let pageId = marker.pageId;
    	let url = 'https://cors-anywhere.herokuapp.com/https://pl.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&pageids=' + pageId;
    	// ew. explaintext=&
    	fetch(url)
    	.then(function(response){
      		return response.json();
    	}).then(function(data){
      		let title = data.query.pages[pageId].title;
      		let content = data.query.pages[pageId].extract;
      		self.state.infoWindow.setContent(`<p>From Wikipedia</p><h3>${title}</h3><p>${content}<p>`);
    	}).catch(function(error){
      		alert('Failed to load Wikipedia resources ' + error);
    	})
  }

  //click on button shows or hides list
  toggleListView = () => {
	this.state.showList ? this.setState({showList: false}) : this.setState({showList: true});
  }

  render() {
    return (
      <div className="app">
              {this.state.showList ? <FilterList tabIndex="0" locations={this.state.locations} markers={this.state.markers} map={this.state.map} maps={this.props.google.maps} displayInfoWindow={this.displayInfoWindow.bind(this)} /> : null}
          <div className="map-container">
          	<button className="toggle-button" onClick={this.toggleListView}> Hide/Show Locations List </button>
            <div id="map" role="application" tabIndex="0"></div>
          </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyBgQTQWxBfOFSIhHgG6tQvfm0krxQwolXo'})(App);