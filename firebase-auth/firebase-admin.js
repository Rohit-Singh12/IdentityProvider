const admin = require('firebase-admin');

console.log(process.env.REACT_APP_PRIVATE_KEY)
// Initialize Firebase Admin SDK with service account credentials
const firebaseConfig = {

    "type": "service_account",
    "project_id": process.env.REACT_APP_PROJECT_ID_FIREBASE,
    "private_key_id": process.env.REACT_APP_PRIVATE_KEY_ID,
    "private_key": process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": "firebase-adminsdk-rmble@authorization-a6bb6.iam.gserviceaccount.com",
    "client_id": process.env.REACT_APP_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rmble%40authorization-a6bb6.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};
admin.initializeApp({

  credential: admin.credential.cert(firebaseConfig),
  databaseURL: 'https://authorization-a6bb6.firebaseio.com'
});
module.exports = admin;