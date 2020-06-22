const router = require('express').Router();
const axios = require('axios');
const db = require('./db');

router.get('/',(req, res) => {
    db.Investor.find().then(docs => res.status(200).send(docs))
            .catch((err) => res.status(400).send(err));
});


router.get('/investor/:username', (req, res) =>{
    db.Investor.findOne({username : req.params.username}).then((doc) => {
        if(doc){
            res.status(200).send(doc);
        }else{
            res.status(404).send({message : "Investor doesn't exist"});
        }
    }).catch((err) => res.status(400).send(err));
})

router.post('/order', (req, res) => {
    db.Investor.findOne({username : req.body.username}).then((investor) => {
        if(!investor){
            console.log(req.body);
            res.status(404).send({message : "Investor doesn't exist"})
        }else{
            let order = req.body.order;
            investor.orders.push(order);
            investor.walletBalance -= order.price;
            let purchase = {
                username : order.pName,
                id : order.tId,
                percent : order.stakePurchased,
                price : order.price
            }
            axios.post('http://player-service:8070/purchase', purchase).then((res) =>{
                console.log(res);
            }).catch((err) => console.log(err));
            investor.save().then((doc) => {
                res.status(200).send(doc);
            }).catch((err) => res.status(400).send(err));
        }
    }).catch((err) => {console.log(err); res.status(400).send(err)})
})


exports.router = router;