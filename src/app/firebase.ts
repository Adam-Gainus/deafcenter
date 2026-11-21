import { initializeApp } from 'firebase/app';
import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { environment } from '../environments/environment';

export const firebaseApp = initializeApp(environment.firebase);

export const db = getFirestore(firebaseApp);

export const auth = initializeAuth(firebaseApp, {
  persistence: indexedDBLocalPersistence,
});
