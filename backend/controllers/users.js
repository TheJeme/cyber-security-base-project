const usersRouter = require("express").Router();
const User = require("../models/user");

// Register user with unique username
usersRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = new User({
    username: body.username,
    password: body.password,
    pin: body.pin,
  });

  const newUser = await user.save();
  response.json({ id: newUser.id });
});

// Get user data
usersRouter.get("/", async (request, response) => {
  const user = await User.find();
  response.json(user);
});

module.exports = usersRouter;
