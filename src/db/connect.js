const mongoose = require('mongoose')
const dbConnectLocal = "mongodb://localhost:27017/users";
const dbConnectAtlas = "mongodb+srv://istable:istable123@istable.y4geq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect("mongodb+srv://istable:istable123@cluster0.nm2ns.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || dbConnectLocal, { useNewUrlParser: true }).then(() => {
    console.log("connected");
})
    .catch((e) => {
        console.log("no connected");
    })