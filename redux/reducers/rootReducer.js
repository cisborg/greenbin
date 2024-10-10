import { combineReducers } from "redux";
import authReducer from "./authReducer";
import transactionReducer from "./transactionReducer";
import  pointsReducer from "./greenPoints";
import callsReducer from "./callsReducer";
import messagesReducer from "./message";
import orderHistoryReducer from "./orderHistory";
import squadActivitiesReducer from "./squadEvents";
import squadProgress from "./squadProgress";
import tiersReducer from "./tiersReducer";
import squadLeaderboardReducer from "./squadLeaderboard";
import leaderboardReducer from "./leaderBoard";
import goodsReducer from "./goodsReducer";
import productDetailsReducer from "./productDetail";
import squadReducer from "./squadsData";
import activitiesReducer from "./activitiesReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
  greenPoints: pointsReducer,
  message: messagesReducer,
  orderHistory:orderHistoryReducer,
  squadEvents: squadActivitiesReducer,
  squadProgress: squadProgress,
  tiers: tiersReducer,
  squadLeaderBoard: squadLeaderboardReducer,
  leaderBoard: leaderboardReducer,
  goods: goodsReducer,
  productDetail:productDetailsReducer,
  squadsData: squadReducer,
  activities: activitiesReducer,
  calls: callsReducer,



});

export default rootReducer;