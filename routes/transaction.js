const WalletController = require("../controllers/app/WalletController");
const express = require("express");
const router = express.Router();

console.log("transaction route");
router.get("/", WalletController.createTransaction);

module.exports = router;
