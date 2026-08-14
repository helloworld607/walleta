const WalletController = require("../controllers/app/WalletController");
const express = require("express");
const router = express.Router();

router.get("/", WalletController.getUserData);

module.exports = router;
