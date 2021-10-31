const { Router } = require("express");
const router = Router();
const { Message } = require("../db");

//POST

router.post("/", async (req, res, next) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    return res.status(200).json(savedMessage);
  } catch (e) {
    return next(e);
  }
});

router.get("/:conversationId", async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {
        conversationId: req.params.conversationId,
      },
    });
    return res.status(200).json(messages);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
