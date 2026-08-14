const userRouter = require("./user");

function router(app) {
  app.get("/", userRouter);
}

module.exports = router;
