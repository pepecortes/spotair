<!doctype html>

<html>
	<head>
		<meta charset="utf-8">
	</head>
	
	<script>
		
	/**
	The script starts at the end, once the page is loaded on the browser
	*/
		
	function MapGalleries() {
		this.GMAP = null; // will hold the Google map
		this.displayInitialForm.call(this); // starts display
	}		
	
	MapGalleries.prototype.displayInitialForm = function() {
		$("#status").hide(); // remove all status messages
		
		// add the map
		this.GMAP = new Gmap(document.getElementById('gmap'));
		
		// add the interface behavior
		$("button:reset").click(function() {resetForm($("form"))});
		$("#centerMap").on('click', this.centerMap.bind(this));
		var selectizer = selectizeMe($("#anneeSelect"), selectizeAjaxCall(false, "getAnnees"));
		selectizer.on('change', this.anneeChanged(selectizer).bind(this));
		
		// add the filter <div> to the map. Note that the events
		// have to be attached before
		var dom = document.getElementById('gmapFilter');
		this.GMAP.addCustomControl(dom);
		
		// load all galleries: simulate an 'anneChanged' event
		this.anneeChanged(selectizer).call(this);
	}
	
	MapGalleries.prototype.centerMap = function(event) {
		this.GMAP.zoomAndCenter();
	}
		
	MapGalleries.prototype.anneeChanged = function(selectizer) {			
		// An 'annee' has been selected: modify the map display
		
		return function() {
			var selected = selectizer.getValue();
			var constraint = (selected)? {'refannee': selected} : false;
			var arg = new ajaxArgument();
			arg.appendData("mode", "getGalleries"); // the name of the api function
			arg.appendData("full", "true"); // a parameter to the function
			if (constraint) {
				arg.appendData("constraint", JSON.stringify(constraint)); // the constraint parameter
			};
			arg.success = callback.bind(this);
			ajaxCall(arg);
		}
	
		function callback(galleries) {
			stopWaiting();
			this.GMAP.updateMarkers(galleries);
		}
		
	}
		
	$(document).ready(function() {
		$("#status").hide(); // remove all status messages
		
		/** create a new application and start it */
		var app = new MapGalleries();
	});
		
	</script>    

		
  <body>

    <div id="gmapFilter">
		<form method="post" enctype="multipart/form-data" onsubmit="return false">
			<div>
				<label for="anneeSelect" class="control-label">Années</label>
				<select id="anneeSelect" name="anneeSelect"/>
			</div>
			<button type="submit" id="centerMap" class="btn btn-primary">Recentrer</button>
			<button type="reset" class="btn btn-link">Reset</button>
		</form>
		</div>

    <div id="gmap"/>
       
  </body>
</html>




/*---------- GOOGLE MAPS API HELPER FUNCTIONS  -----------------------*/
function Gmap(gMapDiv, mapOptions = {zoom: 3,
									 center: new google.maps.LatLng(40, 20),
									 mapTypeControlOptions: {position: google.maps.ControlPosition.TOP_RIGHT}}
			  ) {
	/**
	 * Google Map object for the public pages: only for display
	 * gMapDiv: <div> holding the map. Required
	 * mapOptions: Google Map init options. See defaults
	 */	 
	this._map = new google.maps.Map(gMapDiv, mapOptions);
	const clusterOptions = {gridSize: 40, maxZoom: 12, imagePath: MEDIA_HTTP_PATH + 'markerclusterer/m'};
	this._markercluster = new MarkerClusterer(this._map, [], clusterOptions);
	this._infoWindow = new google.maps.InfoWindow();
	this._spiderfier = new OverlappingMarkerSpiderfier(this._map, {
		markersWontMove: true,
		markersWontHide: true,
		keepSpiderfied: true,
		basicFormatEvents: true,
		spiralFootSeparation: 30,
		spiralLengthFactor: 4,
		spiralLengthStart: 20,
		legWeight: 0.2
	});
	
	// set evens on each marker, so as to change between
	// overlapped and isolated marker labels
	var goms = this._spiderfier;
	this._map.addListener('idle', function() {
		const spiderable = goms.markersNearAnyOtherMarker();
		spiderable.forEach(m => {if (!m._omsData) m.stackMe()});
		// 'm._omsData' says whether or not the marker is spiderfied
		// do not set the overlapped icon if it is spiderfied
	});
	goms.addListener('unspiderfy', function(markers) {
		markers.forEach(m => m.stackMe());
	});
	goms.addListener('spiderfy', function(markers) {
		markers.forEach(m => m.unstackMe());
	});
	 
	return this;
}

