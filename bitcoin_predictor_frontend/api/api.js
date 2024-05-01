import { create } from 'apisauce';

const baseURL = create({ baseURL: '',  method: "get", headers: { Accept: 'application/json' } });

export default {
    baseURL
}