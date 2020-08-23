import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {
  API_KEY,
  APP_AUTH_DOMAIN,
  APP_ID,
  DATABASE_URL,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  STORAGE_BUCKET,
} from '../utils/apiKeys';

const app = firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: APP_AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: 'tracing-job-search',
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
});
const db = app.firestore();
export { app, db };

