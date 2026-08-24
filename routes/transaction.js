const WalletController = require("../controllers/app/WalletController");
const express = require("express");
const router = express.Router();

router.get("/", WalletController.showTransaction);
// router.get("/", WalletController.);

module.exports = router;
