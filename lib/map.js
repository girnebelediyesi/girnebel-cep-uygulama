/*
 $(document).on('pagebeforeshow', "#adresRehberiDetay", function (event, data) {
 var parameters = $(this).data("url").split("?")[1];;
 parameter = parameters.replace("parameter=","");
 alert(parameter);
 });*/




$(document).on("pageshow","#adresRehberiDetay", function() {
    var jsonText = localStorage.getItem("Lokal Data");
    var text = JSON.parse(jsonText);
    var xCoor;
    var yCoor;


    //window.location.href = 'http://91.151.82.135:88/poi_search.php?type_tr='+text[0]+'&name='+text[1];


    $.getJSON('http://91.151.82.135:88/poi_search.php?type_tr='+text[0]+'&name='+text[1])

        .done(function( data ) {

            $.each(data, function() {

                xCoor = this.CoordX;
                yCoor = this.CoordY;

            });

            var cyprus = new google.maps.LatLng(yCoor,xCoor);
            //alert(text[0]);
            initialize(cyprus,text[0],text[1]);

        });



});


var map;
var TILE_SIZE = 256;

function bound(value, opt_min, opt_max) {
    if (opt_min != null) value = Math.max(value, opt_min);
    if (opt_max != null) value = Math.min(value, opt_max);
    return value;
}

function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}

function radiansToDegrees(rad) {
    return rad / (Math.PI / 180);
}

/** @constructor */
function MercatorProjection() {
    this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2,
        TILE_SIZE / 2);
    this.pixelsPerLonDegree_ = TILE_SIZE / 360;
    this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
}

MercatorProjection.prototype.fromLatLngToPoint = function(latLng,
                                                          opt_point) {
    var me = this;
    var point = opt_point || new google.maps.Point(0, 0);
    var origin = me.pixelOrigin_;

    point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;

    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    var siny = bound(Math.sin(degreesToRadians(latLng.lat())), -0.9999,
        0.9999);
    point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) *
        -me.pixelsPerLonRadian_;
    return point;
};

MercatorProjection.prototype.fromPointToLatLng = function(point) {
    var me = this;
    var origin = me.pixelOrigin_;
    var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
    var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
    var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) -
        Math.PI / 2);
    return new google.maps.LatLng(lat, lng);
};

function createInfoWindowContent(cyprus,type,name) {
    var numTiles = 1 << map.getZoom();
    var projection = new MercatorProjection();
    var worldCoordinate = projection.fromLatLngToPoint(cyprus);
    var pixelCoordinate = new google.maps.Point(
        worldCoordinate.x * numTiles,
        worldCoordinate.y * numTiles);
    var tileCoordinate = new google.maps.Point(
        Math.floor(pixelCoordinate.x / TILE_SIZE),
        Math.floor(pixelCoordinate.y / TILE_SIZE));

    return [
        'Tür: '+type,
        'İsim: '+name

    ].join('<br>');
}

function initialize(cyprus,type,name) {
    var mapOptions = {
        zoom: 15,
        center: cyprus
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    google.maps.event.trigger(map, 'resize');

    var coordInfoWindow = new google.maps.InfoWindow();
    coordInfoWindow.setContent(createInfoWindowContent(cyprus,type,name));
    coordInfoWindow.setPosition(cyprus);
    coordInfoWindow.open(map);

    google.maps.event.addListener(map, 'zoom_changed', function() {
        coordInfoWindow.setContent(createInfoWindowContent());
        coordInfoWindow.open(map);
    });

    google.maps.event.trigger(map, 'resize');
}

google.maps.event.addDomListener(window, 'load', initialize);



