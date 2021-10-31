const { Router } = require("express");
const router = Router();
const { User_client } = require('../db');

router.put('/',async(req, res, next) => {
    const { idUser,idClient } = req.body
    try{
        // const user = User.findByPk(iduser)
        // await user.remove Product(idProduct)
        const favEliminado = await User_client.destroy({
            where: {
                clientId: idClient,
            userId: idUser,
            favourite: true,
            score: null,
            comment: null
            }
        })
       if(favEliminado === 0){
        const clientUser = await User_client.findOne({
            where: {
                clientId: idClient,
                userId: idUser,
            }
        })
    
        
        clientUser.favourite = false 
        const paseadorActualizado = await clientUser.save()

    }
    
   return res.send('User removed successfully');
    } catch(error){
        next(error)
    }
})
module.exports = router;