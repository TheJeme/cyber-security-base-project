const loginRouter = require("express").Router();
const User = require("../models/user");

// Login user
loginRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findOne({ username: body.username });
  if (user === null) {
    return response.status(401).json({
      error: "Invalid username",
    });
  }

  if (body.password == user.password) {
    return response.status(401).json({
      error: "Invalid password",
    });
  }
  response.json(user);
});

module.exports = loginRouter;
