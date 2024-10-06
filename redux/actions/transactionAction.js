// redux/actions.js
import {
    DEPOSIT_CASH,
    CONVERT_TO_POINTS,
    BUY_PRODUCT,
    PAY_SQUAD,
    DONATE_POINTS,
    BUY_AIRTIME,
    BUY_GOODS,
    PAY_WIFI_PACKAGE,
  } from './actionTypes';
  
  export const depositCash = (amount) => ({
    type: DEPOSIT_CASH,
    payload: amount,
  });
  
  export const convertToPoints = (amount) => ({
    type: CONVERT_TO_POINTS,
    payload: amount,
  });
  
  export const buyProduct = (productId) => ({
    type: BUY_PRODUCT,
    payload: productId,
  });
  
  export const createSquad = (squadId) => ({
    type: PAY_SQUAD,
    payload: squadId,
  });
  
  export const donatePoints = (points) => ({
    type: DONATE_POINTS,
    payload: points,
  });
  
  export const buyAirtime = (amount) => ({
    type: BUY_AIRTIME,
    payload: amount,
  });
  
  export const buyGoods = (tillNumber) => ({
    type: BUY_GOODS,
    payload: tillNumber,
  });
  
  export const payWifiPackage = (packageId) => ({
    type: PAY_WIFI_PACKAGE,
    payload: packageId,
  });
  