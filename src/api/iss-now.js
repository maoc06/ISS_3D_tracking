import client from './client';

const endpoint = '/iss-now.json';

const getIssLocationNow = async () => await client.get(endpoint);

const opIssLocation = { getIssLocationNow };

export default opIssLocation;
