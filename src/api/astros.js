import client from './client';

const endpoint = '/astros.json';

const getAstros = async () => await client.get(endpoint);

const opAstros = { getAstros };

export default opAstros;
