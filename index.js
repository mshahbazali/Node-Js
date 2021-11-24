const bodyParser = require('body-parser');
const cors = require('cors');
const express = require("express");
require('./src/db/connect')

const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: false }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: false }))
app.use(cors());

app.use("/api/user", require("./src/routes/user"))
app.use("/api/auth/register", require("./src/routes/register"))
app.use("/api/auth/login", require("./src/routes/login"))
app.use("/api/auth/user", require("./src/routes/users"))

// Forget Password 

app.use("/api/auth", require("./src/routes/forgetPassword"))
// app.use("/api/profile", require("./src/routes/profileImg"))
// app.use("/api/auth/otp", require("./src/routes/users"))
// app.use("/api/auth/reset-password", require("./src/routes/users"))

// Data Create Post Method 
// Data Read Get Method 
// Data Update Put and Patch Method 
// Data Delete Delete Method 
app.use('/public', express.static('public'));
app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});
app.get("/", (req, res) => {
    res.send("hello world");
})
app.listen(port, () => {
    console.log(`Server Is Running Please Open This Link http://localhost:${port}/`);
})