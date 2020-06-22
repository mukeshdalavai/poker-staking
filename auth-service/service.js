const router = require('express').Router();
const db = require('./db');

router.get('/',(req, res) => {
    db.User.find().then(docs => res.status(200).send(docs))
            .catch((err) => res.status(400).send(err));
});


router.post('/auth', (req, res) =>{
    db.User.findOne({username : req.body.username}).then((doc) => {
        if(doc){
            if(doc.password == req.body.password){
                res.status(200).send(doc);
            }else{
                res.status(400).send({message : "Incorrect Password"});
            }
        }else{
            res.status(400).send({message : "User doesn't exist"});
        }
    })
})

exports.router = router;