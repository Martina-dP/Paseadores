const { Router } = require("express");
const { User, Client, Administrator } = require("../../db");
const { Op } = require("sequelize");

const router = Router();

router.post("/", async (req, res) => {
  const { id} = req.body;

  try {
    const client = await Client.findOne({
        where: {
          id: id,
        },
      });
    const user = await User.findOne({
        where: {
          id: id,
        },
      });

    if (client) {
      //GET BY NAME

     
      client.status = "removed"
      await client.save() 
      return res.json("Usuario eliminado")
      }else if(user){
        
          user.status = "removed"
          await user.save() 
          res.json("Usuario eliminado")
      }
      
      
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;