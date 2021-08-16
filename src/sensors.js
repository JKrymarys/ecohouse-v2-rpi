
import MPL3115A2 from './MPL3115A2.js';

const mpl3115a2 = new MPL3115A2();
const tzoffset = new Date().getTimezoneOffset() * 60000; // make adjustments to take into consideration timezonses


export function getCurrentHouseState() {
    const combinedData = {
        temp: mpl3115a2.data().temp,
        pressure: mpl3115a2.data().pressure,
        timestamp:  new Date(Date.now() - tzoffset).toISOString().replace("Z", "")
    };

    console.log("Current data", combinedData);
    return combinedData;
}
