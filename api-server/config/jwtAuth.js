const admin = require("firebase-admin");
const axios = require("axios");
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

  credential: admin.credential.cert(firebaseConfig)
});

const verifyToken = async (req, res, next) => {
    const token = req.cookies?.accessToken; // Get token from header
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;  
        next();
    } catch (error) {
        // If token is invalid or expired, try to refresh it
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken) {
            try {
                
                const newTokens = await refreshAccessToken(refreshToken);
                if (newTokens) {
                    // Set the new access token in cookies or headers as needed
                    res.cookie('accessToken', newTokens.accessToken, { httpOnly: true });
                    req.user = await admin.auth().verifyIdToken(newTokens.accessToken);
                    return next(); // Proceed with new token
                }
            } catch (refreshError) {
                return res.status(403).json({ message: 'Invalid or expired refresh token.' });
            }
        }
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

const refreshAccessToken = async (refreshToken) => {
    const response = await axios.post(`${process.env.REACT_APP_IDENTITY_URL}`, {refreshToken: refreshToken})

    if (response){
        return {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
        };
    }

    throw new Error("Failed to fetch Access Token"); 
}

module.exports = verifyToken;
