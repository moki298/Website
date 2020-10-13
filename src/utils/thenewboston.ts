import axios from 'axios';

import {Contributor, Opening} from 'types/thenewboston';

export const fetchContributors = async (): Promise<Contributor[]> => {
  const {data} = await axios.get('http://127.0.0.1:8000/contributors');
  return data;
};

export const fetchOpenings = async (): Promise<Opening[]> => {
  const {data} = await axios.get('http://127.0.0.1:8000/openings');
  return data;
};
