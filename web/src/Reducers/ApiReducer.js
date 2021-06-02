/* eslint-disable import/no-anonymous-default-export */
import {
	GET_DATA_SUCCESS,
	GET_DATA_FAIL,
	INCREMENT_CLIENT_PAGE
} from "../Actions/types";
/**
 * To init the state
 */
const initialState = {
	apiData: [],
	apiType: '',
	totalCount: 0,
	msg: '',
	client_page: {
		'button-1': 1,
		'button-2': 1,
		'button-3': 1
	}
};
/**
 * To manage api props
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const apiReducer = (state = initialState, action) => {
	const { type, payload, apiType } = action;
	switch (type) {
		case GET_DATA_SUCCESS:
			return {
				...state,
				apiData: payload.response.posters.data,
				apiType: payload.apiType,
				totalCount: payload.response.posters.total,
				type: payload.type,
			};
		case GET_DATA_FAIL:
			return {
				...state,
				msg: payload,
			};
		case INCREMENT_CLIENT_PAGE:
			var current_page = { ...state.client_page };
			if ((current_page['button-' + payload.type] + 1) <= Math.ceil(payload.total / 10)) {
				//only increment if the pagination exist
				current_page['button-' + payload.type] = current_page['button-' + payload.type] + 1;
			}

			return {
				...state,
				client_page: current_page,
			};
		default:
			return state;
	}
};

export default apiReducer;