const User = require("../../models/User");
const helper = require("../../helper/formatters");
const Transaction = require("../../models/Transaction");

class WalletController {
  async getUserData(req, res, next) {
    try {
      //Get data
      const userData = await User.find();
      const transactionData = await Transaction.find().lean();

      //Update user balance
      const newBalance = transactionData.reduce((sum, x) => {
        if (x.type === "expense") {
          sum -= x.amount;
        } else {
          sum += x.amount;
        }

        return sum;
      }, 0);

      userData.balance = newBalance;
      await User.updateOne({}, { $set: { balance: newBalance } });

      //Format
      userData.balance = helper.formatMoneyToVN(userData.balance);

      transactionData.forEach((x) => {
        x.amount = helper.formatMoneyToVN(x.amount);
        x.date = helper.formatDateToVN(x.date);
      });

      //Render
      res.render("home", {
        Userdata: { userData },
        TransactionData: transactionData,
      });
    } catch (err) {
      next(err);
    }
  }

  async showTransaction(req, res, next) {
    try {
      //Get data
      const transactionData = await Transaction.find().lean();
      const userData = await User.find().lean();

      const income = await Transaction.find({
        type: "income",
      }).lean();

      const expense = await Transaction.find({
        type: "expense",
      }).lean();

      //Sum data
      const incomeTotal = income.reduce((sum, x) => {
        return sum + x.amount;
      }, 0);

      const expenseTotal = expense.reduce((sum, x) => {
        return sum + x.amount;
      }, 0);

      //Format
      userData[0].balance = helper.formatMoneyToVN(userData[0].balance);
      helper.formatDateArrayToVN(transactionData);
      helper.formatMoneyArrayToVN(income);
      helper.formatMoneyArrayToVN(transactionData);

      //Render
      res.render("transaction/transactionShower", {
        TransactionData: transactionData,
        userData,
        income: helper.formatMoneyToVN(incomeTotal),
        expense: helper.formatMoneyToVN(expenseTotal),
      });
    } catch (err) {
      next(err);
    }
  }

  async showTransactionDetail(req, res, next) {
    try {
      const transaction = await Transaction.findById(req.params.id).lean();

      if (!transaction) {
        return res.status(404).send("Không tìm thấy giao dịch.");
      }

      transaction.amount = helper.formatMoneyToVN(transaction.amount);
      transaction.date = helper.formatDateToVN(transaction.date);

      return res.render("transaction/transactionDetail", { transaction });
    } catch (err) {
      return next(err);
    }
  }

  async editTransaction(req, res, next) {
    try {
      const transaction = await Transaction.findById(req.params.id).lean();

      const transactionTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(transaction.date);
      const transactionDate = new Intl.DateTimeFormat("vi-VN", {
        timeZone: "Asia/Bangkok",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }).format(transaction.date);

      res.render("transaction/editTransaction", {
        transaction,
        transactionDate,
        transactionTime,
      });
    } catch (err) {
      next(err);
    }
  }

  async edit(req, res, next) {
    try {
      const { d, date, time, ...data } = req.body;
      const id = req.params.id;

      const [day, month, year] = date.split("/");
      const [hour, minute, second] = time.split(":");

      data.date = new Date(year, month - 1, day, hour, minute, second);

      await Transaction.findByIdAndUpdate(id, data);

      res.redirect("/transaction/" + id);
    } catch (err) {
      next(err);
    }
  }

  async addTransaction(req, res, next) {
    try {
      const userData = await User.find();
      const now = new Date();
      console.log(userData);

      const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

      const time =
        `${String(now.getHours()).padStart(2, "0")}:` +
        `${String(now.getMinutes()).padStart(2, "0")}:` +
        `${String(now.getSeconds()).padStart(2, "0")}`;

      res.render("transaction/addTransaction", { date, time, userData });
    } catch (err) {}
  }

  async createTransaction(req, res, next) {
    console.log(req.body);
    const time = req.body.time.split(":");
    const date = req.body.date.split("/");

    const [hour, minute, second] = time;
    const [day, month, year] = date;

    req.body.date = new Date(year, month - 1, day, hour, minute, second);

    await Transaction.create(req.body);
  }
}

module.exports = new WalletController();
