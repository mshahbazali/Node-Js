const mongoose = require('mongoose')
const dbConnectLocal = "mongodb://localhost:27017/users";
const dbConnectAtlas = "mongodb+srv://istable:istable123@istable.y4geq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(process.env.MONGODB_URI || dbConnectLocal , { useNewUrlParser: true }).then(() => {
    console.log("connected");
})
    .catch((e) => {
        console.log("no connected");
    })