
import MPL3115A2 from './MPL3115A2.js';

const mpl3115a2 = new MPL3115A2();

export function getCurrentHouseState() {
    const combinedData = {
        temp: mpl3115a2.data().temp,
        pressure: mpl3115a2.data().pressure,
        timestamp: Date.now()//add offset to match timezone of Poland
    };

    return combinedData;
}
