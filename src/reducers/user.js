import { ERROR_MSG, SIGN_SUCCESS, CLEAR_MSG, INIT_USERINFO } from '../actions/actions';

const initState = {
	msg: '',
	redirectTo: '',
}

export function user(state = initState, action){
	switch(action.type){
		case ERROR_MSG :
			return {...state, msg: action.msg };
		case SIGN_SUCCESS:
			return { ...state, ...action.payload, redirectTo: '/admin' };
		case CLEAR_MSG:
			return { ...state, msg:'' };
		case INIT_USERINFO:
			return { ...state, ...action.payload };
		default :
			return { ...state };
	}
}