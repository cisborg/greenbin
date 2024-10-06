// redux/reducers/transactionReducer.js
import {
    DEPOSIT_CASH,
    CONVERT_TO_POINTS,
    BUY_PRODUCT,
    PAY_SQUAD,
    DONATE_POINTS,
    BUY_AIRTIME,
    BUY_GOODS,
    PAY_WIFI_PACKAGE,
  } from '../actions/actionTypes';
  
  const initialState = {
    cashBalance: 0,
    creditPoints: 0,
    transactions: [],
  };
  
  const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
      case DEPOSIT_CASH:
        const depositAmount = action.payload;
        const deduction = depositAmount * 0.10; // 10% deduction
        const newCashBalance = state.cashBalance + depositAmount - deduction;
        const newTransactions = [...state.transactions, { type: 'Deposit', amount: depositAmount }];
        return {
          ...state,
          cashBalance: newCashBalance,
          transactions: newTransactions,
        };
  
      case CONVERT_TO_POINTS:
        const points = (action.payload / 10) * 100; // 10sh for 100 points
        return {
          ...state,
          creditPoints: state.creditPoints + points,
        };
  
      case BUY_PRODUCT:
        // Implement logic to deduct points or cash for buying products
        return state;
  
      case PAY_SQUAD:
        // Implement logic for creating a squad
        return state;
  
      case DONATE_POINTS:
        return {
          ...state,
          creditPoints: state.creditPoints - action.payload,
        };
  
      case BUY_AIRTIME:
        // Implement logic for buying airtime
        return state;
  
      case BUY_GOODS:
        // Implement logic for buying goods using till number
        return state;
  
      case PAY_WIFI_PACKAGE:
        // Implement logic for paying wifi packages
        return state;
  
      default:
        return state;
    }
  };
  
  export default transactionReducer;
  