Gmap.prototype.addCustomControl = function(div) {
	/**
	 * Add a div to the upper left corner of the map
	 * We do not declare here any interface of the added control
	 */

	// Set CSS for the control border.
	var borderDiv = document.createElement('div');
	borderDiv.className = "gMapControlBorder";

	// Add the given control
	borderDiv.appendChild(div);
	
	this._map.controls[google.maps.ControlPosition.TOP_LEFT].push(borderDiv);
	return this;
}

Gmap.prototype.zoomAndCenter = function(zoom=3, lat=15, long=15) {
	/**
	 * Zoom and Center a given Google Map object
	 * inputs are self explanatory and get defaults
	 */
	 var center = new google.maps.LatLng(lat, long);
	 this._map.panTo(center);
	 this._map.setZoom(zoom);
}


Gmap.prototype.updateMarkers = function(dataArray, dataType='gallery') {
	/**
	 * Update all markers using the dataArray provided
	 * Today, only "gallery" dataType is implemented: provide an array of "galleries"
	 */	 
	 const infoWindow = this._infoWindow;
	 
	 const galleryToMarker = function(gallery) {
			/** 
			 * 'gallery': a gallery object
			 * output: a google.maps.Marker object (built from the gallery)
			 * note the property 'realLabel' added to the Marker object
			 * it will be used by the spiderfy-unspiderfy function
			 */
			
			const handleInfoWindow = function() {
				var gallery = this.data; // 'this' is the marker that triggered the event
				const url = "/index.php?call=gallery&id=" + gallery.id;
				const str = `
					<div class="infoWindow galleryGMarker">
					<a title="${gallery.text}" href="${url}">${gallery.sujet}</a>
					<br>
					${gallery.annee}, ${gallery.aerodrome}
					<br>
					${gallery.commentaire}
					</div>
				`.trim();
				const dom = $.parseHTML(str)[0];
				infoWindow.close();
				infoWindow.setContent(dom);
				infoWindow.open(null, this); 
			};
		
			var markerOptions = {zIndex: (Math.random() * 1000),// this will avoid overlapping
								 position: new google.maps.LatLng(gallery.latitude, gallery.longitude),
								 title: gallery.text};
								 		
			var marker = new google.maps.Marker(markerOptions);
			
			
			// add the data that will support the marker creation
			marker.data = gallery;
			
			// define icons and labels for both spiderfied and unspiderfied states
			marker.stackedIcon = {url: MEDIA_HTTP_PATH + "/icon/geoloc_marker_stacked.png"};
			marker.unstackedIcon = {labelOrigin: new google.maps.Point(19, 15)};
			marker.unstackedLabel = "";
			
			switch(gallery.annee) {
				case "Musées":
					marker.unstackedIcon.url = MEDIA_HTTP_PATH + "/icon/geoloc_marker_musees.png";
					break;
				case "Collectors":
					marker.unstackedIcon.url = MEDIA_HTTP_PATH + "/icon/geoloc_marker_collectors.png";
					 break;
				case "-NIL":
					marker.unstackedIcon.url = MEDIA_HTTP_PATH + "/icon/geoloc_marker_empty.png";
					break;
				default:
					marker.unstackedIcon.url = (gallery.isspotair == "1")? 
										MEDIA_HTTP_PATH + "/icon/geoloc_marker_empty_spotair.png" :
										MEDIA_HTTP_PATH + "/icon/geoloc_marker_empty.png";
					const labelText = "'" + gallery.annee.substr(2,2);
					marker.unstackedLabel = {text: labelText, fontSize: "10px", fontWeight: "bold"};
			}
			
			marker.stackMe = function() {
				this.setIcon(this.stackedIcon);
				this.setLabel("");
			};
			
			marker.unstackMe = function() {
				this.setIcon(marker.unstackedIcon);
				this.setLabel(this.unstackedLabel);
			};
			
			// set marker in unstacked state first
			marker.unstackMe(); 
			
			// add the listener from the spiderfier, instead of a normal click
			marker.addListener('spider_click', handleInfoWindow);
			
			return marker;	
	}
	
	this._markercluster.clearMarkers();
	const markers = dataArray
					.filter(function (data) {return (data.latitude !== null) && (data.longitude !== null)})
					.map(galleryToMarker);
	// add markers to spiderfier, then to markercluster
	for (var i=0, len=markers.length; i<len; i++) this._spiderfier.addMarker(markers[i]);
	this._markercluster.addMarkers(markers);
	return this;
} 


