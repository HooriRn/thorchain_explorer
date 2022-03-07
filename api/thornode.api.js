// axios instance
import { $axiosInstace } from './index';
const thornodeBaseUrl = process.env.THORNODE_URL; 

export function getMimir() {
  return $axiosInstace.get(thornodeBaseUrl + '/mimir');
}