const fs = require("fs");

fs.readFile("./invoice.csv", "utf-8", (err, data) => {
  if (err) console.log(err);
  else {
    let items = data.split("\n");
    items[0] += ",tax";
    items = calculateTax(items);
    fs.writeFile("./result.csv", items.join("\n"), "utf-8", (err) => {
      if (err) console.log(err);
      else console.log("Tax Calculated");
    });
  }
});

const calculateTax = (items) => {
  tax = {
    0: 5,
    1: 8,
    2: 12,
  };
  for (let i = 1; i < items.length; i++) {
    let item = items[i].split(",").map(Number);
    if (tax[item[2]] !== undefined) {
      tax_amount = item[1] * (tax[item[2]] / 100);
      item.push(tax_amount.toFixed(2));
      items[i] = item.join(",");
    }
  }
  return items;
};
