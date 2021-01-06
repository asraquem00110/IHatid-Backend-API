"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaversineCalculateDistance = exports.generatePin = exports.formatBdayDate = exports.roundToDecimal = void 0;
exports.roundToDecimal = (num, decimalplace) => {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?!=\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    let dec = +(Math.round(num + +`e+${decimalplace}`) + `e-${decimalplace}`);
    let finddecimal = /\./;
    let test = finddecimal.test(dec.toString());
    return test ? numberWithCommas(dec) : `${numberWithCommas(dec)}.00`;
};
const MonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
exports.formatBdayDate = (Bday) => {
    if (Bday == null)
        return "";
    var Bdate = new Date(Bday);
    return `${MonthArray[Bdate.getMonth()]} ${Bdate.getDate()}, ${Bdate.getFullYear()}`;
};
exports.generatePin = (length) => {
    let a = Math.ceil(100000 + (Math.random() * 900000));
    a = a.toString().substring(0, length);
    return a;
};
exports.HaversineCalculateDistance = () => {
    function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371 * 1000;
        var x1 = lat2 - lat1;
        var dLat = x1 * Math.PI / 180;
        var x2 = lon2 - lon1;
        var dLon = x2 * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }
    function calculateDistance_Formula2(lat1, lon1, lat2, lon2) {
        function radians(value) {
            return value * Math.PI / 180;
        }
        var R = 6371 * 1000;
        let c = Math.cos(radians(lat1)) * Math.cos(radians(lat2))
            * Math.cos(radians(lon2) - radians(lon1)) + Math.sin(radians(lat1))
            * Math.sin(radians(lat2));
        c = Math.acos(c);
        var d = R * c;
        return d;
    }
    let sampleboundaryCirleRadius = 1000;
    let distance = calculateDistance(14.522697701286344, 121.05664863314786, 14.531671050980467, 121.07677592883292);
    console.log(distance);
    if (distance > sampleboundaryCirleRadius) {
        console.log("lagpas");
    }
    else {
        console.log("nasa loob pa");
    }
    let distance2 = calculateDistance(14.522697701286344, 121.05664863314786, 14.519934999488068, 121.06308593453967);
    console.log(distance2);
    if (distance2 > sampleboundaryCirleRadius) {
        console.log("lagpas");
    }
    else {
        console.log("nasa loob pa");
    }
};
