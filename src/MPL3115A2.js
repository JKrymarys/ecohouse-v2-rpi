
import { I2C } from "raspi-i2c";

const MPL3115A2_ADDRESS = 0x60;
const MPL3115A2_CTRL_REG1 = 0x26;
const MPL3115A2_CTRL_REG1_OS128 = 0x38;
const MPL3115A2_CTRL_REG1_BAR = 0x00;
const MPL3115A2_PT_DATA_CFG = 0x13;
const MPL3115A2_REGISTER_TEMP_MSB = 0x04;

class MPL3115A2 {
    data() {
        var data = {};
        const i2c = new I2C();
        // Clear CTRL_REG_1
        i2c.writeByteSync(MPL3115A2_ADDRESS, MPL3115A2_CTRL_REG1, 0x00);
        // Set oversmapling to 128x
        i2c.writeByteSync(
            MPL3115A2_ADDRESS,
            MPL3115A2_CTRL_REG1,
            MPL3115A2_CTRL_REG1_OS128
        );
        //Enable data flags - data readt for altitude, pressure, temperature
        i2c.writeByteSync(MPL3115A2_ADDRESS, MPL3115A2_PT_DATA_CFG, 0x07);
        // Begin acuiring, single shot
        i2c.writeByteSync(MPL3115A2_ADDRESS, MPL3115A2_CTRL_REG1, 0x3a);

        let dataReady = false;
        while (!dataReady) {
            if (i2c.readByteSync(MPL3115A2_ADDRESS, 0x00) != 0) {
                //  MPL3115A2_REGISTER_TEMP_MSB - temperature sensor

                //TEMPERATURE
                let temp, cTemp, tHeight, altitude, pres, pressurehPa;
                let responseTemp = i2c.readSync(
                    MPL3115A2_ADDRESS,
                    MPL3115A2_REGISTER_TEMP_MSB,
                    2
                );

                temp = (responseTemp[0] * 256 + (responseTemp[1] & 0xf0)) / 16;
                cTemp = temp / 16.0;
                //data.fullResponse = responseTemp;
                // data.temp_meta = temp;
                data.temp = cTemp;

                // //ALTITUTE
                // var responseAltitute = i2c.readSync(MPL3115A2_ADDRESS, MPL3115A2_REGISTER_PRESSURE_MSB , 3);
                // // tHeight = (((responseAltitute[0] * 256) + (responseAltitute[1] * 16) + (responseAltitute[2])) & 0xF0) / 16
                // tHeight = ((responseAltitute[0] * 65536) + (responseAltitute[1] * 256) + (responseAltitute[2] & 0xF0)) / 16
                // altitude = tHeight / 16.0
                // data.tHeight = tHeight;
                // data.altitude = altitude;

                //set to barometer mode
                // i2c.writeByteSync(MPL3115A2_ADDRESS, MPL3115A2_CTRL_REG1, 0x39);

                //PRESSURE
                //4bits status, pres MSB1, pres MSB, pres LSB
                var responsePressure = i2c.readSync(
                    MPL3115A2_ADDRESS,
                    MPL3115A2_CTRL_REG1_BAR,
                    4
                );
                pres =
                    (responsePressure[1] * 65536 +
                        responsePressure[2] * 256 +
                        (responsePressure[3] & 0xf0)) /
                    16;
                pressurehPa = pres / 4.0 / 100;

                // data.pressureMeta = pres
                data.pressure = pressurehPa;
                dataReady = true;
            }
        }
        return data;
    }
}

export default MPL3115A2;