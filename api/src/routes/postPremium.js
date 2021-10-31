const { Router } = require("express");
const { User } = require("../db");
const Stripe = require("stripe");
const { STRIPE } = process.env;
const {sendEmail} = require("../utils/utils")

const stripe = new Stripe(STRIPE)

const router = Router();

router.post("/", async (req, res) => {

    try {
        const { id, amount, email  } = req.body;
        const pago = await stripe.paymentIntents.create({
            amount, 
            currency : "USD",
            description : "Cuenta Premium",
            payment_method : id,
            confirm : true
        })

    if (pago) {
        try {
            const usuario = await User.findOne({
                where: {
                email: email,
                },
        });
            usuario.premium = true
            usuario.save()

            const body =  
        {from: '"Pago exitoso 🐶" <paseadorescuidadores@gmail.com>',
         to: usuario.email, 
         subject: "Solicitud de turno", 
         html: `<b>Hola ${usuario.name}, te queremos informar que tu pago ha sido realizado con éxito.</b>
          <b>Disfruta de los beneficios de ser un usuario Premium!</b>`
        }
        
        await sendEmail(body)

            res.status(200).send({mensaje : "Pago Exitoso"});

            } catch (error){
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
        res.json({mensaje : error.raw.message})
    }  
})

module.exports = router;

