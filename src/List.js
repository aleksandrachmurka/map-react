import React, { Component } from 'react';
import ecsapeRegExp from 'escape-string-regexp';

class FilterList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			locations: [],
			markers: []
		};
	}

//initialize state from received props
	componentDidMount() {
		this.setState({locations: this.props.locations, markers: this.props.markers });
	}


	filter = (query) => {
		//update query
		this.setState({query: query});

		//if search input is cleared
			if (query.length == 0) {
				//reset state to default - should 'contain' all locations and markers
				this.setState({locations: this.props.locations, markers: this.props.markers });
				//show all markers again and stop animation
				this.state.markers.forEach((marker) => {
					marker.setVisible(true);
					marker.setAnimation(null);
				});

			} else {
				let filteredLocations = [];
				let filteredMarkers = [];

				const match = new RegExp(ecsapeRegExp(query), 'i');

				//filter locations and add them to an array
				filteredLocations = this.state.locations.filter((location) => match.test(location.title));
				//place to add some animation on filtered li elements

				//filter markers and add them to an array
				filteredMarkers = this.state.markers.filter((marker) => match.test(marker.title));
				//hide all markers and show only filtered ones, apply animation
				this.state.markers.forEach((marker) => marker.setVisible(false));
				filteredMarkers.forEach((marker) => {
					marker.setVisible(true);
					marker.setAnimation(this.props.maps.Animation.BOUNCE)
				});
				//update state to show only filtered locations and markers
				this.setState({locations: filteredLocations, markers: filteredMarkers});
			}

	}
	// reset to show all locations and markers
	resetQuery = () => {
		this.setState({query: '', locations: this.props.locations, markers: this.props.markers });
	}

	// to be added
	// handleLocationClick(location) {
	// 	this.setState({locations: location});

	// 	// kliknięcie na lokalizację wymusi akcję klik na markerze (trigger click), plus animacja reszta niewidoczna, do tego ref prop
	// }


	render() {

		return(
			<div className="list-container">
				<h1>Discover Cieplice</h1>
				<input className="location-serach" type="text" value={this.state.query} placeholder="Search" onChange={(event)=> this.filter(event.target.value)}/>
				<button onClick={this.resetQuery}>X </button>
				<ul className = "locations-list">
					{ this.state.locations.map(location => (<li onClick={(event) => this.handleLocationClick(event.target.value)}> {location.title} </li>)) }
				</ul>
			</div>
		);
	}

}

export default FilterList