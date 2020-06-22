const router = require('express').Router();
const db = require('./db');

router.get('/',(req, res) => {
    db.Player.find().then(docs => res.status(200).send(docs))
            .catch((err) => res.status(400).send(err));
});


router.get('/player/:username', (req, res) =>{
    db.Player.findOne({username : req.params.username}).then((doc) => {
        if(doc){
            res.status(200).send(doc);
        }else{
            res.status(404).send({message : "Player doesn't exist"});
        }
    }).catch((err) => res.status(400).send(err));
})

router.post('/tournament', (req, res) => {
    db.Player.findOne({username : req.body.username}).then((player) => {
        if(!player){
            res.status(404).send({message : "Player doesn't exist"})
        }else{
            player.stakings.push(req.body.tournament);
            player.save().then((doc) => {
                res.status(200).send(doc);
            }).catch((err) => res.status(400).send(err));
        }
    }).catch((err) => {res.status(400).send(err)})
})

router.post('/purchase', (req, res) => {
    db.Player.findOne({username : req.body.username}).then((player) => {
        if(!player){
            res.status(404).send({message : "Player doesn't exist"})
        }else{
            let tournament = player.stakings.find((element) => { return element.id == req.body.id});
            tournament.stakeAvailable = tournament.stakeAvailable - req.body.percent;
            player.walletBalance += req.body.price;
            player.save().then((doc) => {
                res.status(200).send(doc);
            }).catch((err) => res.status(400).send(err));
        }
    }).catch((err) => {console.log(err); res.status(400).send(err)})
})

exports.router = router;