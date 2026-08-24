class formatMoney {
  formatMoneyToVN(x) {
    return x.toLocaleString("vi-VN");
  }

  formatMoneyArrayToVN(x) {
    x.forEach((x) => {
      x.amount = x.amount.toLocaleString("vi-VN");
    });

    return x;
  }

  formatDateToVN(x) {
    return new Date(x).toLocaleString("vi-VN");
  }

  formatDateArrayToVN(x) {
    x.forEach((x) => {
      x.date = new Date(x.date).toLocaleString("vi-VN");
    });

    return x;
  }
}

module.exports = new formatMoney();
