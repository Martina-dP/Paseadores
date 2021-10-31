const { Router } = require("express");
const { User, Client, Administrator } = require("../../db");
const { Op } = require("sequelize");

const router = Router();

router.post("/", async (req, res) => {
  const  {id} = req.body;
  
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

      const newAdmin = await Administrator.findOrCreate({
        where: {
          email: client.email,
        },
        defaults: {
          name: client.name,
          surname: client.surname,
          password: client.password,
        },
      });
      client.status = "removed"
      await client.save() 
      }else if(user){
        const newAdmin = await Administrator.findOrCreate({
            where: {
              email: user.email,
            },
            defaults: {
              name: user.name,
              surname: user.surname,
              password: user.password,
            },
          });
          user.status = "removed"
          await user.save() 
      }
      
      res.json("El usuario ahora es admin")
      
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;