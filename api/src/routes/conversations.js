const { Router } = require("express");
const router = Router();
const { Conversation } = require("../db");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

//POST CONVERSATION
router.post("/", async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConverstion = await newConversation.save();
    return res.status(200).json(savedConverstion);
  } catch (e) {
    return next(e);
  }
});

//GET CONVERSATION
router.get("/:userId", async (req, res, next) => {
  try {
    const conversation = await Conversation.findAll({
      where: {
        members: {
          [Op.contains]: [req.params.userId],
        },
      },
    });
    return res.status(200).json(conversation);
  } catch (e) {
    return next(e);
  }
});

//get conv dos user id

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      where: {
        members: {
          [Op.contains]: [req.params.firstUserId, req.params.secondUserId],
        },
      },
    });
    res.status(200).json(conversation);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
