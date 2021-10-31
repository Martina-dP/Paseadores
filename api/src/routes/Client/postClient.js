const { Router } = require("express");
const router = Router();
const { Client, User} = require("../../db");
const bcryptjs = require("bcryptjs");

router.post("/", async (req, res) => {
  const {
    ubication,
    name,
    surname,
    dni,
    image,
    phone,
    email,
    password,
    description
  } = req.body;

  let passwordHash = await bcryptjs.hash(password, 8);


  try {
  
    const verificacion = await User.findOne({
        where: {
          email: email,
        },
      });
      if(!verificacion){
    const [client, created] = await Client.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        ubication: ubication,
        name: name,
        dni: dni,
        surname: surname,
        image: image,
        phone: phone,
        password: passwordHash,
        description: description
      },
    });
    if (!created) {
      return res
        .status(400)
        .json({ message: "Your email adress is already registered" });
    }

    res.status(201).json(client);
}else{ return res
    .status(400)
    .json({ message: "Your email adress is already registered" });}

  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
