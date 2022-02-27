// axios instance
import { $axiosInstace } from './index';

export function getStats() {
  return $axiosInstace.get('/stats');
}

export function getTxs(page=0, limit=10) {
  const params = {
    offset: page * limit,
    limit
  }

  return $axiosInstace.get('/actions', { params });
}

export function getConstants() {
  return $axiosInstace.get('thorchain/constants');
}

export function getTx(txid, limit=10) {
  const params = {
    offset: 0,
    limit,
    txid
  }

  return $axiosInstace.get('/actions', {params})
}

export function getAddress(address, page=0, limit=10) {
  const params = {
    offset: page * limit,
    limit,
    address
  }

  return $axiosInstace.get('/actions', {params})
}