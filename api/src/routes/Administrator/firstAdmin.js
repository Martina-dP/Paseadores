const { Router } = require("express");
const { User, Client, Administrator } = require("../../db");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");

const router = Router();

router.post("/", async (req, res) => {
  const  {name, surname, email, password} = req.body;
  
  try {
    
    if(password){
        var passwordHash = await bcryptjs.hash(password, 8);
    }

    if (email) {
      //GET BY NAME

      await Administrator.findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          name: name,
          surname: surname,
          password: passwordHash,
        },
      });
      res.json("Admin creado")
    }
      
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;