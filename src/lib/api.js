import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 90000,
});

let serverReady = false;
let wakePromise = null;

export async function ensureApiReady() {
  if (serverReady) return;
  if (!wakePromise) {
    wakePromise = api
      .get('/health')
      .then(() => {
        serverReady = true;
      })
      .catch(() => {})
      .finally(() => {
        wakePromise = null;
      });
  }
  await wakePromise;
}

export function getApiErrorMessage(err, fallback = 'Something went wrong. Please try again.') {
  if (err?.code === 'ECONNABORTED') {
    return 'The server is waking up — please wait a moment and try again.';
  }
  if (!err?.response) {
    return 'Cannot reach the server. Wait a few seconds and try again.';
  }
  return err.response?.data?.message || fallback;
}
