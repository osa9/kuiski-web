import { combineReducers } from "redux"

import * as ScoreBoard from './components/ScoreBoard';
import * as DashBoard from './components/DashBoard';


export default combineReducers({
    [ScoreBoard.NAME]: ScoreBoard.reducer,
    [DashBoard.NAME]: DashBoard.reducer
});