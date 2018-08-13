import React, { Component } from 'react';
import ecsapeRegExp from 'escape-string-regexp';


class FilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      locations: [],
      filteredLocations: [],
      markers: []
    };
  }

//update state from received props
  componentDidMount() {
    this.setState({locations: this.props.locations, markers: this.props.markers });
  }


  filter = (query) => {
    //update query
    this.setState({query: query});

    //if search input is clear
      if (query.length === 0) {
        this.resetQuery();

      } else {
        let filteredLocations = [];
        let filteredMarkers = [];

        const match = new RegExp(ecsapeRegExp(query), 'i');

        //filter locations, add them to the array and update state
        filteredLocations = this.state.locations.filter((location) => match.test(location.title));
        this.setState({locations: filteredLocations});

        //filter markers and add them to an array
        filteredMarkers = this.state.markers.filter((marker) => match.test(marker.title));

        //hide all markers and show only filtered ones, apply animation
        this.state.markers.forEach((marker) => marker.setVisible(false));
        filteredMarkers.forEach((marker) => {
          marker.setVisible(true);
          marker.setAnimation(this.props.maps.Animation.BOUNCE);
        });
      }
  }

  // reset query to show all locations and markers, stop animation
  resetQuery = () => {
    this.setState({query: '', locations: this.props.locations, markers: this.props.markers });
    this.state.markers.forEach((marker) => {
      marker.setVisible(true);
      marker.setAnimation(null);
    });

  }

  // when location is clicked, add animation to corresponding marker and open info window
  handleLocationClick = (location) => {
    let locationKey = location.getAttribute('id');
    let activeMarker = this.state.markers.filter((marker)=>  marker.key == locationKey);

    activeMarker[0].setAnimation(this.props.maps.Animation.BOUNCE)
    setTimeout(activeMarker[0].setAnimation(null), 10000);

    this.props.displayInfoWindow(this.props.map, activeMarker[0]);
  }


  render() {
    return(
      <div className="list-container">
        <h1>Discover Cieplice</h1>
        <input className="location-serach" type="text" placeholder="Search location" tabIndex="0" aria-labelledby="search location" value={this.state.query} onChange={(event)=> this.filter(event.target.value)}/>
        <button onClick={this.resetQuery}>X </button>
        <ul className = "locations-list" aria-label="List of locations">
          {this.state.filteredLocations.length === 0 ? this.state.locations.map(location => (<li id={location.key} key={location.key} tabIndex="0" role="button" onClick={(event) => this.handleLocationClick(event.target)}> {location.title} </li>)) : this.state.filteredLocations.map(location => (<li id={location.key} key={location.key} tabIndex="0" role="button" onClick={(event) => this.handleLocationClick(event.target)} > {location.title} </li>))}
        </ul>
      </div>
    );
  }

}

export default FilterList