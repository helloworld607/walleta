const userRouter = require("./user");
const transactionRouter = require("./transaction");

function router(app) {
  app.use("/", userRouter);
  app.use("/transactions", transactionRouter);
}

module.exports = router;
