import { urls } from '../config/urls';

export const getUserInfo = (userId) => ({
    query: () => ({
        url: `${urls.userDetails}/${userId}`,
        method: 'GET',
      }),
});