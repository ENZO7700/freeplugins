
'use client';

import { getFirebaseClient } from './firebase-client';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
  where,
  getDocs,
  limit,
  doc,
  setDoc,
} from 'firebase/firestore';
import type { Plugin, Review } from './plugins';
import { v4 as uuidv4 } from 'uuid';

const { db } = getFirebaseClient();

// --- Review Service ---

interface ReviewInput {
  author: string;
  authorId: string;
  rating: number;
  comment: string;
}

export const addReview = async (pluginSlug: string, review: ReviewInput) => {
  const reviewsColRef = collection(db, "plugins", pluginSlug, "reviews");
  await addDoc(reviewsColRef, {
    ...review,
    date: serverTimestamp(),
  });
};

export const listenForReviews = (
  pluginSlug: string,
  callback: (reviews: Review[]) => void,
  onError: (error: Error) => void
) => {
  const reviewsColRef = collection(db, "plugins", pluginSlug, "reviews");
  const q = query(reviewsColRef, orderBy("date", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const fetchedReviews: Review[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      fetchedReviews.push({
        author: data.author,
        rating: data.rating,
        comment: data.comment,
        date: data.date?.toDate()?.toISOString() || new Date().toISOString(),
      });
    });
    callback(fetchedReviews);
  }, (error) => {
    console.error("Error listening for reviews:", error);
    onError(error);
  });

  return unsubscribe;
};


// --- Order Service ---

interface OrderInput {
  userId: string;
  userEmail: string;
  items: Plugin[];
  total: number;
}

export const createOrder = async (order: OrderInput) => {
  const orderRef = await addDoc(collection(db, "orders"), {
    ...order,
    orderDate: serverTimestamp(),
    status: 'paid' // Simulate successful payment
  });
  return orderRef.id;
};

// --- License Key Service ---

export const getOrCreateLicenseKey = async (userId: string, pluginId: string): Promise<string | null> => {
  const licenseKeysRef = collection(db, 'licenseKeys');
  const q = query(
    licenseKeysRef,
    where('userId', '==', userId),
    where('pluginId', '==', pluginId),
    orderBy('createdAt', 'desc'),
    limit(1)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Key exists, return it
    const keyData = querySnapshot.docs[0].data();
    return keyData.keyString;
  } else {
    // Key does not exist, create a new one
    const newKey = `FP-${pluginId.toUpperCase()}-${uuidv4().toUpperCase()}`;
    const newKeyRef = doc(licenseKeysRef);
    
    await setDoc(newKeyRef, {
      userId,
      pluginId,
      keyString: newKey,
      createdAt: serverTimestamp(),
    });

    return newKey;
  }
};
