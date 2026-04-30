import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Product, products as staticProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reference to the 'products' collection
    const productsCollection = collection(db, 'products');
    
    // Safety timeout: if loading takes more than 5 seconds, stop loading
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        console.warn("Product loading timed out, falling back to empty/static data");
        setLoading(false);
      }
    }, 5000);

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      productsCollection,
      (snapshot) => {
        clearTimeout(safetyTimeout);
        const productData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          // Use Firestore doc ID if needed, or keep the numeric id from data
          firebaseId: doc.id,
        })) as (Product & { firebaseId: string })[];
        
        setProducts(productData);
        setLoading(false);
      },
      (err) => {
        clearTimeout(safetyTimeout);
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => {
      unsubscribe();
      clearTimeout(safetyTimeout);
    };
  }, []);

  // Utility to seed Firestore with initial data from products.ts
  const seedDatabase = async () => {
    try {
      setLoading(true);
      const productsCollection = collection(db, 'products');
      
      // Check if already seeded to avoid duplicates
      const snapshot = await getDocs(productsCollection);
      if (!snapshot.empty) {
        console.log("Database already seeded");
        setLoading(false);
        return;
      }

      console.log("Seeding database...");
      for (const product of staticProducts) {
        await addDoc(productsCollection, product);
      }
      console.log("Seeding complete!");
    } catch (err: any) {
      console.error("Error seeding database:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, seedDatabase };
};
