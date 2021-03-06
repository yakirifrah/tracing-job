const API_KEY = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_KEY : process.env.REACT_APP_API_KEY;
const APP_AUTH_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_AUTH_DOMAIN : process.env.REACT_APP_AUTH_DOMAIN;
const DATABASE_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_DATABASE_URL : process.env.REACT_APP_DATABASE_URL;
const STORAGE_BUCKET = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_STORAGE_BUCKET : process.env.REACT_APP_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_MESSAGING_SENDER_ID : process.env.REACT_APP_MESSAGING_SENDER_ID;
const MEASUREMENT_ID = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_MEASUREMENT_ID : process.env.REACT_APP_MEASUREMENT_ID;
const APP_ID = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_APP_ID : process.env.REACT_APP_APP_ID;

export {
  API_KEY,
  APP_AUTH_DOMAIN,
  DATABASE_URL,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  MEASUREMENT_ID,
  APP_ID,
};
