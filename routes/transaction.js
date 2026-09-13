const WalletController = require("../controllers/app/WalletController");
const express = require("express");
const router = express.Router();

router.get("/", WalletController.showTransaction);
router.get("/add", WalletController.addTransaction);
router.post("/create", WalletController.createTransaction);
router.put("/edit/:id", WalletController.edit);
router.get("/edit/:id", WalletController.editTransaction);
router.get("/:id", WalletController.showTransactionDetail);

module.exports = router;
