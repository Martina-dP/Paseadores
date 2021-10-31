const { Router } = require("express");
const { Client } = require("../../db");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");
const router = Router();

router.get("/", async (req, res) => {
  const  email  = req.query.email;

  try {
    const allClients = await Client.findAll(
      {where: {
      status: "active" ,
    }}
    ,);
/*
    const allInfoClients = await allClients?.map((w) => {
      return {
        id: w.id,
        email: w.email,
        name: w.name,
        surname: w.surname,
        dni : w.dni,
        image: w.image,
        phone : w.phone,
        service: w.service,
        ubication: w.ubication,
        reputation: w.reputation,
        description : w.description
      };
    });*/
    if (allClients.length) {
      //GET BY NAME
      if (email) {
        try {
          const nameSearch = allClients.filter(
            (user) => user.email.includes(email) 
          );
          return res.status(200).send(nameSearch);
        } catch (error) {
         return console.error(error);
        }
      }
      
      return res.status(200).json(allClients)
      
    } else {
      return res.status(200).send(allClients);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;



