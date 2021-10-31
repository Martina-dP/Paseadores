const { Router } = require("express");
const { User } = require("../db");

const router = Router();

router.get("/", async (req, res) => {

// const {currentPage, limitPerPage} = req.query

//   const pageN = Number.parseInt(currentPage);
//   const pageL = Number.parseInt(limitPerPage);

//   let page = 0;
//   if (!Number.isNaN(pageN) && pageN > 0) {
//     page = pageN;
//   }

//   let limit = 5;
//   if (!Number.isNaN(pageL) && pageL > 0 && pageL < 10) {
//     limit = pageL;
//   }

  try {
    const allwalkers = await User.findAll({
      // limit: limit,
      // offset: page * limit,
      where: {
        status: "active",
        premium: true
      },
    });
    const allPremium= await allwalkers.map((w) => {
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
        premium: w.premium,
      
      };
    });

    console.log("TODOSSSOSOS",allwalkers);

    res.send(allPremium)

  } catch (error) {
    console.error(error);
  }
});

module.exports = router;