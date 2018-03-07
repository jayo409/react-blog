import { INIT_MUSIC, CHANGE_MUSIC } from '../actions/actions';

const initState = {
	musicList: [],
	currentMusic: 0
}

export function music(state = initState, action){
	switch(action.type){
		case INIT_MUSIC :
			return { musicList: [...action.payload], currentMusic:action.id };
		case CHANGE_MUSIC:
			return { ...state, currentMusic: action.id }
		default :
			return { ...state };
	}
}


