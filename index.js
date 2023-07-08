import { Client } from "whatsapp-web.js";


const client = new Client()


client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});


client.initialize()