function gMapInput(
					gMapDiv,
					searchFields = false,
					latField = false,
					lngField = false,
					mapOptions = {
								  zoom: 3,
								  center: new google.maps.LatLng(40, 20),
								  mapTypeControlOptions: {position: google.maps.ControlPosition.TOP_RIGHT}
								  }
				  ) {
	/**
	 * Google Map control for selecting a location
	 * gMapDiv: <div> holding the map. Required
	 * searchFields: array jquery controls with text to search for in the map
	 * latField: jquery control holding the latitude
	 * lngField: jquery control holding the longitude
	 * locationFields: {lat: xxx, lng: xxx}
	 * mapOptions: Google Map init options. See defaults
	 */
	 
	var MAP = new google.maps.Map(gMapDiv, mapOptions);
	var MARKER = new google.maps.Marker({map: MAP, draggable:true});
	var GEOCODE_INPUTS = searchFields;
	
	var LAT_INPUT = null;
	var LNG_INPUT = null;
	const LOC_INPUTS = (latField && lngField);
	
	if (LOC_INPUTS) {
		LAT_INPUT = latField;
		LNG_INPUT = lngField;
	}
	
	const geolocateSearch = function() {
		/** Geographical search of the text string given in searchFields */		
		
		if (!GEOCODE_INPUTS) return;
		
		// build search string by concatenation of all searchFields values
		const strConcatenator = (accumulator, currentValue) => accumulator + currentValue.val() + " ";
		var searchString = GEOCODE_INPUTS.reduce(strConcatenator, "");
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': searchString}, function(results, status) {
			if (status === 'OK') {
				var location = results[0].geometry.location;
				MAP.setCenter(location);
				MAP.setZoom(12);
				MARKER.setMap(MAP);
				MARKER.setPosition(location);
			} else {
				alert(ERROR_GMAP_SEARCH + ": " + status);
			}
		});		
	};
	
	const centerAroundMarker = function() {
		var location = MARKER.getPosition();
		MAP.setCenter(location);
	};
	
	// Create the customized controls "Recherche" and "Centrer" and initiate them
	var searchControlDiv = document.createElement('div');
	var centerControlDiv = document.createElement('div');
	var searchControl = new customControl(searchControlDiv, "Recherche", geolocateSearch);
	var centerControl = new customControl(centerControlDiv, "Centrer", centerAroundMarker);
	MAP.controls[google.maps.ControlPosition.TOP_LEFT].push(searchControlDiv);
	MAP.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);
	
	
	google.maps.event.addListener(MARKER, 'dragend', function(event) {MARKER.setPosition(event.latLng)});
	google.maps.event.addListener(MARKER, 'position_changed', function() {updateLocInputs()});
	google.maps.event.addListener(MAP, 'click', function(event) {MARKER.setMap(MAP);MARKER.setPosition(event.latLng)});
	latField.change(updateMarker);
	lngField.change(updateMarker);
	
	return MAP;
	
	function updateLocInputs() {
		/**
		 * Update the display of the location inputs to the MARKER position
		 */
		 if (!LOC_INPUTS) return;
		 var position = MARKER.getPosition();
		 LAT_INPUT.val(position.lat);
		 LNG_INPUT.val(position.lng);
	}
	
	function updateMarker() {
		/**
		 * Set marker the position given by the lat and lng inputs
		 */
		 if (!LOC_INPUTS) return false;
		 if (LAT_INPUT.val() == "" || LNG_INPUT.val() == "") {MARKER.setMap(null); return false};
		 var position = new google.maps.LatLng(LAT_INPUT.val(), LNG_INPUT.val());
		 MAP.setCenter(position);
		 MARKER.setMap(MAP);
		 MARKER.setPosition(position);
	}
	
	function customControl(controlDiv, text, customFunction) {

		// Set CSS for the control border.
		var controlUI = document.createElement('div');
		controlUI.className = "gMapControlBorder";
		controlUI.title = text;
		controlDiv.appendChild(controlUI);

		// Set CSS for the control interior.
		var controlText = document.createElement('div');
		controlText.className = "gMapControlInterior";
		controlText.innerHTML = text;
		controlUI.appendChild(controlText);

		// Setup the click event listeners
		controlUI.addEventListener('click', customFunction);
	}

	
}
