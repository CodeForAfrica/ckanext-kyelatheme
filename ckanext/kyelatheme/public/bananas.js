var obj ;
$(document).ready(function(){

  try {

    $('.dropdown-toggle').dropdown();


    /**
    * Dataset 'spatial' field for ckanext-spatial
    **/
    var spatialInput = $('#field-spatial');

    //spatialInput.attr('readonly', true);
    // Leaflet Map
    var theMap = L.map('mapid').setView([-8.9058427,33.4223479], 8);
    //Add tiles layer
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  		maxZoom: 18,
  		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
  			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  		id: 'mapbox.streets'
  	}).addTo(theMap);

    //set marker to map center
    var theMarker = L.marker([-8.9058427,33.4223479],{draggable:true}).addTo(theMap);

    theMarker.on('dragend', function(event){
        var marker = event.target;
        var position = marker.getLatLng();
        //console.log(position);
        marker.setLatLng(position,{draggable:'true'}).bindPopup(position).update();
        spatialInput.attr('value', "{\"type\":\"Point\", \"coordinates\":["+this.toGeoJSON().geometry.coordinates+"]}");
        console.log(this.toGeoJSON().geometry);
    });

    //Map Events
     theMap.on('click', onMapClick);

  } catch (e) {
    console.error(e);
  } finally {

  }

});

  function onMapClick(e) {
    console.log(e);
  }
