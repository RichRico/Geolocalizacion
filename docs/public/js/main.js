function onDocumentReady() {
	var socket = io.connect(window.location.href);

	var map = L.map('mimapa', {
    	center: [0, -23],
    	zoom: 3
	});

	var tiles=L.tileLayer('https://a.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpamVuY3cxbzAwMG12ZGx4cGljbGtqMGUifQ.vpDqms08MBqoRgp667Yz5Q');	
	map.addLayer(tiles);	
	

	map.locate({
		enableHighAccuracy: true
	});
	//evento
	map.on('locationfound', onLocationFound);
	socket.on('coords:user', onReceiveData);

	function onLocationFound(position){
		console.log(position);
		var mycoords = position.latlng;
		var marker = L.marker([mycoords.lat, mycoords.lng]);

		map.addLayer(marker);
		marker.bindPopup('Usuario ubicado');
		socket.emit('micood', {latlng: mycoords});
	}

	function onReceiveData (data) {
		console.log(data);
		var coordsUser = data.latlng;
		var marker = L.marker([coordsUser.lat, coordsUser.lng]);

		map.addLayer(marker);
		marker.bindPopup('Usuario ubicado');
	}
}

$(document).on('ready', onDocumentReady);