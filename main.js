"use strict";
import MPL3115A2 from './MPL3115A2.js';

const mpl3115a2 = new MPL3115A2();
const tzoffset = new Date().getTimezoneOffset() * 60000; // make adjustments to take into consideration timezonses


function fetchData(mpl3115a2, tzoffset) {

    var data = {
        temp_house: mpl3115a2.data().temp,
        pressure_house: mpl3115a2.data().pressure,
        datetime: new Date(Date.now() - tzoffset)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ") //add offset to match timezone of Poland
    };

    console.log("Current temp", data.temp_house)
    console.log("Current pressure", data.pressure_house);
    console.log("Current time", data.datetime);

}


while (true) {
    fetchData(mpl3115a2, tzoffset);
}