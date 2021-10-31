const { Router } = require("express");
const { User } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  

  try {
    const allActiveWalkers = await User.findAndCountAll({
      where: {
        status: "active",
        
      },
    });
    const allActiveWalkersCards = await allActiveWalkers.rows.map((w) => {
      return {
        id: w.id,
        email: w.email,
        name: w.name,
        surname: w.surname,
        image: w.image,
        service: w.service,
        ubication: w.ubication,
        reputation: w.reputation,
        price: w.price,
        afternoon: w.afternoon,
        premium: w.premium,
        latitude: w.latitude,
        longitude : w.longitude
      };
    });
    const walkerWithUbication = await allActiveWalkersCards.filter((w) =>w.latitude );
    
    if (walkerWithUbication) {
        console.log(walkerWithUbication)
        res.status(200).send(walkerWithUbication); 
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
