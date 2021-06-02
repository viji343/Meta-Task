import axios from "axios";
import { BACKEND_URL } from '../constant';

const ApiService = {
    fetchData: (apiType, page, client_page) => {
        return axios.get(BACKEND_URL + apiType + '?page=' + page + '&omdb_page=' + client_page)
            .then((response) => {
                console.log('fetchdataresponse')
                return response.data;
            })
            .catch((err) => {
                console.log('fetchdataerr')

                const message = err.message || err.toString();
                return message;
            });
    },
}

export default ApiService;