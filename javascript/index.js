
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