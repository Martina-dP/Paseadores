const { Router } = require("express");
const { User } = require("../../db");
const { Op } = require("sequelize");

const router = Router();

router.get("/", async (req, res) => {
  const ubication = req.query.ubication;
  let ubicationSearch = [];
  try {
    const allActiveWalkers = await User.findAll({
      where: {
        status: "active",
      },
    });
    if (allActiveWalkers) {
      const allUbication = await allActiveWalkers.map((w) => w.ubication);
      const allUbi = [...new Set(allUbication)];
      //GET BY NAME

      if (ubication) {
        ubicationSearch = allUbi.filter((user) =>
          user.toLowerCase().includes(ubication.toLowerCase())
        );
      } else {
        ubicationSearch = allUbi;
      }

      const ubicationOrdenAlfabetico = ubicationSearch.sort(function (a, b) {
        if (a > b) {
          return 1;
        }
        if (b > a) {
          return -1;
        }
        return 0;
      });

      res.status(200).send(ubicationSearch);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
