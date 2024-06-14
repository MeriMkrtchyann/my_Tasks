import { stringify } from 'qs';
import { urls } from '../config/urls';

export const getUsers = () => ({
  query: (params) => ({
    url: `${urls.aboutUsers}?${stringify(params)}`,
    method: 'GET',
  }),
});
