import React, { Component } from 'react';
import ecsapeRegExp from 'escape-string-regexp';

class FilterList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			locations: [],
			markers: []
		}
	}

	componentDidMount(){
		this.setState({locations: this.props.locations, markers: this.props.markers});
	}

	filter(query){
		if (query) {
			// this.setState({query: ''});
			let filteredLocations = [];
			let filteredMarkers = [];
			const match = new RegExp(ecsapeRegExp(query), 'i')
			this.setState({query: query})
			filteredLocations = this.state.locations.filter((location) => match.test(location.title));
			filteredMarkers = this.state.markers.filter((marker) => match.test(marker.title));

			this.state.markers.forEach((marker) => marker.setVisible(false));
			filteredMarkers.forEach((marker) => {
				marker.setVisible(true);
				marker.setAnimation(this.props.maps.Animation.BOUNCE)
			});

			this.setState({locations: filteredLocations, markers: filteredMarkers});

		} else {
			this.setState({locations: this.props.locations, markers: this.props.markers});
		}
	}

	handleLocationClick(location) {
		let marker =
		this.setState({locations: location});
		// kliknięcie na lokalizację wyświetla marker i infowindow, plus animacja reszta niewidoczna
	}




	render() {

		return(
			<div className="list-container">
				<h1>Discover Cieplice</h1>
				<input class="location-serach" type="text" placeholder="Search" onChange={(event)=> this.filter(event.target.value)}/>
				<ul className = "locations-list">
					{ this.state.locations.map(location => (<li onClick={(event) => this.handleLocationClick(event.target.value)}> {location.title} </li>)) }
				</ul>
			</div>
		);
	}

}

export default FilterList