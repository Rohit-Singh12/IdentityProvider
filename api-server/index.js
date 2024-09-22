require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const publicRoutes = require("./routes/publicRoute");
const privateRoutes = require("./routes/privateRoute");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());


//Public route
app.use("/api", publicRoutes);

//Private Route
app.use("/api", privateRoutes);

const PORT = process.env.REACT_APP_PORT;

app.listen(PORT, () => {
    console.log("API server is running on PORT..." + PORT);
})

