import axios from 'axios';

export const ADD_NUM = 'ADD_NUM';
export const DEL_NUM = 'DEL_NUM';
export const ERROR_MSG = 'ERROR_MSG';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const SIGN_SUCCESS ='SIGN_SUCCESS';
export const CLEAR_MSG = 'CLEAR_MSG';
export const INIT_ARTICLE = 'INIT_ARTICLE';
export const INIT_USERINFO = 'INIT_USERINFO';
export const INIT_MESSAGE = 'INIT_MESSAGE';
export const INIT_MUSIC = 'INIT_MUSIC';
export const CHANGE_MUSIC = 'CHANGE_MUSIC';

export function errorMsg(msg){
	return {type: ERROR_MSG, msg };
}
export function signSuccess(v){
	const { password, ...data } = v;
	return {type: SIGN_SUCCESS, payload: data};
}

export const clearMsg = (payload) => ({
    type: CLEAR_MSG,
    payload
});

export const initArticle = (payload) =>({
	type: INIT_ARTICLE,
	payload
});

export const initUserInfo = (payload) =>({
	type: INIT_USERINFO,
	payload
});

export const initMessage = (payload) =>({
	type: INIT_MESSAGE,
	payload
})

export const initMusic = (payload) =>({
	type: INIT_MUSIC,
	id: 0,
	payload
})

export const changeMusic = (id) =>({
	type: CHANGE_MUSIC,
	id
})

export function register({account, password, repassword}){
	return dispatch=>{
		axios.post('/user/register', { account, password })
			.then(( res ) => {
				if( res.status === 200 && res.data.code === 0){
					dispatch(signSuccess({account, password}))
				} else {
					dispatch(errorMsg(res.data));
				}
			})
	}
}

export function signin({account, password}){
	return dispatch=>{
		axios.post('/user/signin', {account, password})
			.then( res=>{
				if(res.status === 200 && res.data.code === 0 ){
					dispatch(signSuccess(res.data.data))
				} else {
					dispatch(errorMsg(res.data));
				}
			})
	}
}


export function initArticleList( category ){
	return dispatch =>{
		axios.post('/article/initArticleList', { category })
			.then( res => {
				if( res.status === 200 ){
					dispatch(initArticle(res.data.data))
				}
			})
	}
}

export function delArticle( id ){
	return dispatch =>{
		axios.post('/article/delArticle', {id})
			.then( res => {
				if( res.status === 200 && res.data.code === 1 ){
					alert('删除成功！');
				}
			})
			.then( ()=>{
				dispatch(initArticleList('全部'));
			})
	}
}

export function getUserInfo(){
	return dispatch =>{
		axios.get('/user/info')
			.then( res => {
				if( res.status === 200 && res.data.code === 0){
					dispatch(initUserInfo(res.data.data));
				}
			})
	}
}

export function getBlogInfo(){
	return dispatch =>{
		axios.get('/user/blogInfo')
			.then( res => {
				if( res.status === 200 && res.data.code === 0){
					dispatch(initUserInfo(res.data.data));
				}
			})
	}
}

export function getMessage(){
	return dispatch =>{
		axios.get('/message/initMessage')
			.then( res =>{
				if( res.status === 200 && res.data.code === 0){
					dispatch(initMessage(res.data.data))
				}
			})
	}
}

export function delMessage(id){
	return dispatch =>{
		axios.post('/message/delMessage', {id})
			.then( res =>{
				if( res.status === 200 && res.data.code === 0){
					dispatch(getMessage())
				}
			})
	}
}

export function postMessage( value){
	return dispatch =>{
		axios.post('/message/postMessage', value)
			.then( res =>{
				if( res.status === 200 && res.data.code === 0){
					dispatch(getMessage());
				}
			})
	}
}

export function getMusicList(){
	return dispatch =>{
		axios.get('/music/initMusic')
			.then( res =>{
				if( res.status === 200 && res.data.code === 0 ){
					dispatch( initMusic(res.data.data) )
				}
			})
	}
}
