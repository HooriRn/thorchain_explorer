// axios instance
import { $axiosInstace } from './index';
const thornodeBaseUrl = 'https://thornode.ninerealms.com/thorchain'; 

export function getMimir() {
  return $axiosInstace.get(thornodeBaseUrl + '/mimir');
}