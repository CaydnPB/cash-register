const drawer = require('./drawer')

// Level 1: removeItem and addItem

function removeItem(name, drawer) {
  const currentCurrency = drawer.find(item => item.name === name);
  if (currentCurrency) {
    currentCurrency.quantity--;
  }
  return drawer;
}

function addItem(name, drawer) {
  const currentCurrency = drawer.find(item => item.name === name);
  if (currentCurrency) {
    currentCurrency.quantity++;
  }
  return drawer;
}

// Level 2: countCoins and countNotes

function countCoins(drawer) {
  let coinCount = 0;
  for (let i = 0; i < drawer.length; i++) {
    if (drawer[i].name === "penny" || drawer[i].name === "nickel" || drawer[i].name === "dime" || drawer[i].name === "quarter") {
      coinCount += drawer[i].quantity;
    }
  }
  return coinCount;
}

function countNotes(drawer) {
  let noteCount = 0;
  for (let i = 0; i < drawer.length; i++) {
    if (drawer[i].name === "one" || drawer[i].name === "five" || drawer[i].name === "ten" || drawer[i].name === "twenty" || drawer[i].name === "hundred") {
      noteCount += drawer[i].quantity;
    }
  }
  return noteCount;
}

// Level 3: sumDrawer

function sumDrawer(drawer) {
  let totalCents = 0;
  for (let i = 0; i < drawer.length; i++) {
    totalCents += drawer[i].value * drawer[i].quantity;
  }
  let totalDollars = (totalCents / 100).toFixed(2);
  return "$" + totalDollars;
}

// Level 4: canMakeAmount

function canMakeAmount(target, drawer) {
  for (let i = drawer.length - 1; i >= 0; i--) {
    const currency = drawer[i];
    if (currency.value <= target) {
      const maxToUse = Math.min(currency.quantity, Math.floor(target / currency.value));
      target -= maxToUse * currency.value;
    }
  }
  return target === 0;
}

// Level 5: transaction

function transaction(cost, paid, drawer) {
  let change = paid - cost;
  for (let i = drawer.length - 1; i >= 0; i--) {
    const currency = drawer[i];
    if (currency.value <= change) {
      const maxToUse = Math.min(currency.quantity, Math.floor(change / currency.value));
      currency.quantity -= maxToUse;
      change -= maxToUse * currency.value;
    }
  }
  for (let i = drawer.length - 1; i >= 0; i--) {
    const currency = drawer[i];
    if (currency.value <= paid) {
      const quantityReceived = Math.floor(paid / currency.value);
      currency.quantity += quantityReceived;
      paid -= quantityReceived * currency.value;
    }
  }
  return drawer;
}

module.exports = {
  removeItem,
  addItem,
  countCoins,
  countNotes,
  sumDrawer,
  canMakeAmount,
  transaction
}