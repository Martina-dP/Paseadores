const { Router } = require("express");
const router = Router();
const { User, Client} = require('../db');


router.post('/',async (req, res, next) =>{
    const { idUser,idClient,comment, score } = req.body
   console.log(idUser,idClient,comment, score)
    try {   
        
        const client = await Client.findByPk(idClient)
        const user = await User.findByPk(idUser)
        await client.addUser(user, { through: { comment: comment, score:score } });
        
        
        
       
            
        return res.status(200).json("Dejaste tu valoración")
    } catch (error) {
        return next(error)
    }
})

module.exports = router;

