var initialPosition = [76571.91760000025, 74418.60829954545];

// instantiate the map
var map = new lux.Map({
    target: 'map',
    bgLayer: 'basemap_2015_global',
    zoom: 18,
    position: initialPosition
});

function addressLookup(queryString) {
    if (queryString && queryString.length) {
        return lux.geocode({
            queryString,
            num: null,
            street: null,
            zip: null,
            locality: null
        }, console.log);
    }

    return Promise.resolve(null);
}

function makeDelay(delay) {
    return function(fn) {
        var timeout = null;

        return function() {
            var args = arguments;

            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(function() {
                var result = fn.apply(null, args);
                timeout = null;
                return result;
            }, delay);
        };
    };
};

function addMarkers() {
    var work = document.querySelector('#address-work').value;
    var home = document.querySelector('#address-home').value;

    return Promise.all([
        addressLookup(work).then(
            result => addMarker('work', result)
        ),
        addressLookup(home).then(
            result => addMarker('home', result)
        )
    ]);
}

function addMarker(markerName, position) {
    if (position) {
        position = position.results;
    }

    if (position) {
        position = position.shift();
    }

    if (position) {
        position = position.geom;
    }

    if (position) {
        position = position.coordinates;
    }

    if (position) {
        var marker = {
            position,
            positioning: 'center-center',
            iconURL: 'images/lion.png',
            click: true,
            html: '<h2>' + markerName +  '</h2>'
        };

        map.showMarker(marker);
    }
}

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

function calculate() {
    addMarkers().then(
        () => formatInputWithJavascript()
    );
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

    var prop = document.getElementById('proposal');
    prop.innerHTML = '<h6>Take the public transport</h3>';

    const formated = `<div>
        <h6>Travel Time</h3>
        <p ${(travelTimeMin>20) ? 'id="text_on_red"' : 'id="text_on_black"'} >${travelTimeMin} minutes</p>
        </div>
        <div>
            <h6>Distance</h3>
                <p ${(distance>15) ? 'id="text_on_red"' : 'id="text_on_black"'}>${distance} km</p>
        </div>
        <div>
            <h6>Hours Spent (monthly)</h3>
                <p ${(money.travelMonth>40) ? 'id="text_on_red"' : 'id="text_on_black"'}>${money.travelMonth} hour</p>
        </div>
        <div>
            <h6>Time conversation in (euro)</h3>
                <p>YOUR PRICE HOUR</p>
                <p ${(money.priceHour>10) ? 'id="text_on_green"' : 'id="text_on_black"'}>${money.priceHour} &euro;</p>
        </div>
        <div>
            <h6>Total</h3>
                <p>GASOLINE EXPENSES</p>
                <p ${(gasolineExpenses>0) ? 'id="text_on_red"' : 'id="text_on_black"'}>${gasolineExpenses}</p>
        </div>
        <div>
            <h6>Distance from Veloh</h3>
                <p>0 m</p>
        </div>
    <div>`
    elem.innerHTML = formated
}

function getVelohDistance(){
    const API_KEY = '51e4c8697d96ebce32a43ec1f34625abb0598e0f'
}

function getRoute(pointA, pointB, vehicle) {
    pointA = "51.131,12.414";
    pointB = "48.224,3.867";
    vehicle = 'foot'

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // Typical action to be performed when the document is ready:
           console.log(xhttp.responseText);
        }
    };
    xhttp.open(
        "GET",
        'https://graphhopper.com/api/1/route?point='+pointA+'&point='+pointB+'&profile='+vehicle+'&locale=de&calc_points=false&key=2db78206-4053-4ac6-9998-f7bbe034d879',
        true
    );
    xhttp.send();
}
