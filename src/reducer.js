import {combineReducers} from "redux"

import * as ScoreBoard from './components/ScoreBoard';

export default combineReducers({
    [ScoreBoard.NAME]: ScoreBoard.reducer
});