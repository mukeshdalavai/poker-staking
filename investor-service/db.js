const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/investor',{useNewUrlParser : true, useUnifiedTopology : true},(err) =>{
    if(!err){
        console.log('Connected to mongoDB....');
        Investor.find().then(docs => {
            if(docs.length == 0){
                const mukesh = new Investor({
                    username : "mukeshdalavai@gmail.com",
                    name : "Mukesh Dalavai",
                    orders : [],
                    walletBalance : 100000
                })
                mukesh.save({new : true}).then((doc) => console.log(doc));
            }
        }).catch((err) => console.log(err));
        
    }else{
        console.log('Error in Connection -> ' + err);
    }
})

const OrderSchema = new mongoose.Schema({
    id : Number,
    platform : String,
    pName : String,
    tId : Number,
    tName : String,
    buyIn : Number,
    markUp : Number,
    stakePurchased : Number,
    price : Number
})

const InvestorSchema = new mongoose.Schema({
    username : String,
    name : String,
    orders : [OrderSchema],
    walletBalance : Number
})

const Investor = mongoose.model('investor',InvestorSchema);

exports.Investor = Investor;
