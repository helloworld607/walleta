const userRouter = require("./user");
const transactionRouter = require("./transaction");

function router(app) {
  app.get("/", userRouter);
}

module.exports = router;
