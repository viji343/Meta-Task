import {
    GET_DATA_SUCCESS,
    INCREMENT_CLIENT_PAGE
} from "./types";
import axios from "axios";
import { BACKEND_URL } from '../constant';

/**
 * To get data for matrix
 * @param {*} apiType 
 * @returns 
 */
export function getData(params) {
    return (dispatch, getState) => {
        return axios(BACKEND_URL + params.apiType + '?page=' + params.page + '&omdb_page=' + params.client_page)
            .then((response) => response.data)
            .then(response => {
                if (params.isFrom == 'button') {
                    dispatch({
                        type: INCREMENT_CLIENT_PAGE,
                        payload: { type: params.type, total: response.totalResult },
                    });
                }
                if (response) {
                    dispatch({
                        type: GET_DATA_SUCCESS,
                        payload: { type: params.type, apiType: params.apiType, response: response }
                    });
                }
                return response;
            });
    }
}
