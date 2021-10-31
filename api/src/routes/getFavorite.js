const { Router } = require("express");
const router = Router();
const { User_client} = require('../db');


router.get('/:id', async(req, res, next) => {
    const {id} = req.params
    
   try {
       
      const client = await User_client.findAll({
        where: { clientId: id },
      });
      const clientsFavourite = client.filter((t) => t.favourite)
      const favourites = clientsFavourite.map((t) => t.userId)
      
      
      
      return res.json(favourites)
          
    }catch(error){
        next(error)
    }
})

module.exports = router;