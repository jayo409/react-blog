import { INIT_MESSAGE } from '../actions/actions';

export function message(state = [], action){
	switch(action.type){
		case INIT_MESSAGE :
			return [...action.payload];
		default :
			return [...state];
	}
}


