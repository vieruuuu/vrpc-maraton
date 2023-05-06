import { initializeApp, getApp, getApps } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  indexedDBLocalPersistence,
  initializeAuth,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore/lite";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getDocument } from "./firestore";
import { router } from "@/router";

const appInitialized = getApps().length;

const firebaseApp = appInitialized
  ? getApp()
  : initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_apiKey,
      authDomain: import.meta.env.VITE_FIREBASE_authDomain,
      projectId: import.meta.env.VITE_FIREBASE_projectId,
      storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
      messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
      appId: import.meta.env.VITE_FIREBASE_appId,
    });

export const firestore = appInitialized
  ? getFirestore(firebaseApp)
  : initializeFirestore(firebaseApp, {
      ignoreUndefinedProperties: true,
    });

export const firebaseAuth = appInitialized
  ? getAuth(firebaseApp)
  : initializeAuth(firebaseApp, {
      persistence: [
        indexedDBLocalPersistence,
        browserLocalPersistence,
        browserSessionPersistence,
      ],
    });

export const firebaseStorage = getStorage(firebaseApp);

export const firebaseFunctions = getFunctions(firebaseApp, "europe-central2");

if (import.meta.env.DEV) {
  connectFunctionsEmulator(firebaseFunctions, "localhost", 5001);
}

export function loginHook() {
  const { setUser, signOut } = useAuthStore();

  router.push("/");

  onAuthStateChanged(firebaseAuth, async (user) => {
    if (user && user.email) {
      const userData = await getDocument("users", user.uid);

      if (!userData) {
        somethingsWrong("Invalid credentials");

        signOut();
      }

      setUser(userData);
    } else {
      setUser();
    }
  });
}
