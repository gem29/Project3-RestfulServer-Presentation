
var mymap = L.map('mapid').setView([44.9537, -93.0900], 12);
var northWest = L.latLng(44.991548, -93.207680),
southEast = L.latLng(44.889845, -93.002029),
bounds = L.latLngBounds(southEast, northWest);

/*var popup = L.popup()
.setLatLng([51.5, -0.09])
.setContent("I am a standalone popup.")
.openOn(mymap);*/

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	minZoom: 11,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/streets-v11'
}).addTo(mymap);

/*
N1: "Conway/Battlecreek/Highwood"
N2: "Greater East Side"
N3: "West Side"
N4: "Dayton's Bluff"
N5: "Payne/Phalen"
N6: "North End"
N7: "Thomas/Dale(Frogtown)"
N8: "Summit/University"
N9: "West Seventh"
N10: "Como"
N11: "Hamline/Midway"
N12: "St. Anthony"
N13: "Union Park"
N14: "Macalester-Groveland"
N15: "Highland"
N16: "Summit Hill"
N17: "Capitol River"*/
//L.marker([44.949581, -93.186362]).addTo(mymap);

//L.marker(app.neighborhoods['N1'].latlon).addTo(mymap);
 //Dayton's Bluff




mymap.setMaxBounds(bounds);



function onMapClick(e) {
	
}

function onMoveEnd(e) {
	let coords = mymap.getCenter();
	//console.log(app);
	if(app){
		app.view_latlon = coords.lat + "," + coords.lng;
		
		//https://nominatim.openstreetmap.org/reverse?format=xml&lat=44.949583&lon=-93.018998
		console.log('https://nominatim.openstreetmap.org/reverse?format=json&lat='+coords.lat+'&lon='+coords.lng);

		$.ajax('https://nominatim.openstreetmap.org/reverse?format=json&lat='+coords.lat+'&lon='+coords.lng, {
						success: (data) => {
						  	console.log(data);
						  	if(data.address.house_number) {
						  		app.view_address = data.address.house_number + " "  + data.address.road;
						  	} else
						  	{
						  		app.view_address = data.address.road;
						  	}		
						},
					  	error: (err) => { console.log(err) }
					});
		//onsole.log(app.view_latlon.toString().substring(6));
		app.bounds = mymap.getBounds();
	}
}

//getBounds

mymap.on('click', onMapClick)
mymap.on('moveend',onMoveEnd)