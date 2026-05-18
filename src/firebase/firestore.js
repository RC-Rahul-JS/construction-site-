// frontend/src/firebase/firestore.js
import {
  ref, get, push, set, child
} from 'firebase/database';
import { db } from './config';

// ─── Get all documents ────────────────────────────────────────────────────────
export const getDocuments = async (collectionName, options = {}) => {
  const { filters = [], sortBy = null, sortOrder = 'asc', limitTo = null } = options;
  const snapshot = await get(ref(db, collectionName));
  if (!snapshot.exists()) return [];

  const data = snapshot.val();
  let results = Object.keys(data).map(key => ({
    id: key,
    ...data[key]
  }));

  filters.forEach(({ field, op, value }) => {
    results = results.filter(item => {
      if (op === '==') return item[field] === value;
      if (op === '>') return item[field] > value;
      if (op === '<') return item[field] < value;
      if (op === '>=') return item[field] >= value;
      if (op === '<=') return item[field] <= value;
      if (op === '!=') return item[field] !== value;
      return true;
    });
  });

  if (sortBy) {
    results.sort((a, b) => {
      let aVal = a[sortBy] !== undefined ? a[sortBy] : '';
      let bVal = b[sortBy] !== undefined ? b[sortBy] : '';
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  if (limitTo) results = results.slice(0, limitTo);

  return results;
};

// ─── Get single document by ID ────────────────────────────────────────────────
export const getDocumentById = async (collectionName, id) => {
  const snapshot = await get(child(ref(db), `${collectionName}/${id}`));
  if (!snapshot.exists()) return null;
  return { id: snapshot.key, ...snapshot.val() };
};

// ─── Get document by field ────────────────────────────────────────────────────
export const getDocumentByField = async (collectionName, field, value) => {
  const snapshot = await get(ref(db, collectionName));
  if (!snapshot.exists()) return null;
  
  const data = snapshot.val();
  const matchKey = Object.keys(data).find(key => data[key][field] === value);
  
  if (!matchKey) return null;
  return { id: matchKey, ...data[matchKey] };
};

// ─── Add document ─────────────────────────────────────────────────────────────
export const addDocument = async (collectionName, data) => {
  const newRef = push(ref(db, collectionName));
  await set(newRef, {
    ...data,
    createdAt: Date.now(),
  });
  return newRef.key;
};
