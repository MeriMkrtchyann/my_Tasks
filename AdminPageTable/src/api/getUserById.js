import { stringify } from 'qs';
import { urls } from '../config/urls';

export const getUserById = () => ({
  query: (params) => ({
    url: `${urls.details}?${stringify(params)}`,
    method: 'GET',
  }),
});