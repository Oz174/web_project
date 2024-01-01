const mongoose= require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.set('strictQuery', false);
class Database{

    constructor(){
        this.connect();
        
    }
    connect(){
       // mongodb+srv://hodhod:<password>@?retryWrites=true&w=majority
       mongoose.connect(process.env.CONNECTION_STRING) //this connect method returns a promise
           .then(()=> console.log('Connected to MongoDB'))
           .catch(err => console.error("couldn't connect to MongoDB"))

        // mongoose.connect('mongodb://localhost:27017/MatchReservationSystem',{useNewUrlParser: true, useUnifiedTopology: true})
        //     .then(()=> console.log('Connected to MongoDB'))
        //     .catch(err => console.error("couldn't connect to MongoDB"))
    }

    

    
}
module.exports = new Database();

