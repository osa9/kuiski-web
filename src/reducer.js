import { combineReducers } from "redux"

import * as ScoreBoard from './components/ScoreBoard';
import * as DashBoard from './components/DashBoard';
import * as MobileBoard from './components/MobileBoard';

export default combineReducers({
    [ScoreBoard.NAME]: ScoreBoard.reducer,
    [DashBoard.NAME]: DashBoard.reducer,
    [MobileBoard.NAME]: MobileBoard.reducer,
});