function userCard(index) {
  let balance = 100;
  let transactionLimit = 100;
  let historyLogs = [];
  let key = index;

  function getCardOptions() {
    return {
      key: key,
      balance: balance,
      transactionLimit: transactionLimit,
      historyLogs: historyLogs
    };
  }

  function addToHistoryLog(operationType, credits) {
    historyLogs.push({
      operationType: operationType,
      credits: credits,
      operationTime: new Date().toLocaleString('en-GB',
          {timeZone: 'Europe/Kiev'})
    });
  }

  function putCredits(creditsAmount) {
    balance += creditsAmount;
    addToHistoryLog('Received credits', creditsAmount);
  }

  function takeCredits(creditsAmount) {

    if (transactionLimit < creditsAmount || balance < creditsAmount) {
      console.log(
          'Declined. Please, check your transaction limit and current balance.');
      return false;
    } else {
      balance -= creditsAmount;
      addToHistoryLog('Withdrawal of credits', creditsAmount);
      return true;
    }
  }

  function setTransactionLimit(creditsAmount) {
    transactionLimit = creditsAmount;
    addToHistoryLog('Transaction limit change', creditsAmount);
  }

  function transferCredits(creditsAmount, card) {

    if (card === this) {
      console.log(
          'Incorrect data. Please, check your recipient\'s card details and try again');
      return;
    }
    let tax = 0.005;

    if (takeCredits(creditsAmount + tax * creditsAmount)) {
      card.putCredits(creditsAmount);
    }
  }

  return {
    getCardOptions: getCardOptions,
    putCredits: putCredits,
    takeCredits: takeCredits,
    setTransactionLimit: setTransactionLimit,
    transferCredits: transferCredits
  };
}

class UserAccount {

  constructor(name) {
    this.name = name;
    this.cards = [];
  }

  addCard() {
    let maxCardsNum = 3;

    if (this.cards.length < maxCardsNum) {
      let card = userCard(this.cards.length + 1);
      this.cards.push(card);
    } else {
      console.log('Declined. Available number of cards is exceeded.');
    }
  }

  getCardByKey(key) {
    return this.cards[key - 1];
  }
}

