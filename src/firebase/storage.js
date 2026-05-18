// frontend/src/firebase/storage.js
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

// ─── Upload single image ──────────────────────────────────────────────────────
export const uploadImage = async (file, folder = 'uploads', onProgress = null) => {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (onProgress) {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(Math.round(progress));
        }
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ url, path: fileName });
      }
    );
  });
};

// ─── Upload multiple images ───────────────────────────────────────────────────
export const uploadImages = async (files, folder = 'uploads') => {
  const results = await Promise.all(
    Array.from(files).map(file => uploadImage(file, folder))
  );
  return results;
};

// ─── Delete image by storage path ────────────────────────────────────────────
export const deleteImage = async (pathOrUrl) => {
  try {
    let storagePath = pathOrUrl;
    // If it's a full URL, extract the path
    if (pathOrUrl.startsWith('https://')) {
      const urlObj = new URL(pathOrUrl);
      const encoded = urlObj.pathname.split('/o/')[1];
      if (encoded) {
        storagePath = decodeURIComponent(encoded.split('?')[0]);
      }
    }
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
    return true;
  } catch (err) {
    // Error handled silently
    return false;
  }
};
