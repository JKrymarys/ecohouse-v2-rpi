
import admin from 'firebase-admin';

// const serviceAccount = require('./credentials.json');
import * as serviceAccount from './credentials.json';

console.log('serviceAccount', serviceAccount);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default)
});

const db = admin.firestore();

const bedroomData = db.collection('bedroom-data');

export const pushNewBedroomData = async ({ temp, pressure, timestamp }) => {
    bedroomData.add({
        temp,
        pressure,
        timestamp,
    });
}



