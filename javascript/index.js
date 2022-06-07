this.getRoute(1, 2)

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

    document.querySelector('#address-work').addEventListener('input', delay(workInputListener));
    document.querySelector('#address-home').addEventListener('input', delay(homeInputListener));
})();

function calcTimeIsMoney(salary, travelTimeMin){
    var youPriceHour = salary/40/5
    var travelTimeHour = travelTimeMin/60
    var moneyOnComuting = youPriceHour *travelTimeHour*20*2
    var travelM = travelTimeHour*20*2

    return {
        priceHour: youPriceHour,
        priceTravelTimeHour: travelTimeHour,
        commutingMoneyConversion: moneyOnComuting,
        travelMonth: travelM
    }
}

function calcGasolinePrice(price){
    array = [60,40,50,45]
    const average = array.reduce((a, b) => a + b) / array.length;
    return price * average
}


function formatInputWithJavascript(){
    var salary = 3000;
    var travelTimeMin = 30;
    var gasoline = 2.14;
    var distance = 10;

    const money = calcTimeIsMoney(salary,travelTimeMin)
    const gasolineExpenses = calcGasolinePrice(gasoline)
    var elem = document.getElementById('current_situation');
    elem.innerHTML = '';
    const formated = `<div>
        <h6>Travel Time</h3>
        <p>${travelTimeMin} minutes</p>
        </div>
        <div>
            <h6>Distance</h3>
                <p>${distance} km</p>
        </div>
        <div>
            <h6>Hours Spent (monthly)</h3>
                <p>${money.travelMonth} hour</p>
        </div>
        <div>
            <h6>Time conversation in (euro)</h3>
                <p>YOUR PRICE HOUR</p>
                <p>${money.priceHour} &euro;</p>
        </div>
        <div>
            <h6>Total</h3>
                <p>GASOLINE EXPENSES</p>
                <p>${gasolineExpenses}</p>
        </div>
        <div>
            <h6>Distance from Veloh</h3>
                <p>0 m</p>
        </div>
    <div>`
    elem.innerHTML = formated
}

function getRoute(pointA, pointB) {
    pointA = "51.131,12.414";
    pointB = "48.224,3.867";

    fetch(
        'https://graphhopper.com/api/1/route?point='+pointA+'&point='+pointB+'&profile=car&locale=de&calc_points=false&key=2db78206-4053-4ac6-9998-f7bbe034d879'
    ).then(response => {
        console.log("SUCCESS")
        console.log(response)
    })
    .catch(error => {
        console.log("ERROR")
        console.log(error)
    });
}
