const { Router } = require("express");
const router = Router();
const { User, Client, User_client } = require('../db');


router.post('/',async (req, res, next) =>{
    const { idUser,idClient } = req.body
   
    try {   
        
        const client = await Client.findByPk(idClient)
        const user = await User.findByPk(idUser)
        await client.addUser(user, { through: { favourite: true } });
        
       
            
        return res.status(200).json("Agregado a favorito")
    } catch (error) {
        return next(error)
    }
})

module.exports = router;