import { combineReducers } from 'redux';

import { user } from './user';
import { article } from './article';
import { message } from './message';
import { music } from './music';

const reducers = combineReducers({
	user,
	article,
	message,
	music
})

export default reducers