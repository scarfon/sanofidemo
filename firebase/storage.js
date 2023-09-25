import { format } from "date-fns";
import {
	deleteObject,
	getDownloadURL as getStorageDownloadURL,
	ref,
	uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase";

const BUCKET_URL = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_URL;

// Uploads image and returns the storage bucket
export async function uploadImage(image, uid) {
	const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
	const bucket = `${BUCKET_URL}/${uid}/${formattedDate}.jpg`;
	await uploadBytes(ref(storage, bucket), image);
	return bucket;
}

export async function deleteImage(bucket) {
	await deleteObject(ref(storage, bucket));
}

export async function getDownloadURL(bucket) {
	return await getStorageDownloadURL(ref(storage, bucket));
}
