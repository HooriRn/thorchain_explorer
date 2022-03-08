// axios instance
import { $axiosInstace, THORNODE_URL } from './index';

export function getMimir() {
  return $axiosInstace.get(THORNODE_URL + '/mimir');
}

export function getBalance(address) {
  return $axiosInstace.get(THORNODE_URL + `/bank/balances/${address}`);
}