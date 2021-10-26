import client from './client';

const endpoint = '/';

const getIssLocationNow = async () => await client.get(endpoint);

const opIssLocation = { getIssLocationNow };

export default opIssLocation;
