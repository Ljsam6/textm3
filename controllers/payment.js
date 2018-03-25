const stripe = require('stripe')('sk_test_diBBc00iT5pu12JfpTX59v22');
const path = require('path');
const fs = require('fs');

module.exports=function(Ad,formidable){
    return {
        SetRouting: function (router) {
            router.get('/payment', this.displayPayment);

            router.post('/sucess/ad',this.saveImage);
            router.post('/sucess/add', this.saveImageData);
            
            router.post('/payment',this.getpayment);
        },

        displayPayment:function(req,res){
            res.render('payment/payment');
        },

        getpayment:function(req,res){
            const amount=1000;
            stripe.customers.create({
                email:req.body.stripeEmail,
                source:req.body.stripeToken
            })
            .then(customer=>stripe.charges.create({
                amount,
                description: "Advertisement for TextMe",
                currency:'usd',
                customer:customer.id
            }))
            .then(charge=>res.render('sucess'));
        },
        saveImageData:function(req,res){
            const Adv = new Ad();
            Adv.image = req.body.upload;
            Adv.save((err) => {
                console.log(err);
                res.render('payment/payment');
            })
        },

        saveImage:function(req,res){
            
            const form = new formidable.IncomingForm();
            form.uploadDir = path.join(__dirname, '../public/uploads');

            form.on('file', (field, file) => {
                fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
                    if (err) throw err;
                    console.log('file renamed sucessfully');
                });

            });

            form.on('error', (err) => {
                console.log('err');
            });

            form.on('end', () => {
                console.log('file upload sufessfull')
            });

            form.parse(req);
        
           
           
        }
       
       


}
}