const userRouter = require("./user");
const transactionRouter = require("./transaction");

function router(app) {
  app.use("/", userRouter);
  app.use("/transaction", transactionRouter);
}

module.exports = router;
