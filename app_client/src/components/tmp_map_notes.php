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
