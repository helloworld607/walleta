const mongoose = require("mongoose");

class WalletController {
  getUserData(req, res) {
    res.render("home");
  }
}

module.exports = new WalletController();
