const { Router } = require("express");
const router = Router();
const { User, Client } = require("../db");
const bcryptjs = require("bcryptjs");

router.post("/", async (req, res) => {
  const {
    id,
    ubication,
    name,
    surname,
    dni,
    birth_day,
    image,
    phone,
    email,
    password,
    service,
    front_dni,
    back_dni,
  } = req.body;

  let passwordHash = await bcryptjs.hash(password, 8);

  try {
    const verificacion = await Client.findOne({
    where: {
      email: email,
    },
  });
  if(!verificacion){
    const [user, created] = await User.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        ubication: ubication,
        name: name,
        dni: dni,
        surname: surname,
        birth_day: birth_day,
        image: image,
        phone: phone,
        service: service,
        password: passwordHash,
        front_dni: front_dni,
        back_dni: back_dni
      },
    });
    if (!created) {
      return res
        .status(400)
        .json({ message: "Your email adress is already registered" });
    }

    res.status(201).json(user);

  }else{ return res
    .status(400)
    .json({ message: "Your email adress is already registered" });}

  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
