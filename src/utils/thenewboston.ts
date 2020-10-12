import axios from 'axios';

import {Contributor} from 'types/thenewboston';

export const fetchContributors = async (): Promise<Contributor[]> => {
  const {data} = await axios.get('http://127.0.0.1:8000/contributors');
  return data;
};
