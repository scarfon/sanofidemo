import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { db } from "./firebase";
import { getDownloadURL } from "./storage";

const RECEIPT_COLLECTION = process.env(
	NEXT_PUBLIC_FIREBASE_FIRESTORE_RECEIPT_COLLECTION
);

/*
  - nota: array de objetos
    - id: string
    - img: string
    - img_processada: string
    - tipo: string API
    - data: string OCR
    - finalidade: string?
    - cidade: string API
    - moeda: string OCR/regex
    - tipo_pagamento: string /OCR
    - valor: number / OCR
    - pessoal: boolean 
    - fornecedor: string / CNPJ
*/

// TODO - Add receipt to database
// export function addReceipt(
// 	uid,
// 	date,
// 	locationName,
// 	address,
// 	items,
// 	amount,
// 	imageBucket
// ) {
// 	addDoc(collection(db, RECEIPT_COLLECTION), {
// 		uid,
// 		date,
// 		locationName,
// 		address,
// 		items,
// 		amount,
// 		imageBucket,
// 	});
// }

export async function getReceipts(uid, isConfirmed) {
	const receipts = query(
		collection(db, RECEIPT_COLLECTION),
		where("uid", "==", uid),
		where("isConfirmed", "==", isConfirmed)
	);
	const snapshot = await getDocs(receipts);

	let allReceipts = [];
	for (const documentSnapshot of snapshot.docs) {
		const receipt = documentSnapshot.data();
		await allReceipts.push({
			...receipt,
			date: receipt["date"].toDate(),
			id: documentSnapshot.id,
			uid: receipt["uid"],
			imageUrl: await getDownloadURL(receipt["imageBucket"]),
			imageBucket: receipt["imageBucket"],
			uuid: receipt["uuid"],
			imgUrl: receipt["imgUrl"],
			merchantName: receipt["merchantName"],
			merchantNameConfidence: receipt["merchantNameConfidence"],
			transactionDate: receipt["transactionDate"],
			transactionDateConfidence: receipt["transactionDateConfidence"],
			subtotal: receipt["subtotal"],
			subtotalConfidence: receipt["subtotalConfidence"],
			tax: receipt["tax"],
			taxConfidence: receipt["taxConfidence"],
			tip: receipt["tip"],
			tipConfidence: receipt["tipConfidence"],
			total: receipt["total"],
			totalConfidence: receipt["totalConfidence"],
		});
	}
	return allReceipts;
}

// Updates receipt with @docId with given information.
export function updateReceipt(
	docId,
	uid,
	date,
	imageBucket,
	isConfirmed,
	merchantName,
	transactionDate,
	subtotal,
	tax,
	tip,
	total
) {
	setDoc(doc(db, RECEIPT_COLLECTION, docId), {
		uid,
		date,
		imageBucket,
		isConfirmed,
		merchantName,
		transactionDate,
		subtotal,
		tax,
		tip,
		total,
	});
}

// Deletes receipt with given @id.
export function deleteReceipt(id) {
	deleteDoc(doc(db, RECEIPT_COLLECTION, id));
}
