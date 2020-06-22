const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/player',{useNewUrlParser : true, useUnifiedTopology : true},(err) =>{
    if(!err){
        console.log('Connected to mongoDB....');
        Player.find().then(docs => {
            if(docs.length == 0){
                const shriram = new Player({
                    username : "shriramvarma1997@gmail.com",
                    name : "Shriram Varma",
                    stakings : [{
                        id : 1,
                        tName : "70 Lakh GTD",
                        platform : "Spartan Poker",
                        buyIn : 70000,
                        stakeAvailable : 45,
                        markUp : 1.15
                      },{
                       id : 2,
                       tName : "15 Lakh GTD",
                       platform : "Poker Stars",
                       buyIn : 25000,
                       stakeAvailable : 65,
                       markUp : 1.2
                      }],
                    walletBalance : 0
                })
                shriram.save({new : true}).then((doc) => console.log(doc));

                const bhalu = new Player({
                    username : "ashutoshbalodhi.ab@gmail.com",
                    name : "Ashutosh Balodhi",
                    stakings : [{
                        id : 1,
                        tName : "1 Cr GTD",
                        platform : "Spartan Poker",
                        buyIn : 100000,
                        stakeAvailable : 70,
                        markUp : 1.4
                      },{
                       id : 2,
                       tName : "80 Lakh GTD",
                       platform : "Poker Stars",
                       buyIn : 70000,
                       stakeAvailable : 50,
                       markUp : 1.3
                      }],
                      walletBalance : 0
                })
                bhalu.save({new : true}).then((doc) => console.log(doc));
            }
        }).catch((err) => console.log(err));
        
    }else{
        console.log('Error in Connection -> ' + err);
    }
})

const StakingSchema = new mongoose.Schema({
    id : Number,
    platform : String,
    tName : String,
    buyIn : Number,
    markUp : Number,
    stakeAvailable : Number
})

const PlayerSchema = new mongoose.Schema({
    username : String,
    name : String,
    stakings : [StakingSchema],
    walletBalance : Number
})

const Player = mongoose.model('player',PlayerSchema);

exports.Player = Player;
