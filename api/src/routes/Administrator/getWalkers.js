const { Router } = require("express");
const { User } = require("../../db");

const router = Router();

router.get("/", async (req, res) => {
  const email = req.query.email;

  try {
    const allActiveWalkers = await User.findAll();

    const allActiveWalkersCards = await allActiveWalkers?.filter(
      (w) => w.status !== "removed"
    );

    if (allActiveWalkersCards.length) {
      //GET BY NAME
      if (email) {
        try {
          const nameSearch = allActiveWalkersCards.filter((user) =>
            user.email.includes(email)
          );
          return res.status(200).send(nameSearch);
        } catch (error) {
          return console.error(error);
        }
      }

      return res.status(200).json(allActiveWalkersCards);
    } else {
      return res.status(200).send(allActiveWalkersCards);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
