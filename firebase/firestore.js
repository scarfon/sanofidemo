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

const RECEIPT_COLLECTION =
	process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_RECEIPT_COLLECTION;

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

export async function getReceipts(uid, filter) {
	let receipts;
	if (filter === "DATA_DESC" || filter === "VALOR_DESC" || filter === null) {
		receipts = query(
			collection(db, RECEIPT_COLLECTION),
			where("uid", "==", uid),
			orderBy("transactionDate", "desc"),
			orderBy("total", "desc")
		);
	} else if (filter === "DATA_ASC") {
		receipts = query(
			collection(db, RECEIPT_COLLECTION),
			where("uid", "==", uid),
			orderBy("transactionDate", "asc"),
			orderBy("total", "desc")
		);
	} else if (filter === "VALOR_ASC") {
		receipts = query(
			collection(db, RECEIPT_COLLECTION),
			where("uid", "==", uid),
			orderBy("transactionDate", "desc"),
			orderBy("total", "asc")
		);
	}

	const snapshot = await getDocs(receipts);

	let allReceipts = [];
	for (const documentSnapshot of snapshot.docs) {
		const receipt = documentSnapshot.data();
		allReceipts.push({
			...receipt,
			transactionDate: new Date(receipt["transactionDate"]),
			id: documentSnapshot.id,
			imageUrl: await getDownloadURL(receipt["imageBucket"]),
		});
	}
	return allReceipts;
}

// Updates receipt with @docId with given information.
export function updateReceipt(
	docId,
	uid,
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
