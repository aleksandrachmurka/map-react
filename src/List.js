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

	componentDidMount() {
		this.setState({locations: this.props.locations, markers: this.props.markers });
	}


	filter = (query) => {

		this.setState({query: query});
		console.log(query.length)

			if (query.length == 0) {
				this.setState({locations: this.props.locations, markers: this.props.markers });

				this.state.markers.forEach((marker) => {
					marker.setVisible(true);
					marker.setAnimation(null);
				});

			} else {
				let filteredLocations = [];
				let filteredMarkers = [];
				const match = new RegExp(ecsapeRegExp(query), 'i');

				filteredLocations = this.state.locations.filter((location) => match.test(location.title));


				filteredMarkers = this.state.markers.filter((marker) => match.test(marker.title));
				this.state.markers.forEach((marker) => marker.setVisible(false));
				filteredMarkers.forEach((marker) => {
					marker.setVisible(true);
					marker.setAnimation(this.props.maps.Animation.BOUNCE)
				});

				this.setState({locations: filteredLocations, markers: filteredMarkers});
			}

	}

	resetQuery = () => {
		this.setState({query: '', locations: this.props.locations, markers: this.props.markers });
	}


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