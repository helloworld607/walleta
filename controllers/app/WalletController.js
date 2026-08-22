const User = require("../../models/User");
const Transaction = require("../../models/Transaction");

class WalletController {
  async getUserData(req, res, next) {
    try {
      const userData = await User.find().lean();
      const transactionData = await Transaction.find().lean();

      userData[0].balance = userData[0].balance.toLocaleString("vi-VN");

      transactionData.forEach((x) => {
        x.amount = x.amount.toLocaleString("vi-VN");
        x.date = new Date(x.date).toLocaleDateString("vi-VN");
      });

      res.render("home", {
        Userdata: userData,
        TransactionData: transactionData,
      });
    } catch (err) {
      next(err);
    }
  }

  async createTransaction(req, res, next) {
    try {
      const income = await Transaction.find({
        type: "income",
      }).lean();

      const expense = await Transaction.find({
        type: "expense",
      }).lean();

      const incomeTotal = income.reduce((sum, x) => {
        return sum + x.amount;
      }, 0);

      const expenseTotal = expense.reduce((sum, x) => {
        return sum + x.amount;
      }, 0);

      income.forEach((x) => {
        x.amount = x.amount.toLocaleString("vi-VN");
      });

      res.render("transaction/transactionShower", {
        TransactionData: income,
        income: incomeTotal.toLocaleString("vi-VN"),
        expense: expenseTotal.toLocaleString("vi-VN"),
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new WalletController();
