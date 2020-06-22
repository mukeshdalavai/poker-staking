const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/auth',{useNewUrlParser : true, useUnifiedTopology : true},(err) =>{
    if(!err){
        console.log('Connected to mongoDB....');
        User.find().then(docs => {
            if(docs.length == 0){
                const mukesh = new User({
                    username : "mukeshdalavai@gmail.com",
                    password : "12345678",
                    role : "investor",
                    creationDate : Date.now(),
                })
                mukesh.save({new : true}).then((doc) => console.log(doc));
                
                const shriram = new User({
                    username : "shriramvarma1997@gmail.com",
                    password : "12345678",
                    role : "player",
                    creationDate : Date.now(),
                })
                shriram.save({new : true}).then((doc) => console.log(doc));

                const bhalu = new User({
                    username : "ashutoshbalodhi.ab@gmail.com",
                    password : "12345678",
                    role : "player",
                    creationDate : Date.now(),
                })
                bhalu.save({new : true}).then((doc) => console.log(doc));
            }
        }).catch((err) => console.log(err));
        
    }else{
        console.log('Error in Connection -> ' + err);
    }
})

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    enrollmentDate : Date,
    role : String

})

const User = mongoose.model('user',UserSchema);

exports.User = User;
