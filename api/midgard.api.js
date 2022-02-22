// axios instance
import { $axiosInstace } from './index';

export function getStats() {
  return $axiosInstace.get('/stats')
}