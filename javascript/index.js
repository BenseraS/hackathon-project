var mock = {
    home: [ 6.11149, 49.61062 ],
    work: [ 6.113, 49.610334 ]
}

/**
 * @return Promise<LonLat>
 */
function addressLookup(address) {
    var num = '50a';
    var street = 'rue du cimetière';
    var locality = 'heisdorf';
    var zip = 'l-7313';

    return geocode({
        num, street, zip, locality, queryString
    }, function(position) {
        console.log(position);
    });
}

(function() {
    // instantiate the map
    var map = new lux.Map({
        target: 'map',
        bgLayer: 'basemap_2015_global',
        zoom: 18,
        position: [75977, 75099]
    });

    // markers on map
    var markers = {};

    var setPosition = function(markerName, position) {
        if (markerName in markers) {
            map.removeLayer(markers[markerName]);
        }

        if (position) {
            var marker = {
                position,
                positionSrs: 4326,
                positioning: 'center-center',
                iconURL: 'images/lion.png',
                click: true,
                html: '<h2>' + markerName +  '</h2>'
            };

            markers[markerName] = marker;
            map.showMarker(marker);
        }
    };

    var timeout = null;

    var makeDelay = function(delay) {
        return function(fn) {
            return function() {
                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(function() {
                    var result = fn();
                    timeout = null;
                    return result;
                }, delay);
            };
        };
    };

    var delay = makeDelay(500);

    var inputListener = function(markerName, lonlat) {
        return function(e) {
            setPosition(markerName, lonlat);
        };
    };

    var workInputListener = inputListener('work', mock.work);
    var homeInputListener = inputListener('home', mock.home);

    document.querySelector('#work').addEventListener('input', delay(workInputListener));
    document.querySelector('#home').addEventListener('input', delay(homeInputListener));
})();