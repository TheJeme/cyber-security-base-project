const loginRouter = require("express").Router();
const User = require("../models/user");

// Login user
loginRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findOne({ username: body.username });

  const passwordCorrect =
    user === null ? false : await (body.password === user.password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "Invalid username or password",
    });
  }

  response.status(200).json({ token });
});

module.exports = loginRouter;
