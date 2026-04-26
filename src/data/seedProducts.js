// src/data/seedProducts.js
import { db } from "../firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { products } from "./products";

export const seedProducts = async () => {
  const productCollection = collection(db, "products");

  for (const product of products) {
    // Use the product ID as the document ID to prevent duplicates
    const productRef = doc(db, "products", product.id.toString());
    const docSnap = await getDoc(productRef);

    if (!docSnap.exists()) {
      await setDoc(productRef, {
        ...product,
        stock: product.stock ?? 10,
      });
      console.log(`✅ Uploaded: ${product.name}`);
    } else {
      console.log(`ℹ️ Skipped (already exists): ${product.name}`);
    }
  }

  console.log("🎉 Seeding process complete!");
};
