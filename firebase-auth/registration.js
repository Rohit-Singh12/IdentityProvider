const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { initializeApp } = require('firebase/app');
const express = require('express');
const admin = require('firebase-admin')
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "authorization-a6bb6.firebaseapp.com",
    projectId: process.env.REACT_APP_PROJECT_ID_FIREBASE,
    storageBucket: "authorization-a6bb6.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const router = express.Router();

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  admin.auth().createUser({
    email: email,
    password: password,
  })
    .then((userRecord) => {
      res.status(201).json('Successfully created new user: ' + userRecord.uid);
    })
    .catch((error) => {
      console.error('Error creating new user:', error);
      res.status(400).json(error);
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log('Login Email:', email);
    console.log('Login Password:', password);
    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        // Successful login
        const idToken = await userCredential.user.getIdToken();
        // Optionally, get a refresh token too:
        const refreshToken = userCredential.user.refreshToken;

        //Set tokens in secure, HTTP-only cookies
        res.cookie('accessToken', idToken, {
          httpOnly: true,
          secure: false, // Use HTTPS
         sameSite: 'Strict', // Prevent CSRF
        });

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
         sameSite: 'Strict',
        });
        console.log(idToken)
        //console.log("res", res);
        return res.status(200).json({ success: true });
        //res.status(200).send({ message: "Login successful", user: userCredential.user });
      })
      .catch(error => {
        // Handle Errors
        console.log("error", error);
        return res.status(400).send({ error: error.message });
      });
    //return res.status(200).json({message: true});
  });

module.exports = router;