const mongoose = require('mongoose')
const dbConnectLocal = "mongodb://localhost:27017/users";
const dbConnectAtlas = "mongodb+srv://shahbazali:shahbazali672@cluster0.crgsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(dbConnectAtlas).then(() => {
    console.log("connected");
})
    .catch((e) => {
        console.log("no connected");
    })