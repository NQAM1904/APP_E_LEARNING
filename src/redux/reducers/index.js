import {combineReducers} from 'redux';
import showAlertReducer from './showAlertReducer';
const allReducers = combineReducers({
  showAlertReducer,
});

export default allReducers;
