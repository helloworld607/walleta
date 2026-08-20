const User = require("../../models/User");
const Transaction = require("../../models/Transaction");

class WalletController {
  async getUserData(req, res) {
    const userData = await User.find().lean();
    const transactionData = await Transaction.find().lean();

    userData[0].balance = userData[0].balance.toLocaleString("vi-VN");
    transactionData.forEach((x) => {
      x.amount = x.amount.toLocaleString("vi-VN");
    });

    res.render("home", {
      Userdata: userData,
      TransactionData: transactionData,
    });
  }
}

module.exports = new WalletController();
