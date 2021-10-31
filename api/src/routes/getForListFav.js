const { Router } = require("express");
const router = Router();
const { User, Client} = require('../db');


router.get('/:id', async(req, res, next) => {
    const {id} = req.params
    
   try {
       
    const client = await Client.findOne({
        where: { 
            id: id,
            status: "active"
        },
        include: User,
      });
        
      const usersFav = client.users.filter(el=> el.user_client.favourite === true)
      

       return res.json(usersFav)
          
    }catch(error){
        next(error)
    }
})

module.exports = router;