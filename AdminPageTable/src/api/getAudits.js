import { stringify } from 'qs';
import { urls } from '../config/urls';

export const getAudits = () => ({
  query: (params) => ({
    url: `${urls.audits}?${stringify(params)}`,
    method: 'GET',
  }),
});