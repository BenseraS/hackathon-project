
function calcTimeIsMoney(salary, travelTimeMin){
    var youPriceHour = salary/40/5
    var travelTimeHour = travelTimeMin/60
    var moneyOnComuting = youPriceHour *travelTimeHour*20*2

    return {
        priceHour: youPriceHour,
        priceTravelTimeHour: travelTimeHour,
        commutingMoneyConversion: moneyOnComuting
    }
}

function calcGasolinePrice(price){
    array = [60,40,50,45]
    const average = array.reduce((a, b) => a + b) / array.length;
    return price * average
}

console.log(calcTimeIsMoney(3000,30))
console.log(calcGasolinePrice(2.14))