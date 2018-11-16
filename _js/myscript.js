var campusList = new Array();
var map;
var latSH;

	$(document).on("pagebeforeshow", "#geo", function() {		
	
		function Cmp(name, city, lat, lng) {
			this.name=name;
			this.city=city;
			this.lat=lat;
			this.lng=lng;
		}		
		
		$.getJSON("geo01.json", function(data) {
			// load up campus array
			start = data.Sheridan.campuses;
			for (x=0; x < start.length; x++) {
				campusList.push(new Cmp(start[x].name,
				                         start[x].city,
																 start[x].lat,
																 start[x].lng));
			}
			console.log(campusList);
		});
		
		$("#Davis").click(function() {
			campusSelect(0);
		});
		$("#Trafalgar").click(function() {
			campusSelect(1);
		});
		$("#HMC").click(function() {
			campusSelect(2);
		});		
		
	function campusSelect (pos) {
		$("#lat").html(campusList[pos].lat);
		$("#lng").html(campusList[pos].lng);

		console.log(campusList[pos].lat);
		
		// Set lat/lng for center point (Step 3)
		mapCampus = new google.maps.LatLng(campusList[pos].lat, campusList[pos].lng);

			
		// Set Map options (Step 4)
		mapOptions = {
			center : mapCampus, //required
			zoom : 18,
			mapTypeID : google.maps.MapTypeId.HYBRID
		}
		//HYBRID, ROADMAP, TERRAIN, SATELLITE
		
		// Display Map (Step 5)
		mapSH = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

		// Marker (Step 6-optional)
		myLoc = new google.maps.Marker({
			map : mapSH, //required
			position : mapCampus, //required
			icon : "pushpin.gif",
			animation : google.maps.Animation.DROP
		});
		//DROP or BOUNCE
		
		// Info Window (Step 7-optional)
			info = new google.maps.InfoWindow({
				content : "Campus Info?<br>" + 
				campusList[pos].name + "<br>" + 
				campusList[pos].city
			});

			google.maps.event.addListener(myLoc, "click", function(){
				info.open(mapSH, myLoc);
			});
		}
		

		$("#ALL").click(function() {
			console.log("in ALL");
			// set lat/lng center points for all campuses
			latBR = campusList[0].lat;		// Davis campus 
			lngBR = campusList[0].lng;
			mapBR = new google.maps.LatLng(latBR, lngBR);

			latOK = campusList[1].lat;		// Trafalgar campus 
			lngOK = campusList[1].lng;
			mapOK = new google.maps.LatLng(latOK, lngOK);

			latHM = campusList[2].lat;		// HMC campus 
			lngHM = campusList[2].lng;
			mapHM = new google.maps.LatLng(latHM, lngHM);

			
			// set Map options
			mapOptions = {
				center : mapHM, //required
				zoom : 10,
				mapTypeID : google.maps.MapTypeId.HYBRID
			}

			// Display map
			mapSH = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

			// Add markers for all
			myLoc = new google.maps.Marker({
				map : mapSH, //required
				position : mapBR, //required
				icon : "pushpin.gif",
				animation : google.maps.Animation.DROP
			});

			myLoc = new google.maps.Marker({
				map : mapSH, //required
				position : mapOK, //required
				icon : "pushpin.gif",
				animation : google.maps.Animation.DROP
			});

			myLoc = new google.maps.Marker({
				map : mapSH, //required
				position : mapHM, //required
				icon : "pushpin.gif",
				animation : google.maps.Animation.DROP
			});

			// Add polyline between campuses	
		   var pathCoordinates = [
	          	{lat: latBR, lng: lngBR},
	          	{lat: latOK, lng: lngOK},
				{lat: latHM, lng: lngHM},
				{lat: latBR, lng: lngBR}
        	];

        	myPath = new google.maps.Polyline({
        		path : pathCoordinates,
        		geodesic : true,
        		strokeColor : "#FF0000",
        		strokeOpacity : 0.5,
        		strokeWeight : 10
        	});

        	myPath.setMap(mapSH);

				
		});
		

	});
		

	
	
