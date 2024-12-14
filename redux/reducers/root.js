import { combineReducers } from "redux";
import chatReducer from './chats';
import productReducer from './products';
import adminReducer from './admin';
import leaderboardReducer from './leaderBoard';
import paymentReducer from './payments';
import activitiesReducer from "./activities"; 
import  shopReducer from "./shops";
import donationReducer from "./donations";
import eventsReducer from "./events";
import  squadReducer from "./squads";
import postReducer from "./Posts";
import tierReducer from "./tiers";
import reportReducer from "./reports";
import cartReducer from "./cart";
import rewardsReducer from "./rewards";
import balanceReducer from  "./bankGreen"
import vendorReducer from "./vendor";
import authReducer from "./authentication"
import ratingsReducer from "./ratings";
import  purchasesReducer from "./purchases";
import notificationReducer from "./notification";
import wasteReducer from "./greenSurvey";

const rootReducer = combineReducers({
    chat: chatReducer,
    product: productReducer,
    admin: adminReducer,
    leaderboard: leaderboardReducer,
    shops: shopReducer,
    activities: activitiesReducer,
    greenPay: paymentReducer,
    donation: donationReducer,
    posts: postReducer,
    events: eventsReducer,
    squads: squadReducer,
    tiers: tierReducer,
    reports: reportReducer,
    cart: cartReducer,
    rewards: rewardsReducer, 
    balance: balanceReducer, 
    vendor: vendorReducer,
    auth: authReducer,
    rating: ratingsReducer,
    products: productReducer,
    notification: notificationReducer,
    purchases: purchasesReducer,
    waste: wasteReducer,  

});

export default rootReducer;