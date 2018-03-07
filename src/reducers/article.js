import { INIT_ARTICLE } from '../actions/actions';

export function article(state = [], action){
	switch(action.type){
		case INIT_ARTICLE :
			return [...action.payload];
		default :
			return [...state];
	}
}


