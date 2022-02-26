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