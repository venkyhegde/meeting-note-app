var OfferModel = require('../model/OfferDB');

  OfferModel.addOffer(userId,itemCodeOwn,itemCodeWant,userId,status).then(docs => {
                data.item = docs
                
                res.render('somePage', {data:data});
        }).catch(err =>{
                console.error(err);
    })