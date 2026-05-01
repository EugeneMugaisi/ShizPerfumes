// src/hooks/useWishlist.ts
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useCustomerAuth } from "../context/CustomerAuthContext";

const LOCAL_STORAGE_KEY = "shiz_wishlist";

export const useWishlist = () => {
  const { currentUser } = useCustomerAuth();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist on mount and when user changes
  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);

      if (currentUser) {
        // Logged in — load from Firestore
        try {
          const wishlistRef = doc(db, "wishlists", currentUser.uid);
          const wishlistDoc = await getDoc(wishlistRef);

          // Get local wishlist items to merge
          const localItems = getLocalWishlist();

          if (wishlistDoc.exists()) {
            const firestoreItems = wishlistDoc.data().items || [];

            // Merge local and Firestore wishlists removing duplicates
            const merged = mergeWishlists(firestoreItems, localItems);
            setWishlistItems(merged);

            // Save merged list back to Firestore
            if (localItems.length > 0) {
              await saveToFirestore(currentUser.uid, merged);
              clearLocalWishlist();
            }
          } else {
            // No Firestore wishlist yet — use local items
            setWishlistItems(localItems);
            if (localItems.length > 0) {
              await saveToFirestore(currentUser.uid, localItems);
              clearLocalWishlist();
            }
          }
        } catch (error) {
          console.error("Error loading wishlist:", error);
          setWishlistItems(getLocalWishlist());
        }
      } else {
        // Guest — load from localStorage
        setWishlistItems(getLocalWishlist());
      }

      setLoading(false);
    };

    loadWishlist();
  }, [currentUser]);

  // Helper — get local wishlist
  const getLocalWishlist = (): any[] => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Helper — clear local wishlist
  const clearLocalWishlist = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // Helper — save to Firestore
  const saveToFirestore = async (uid: string, items: any[]) => {
    const wishlistRef = doc(db, "wishlists", uid);
    await setDoc(wishlistRef, { items, updatedAt: new Date() });
  };

  // Helper — merge two wishlists removing duplicates by product id
  const mergeWishlists = (list1: any[], list2: any[]): any[] => {
    const combined = [...list1];
    list2.forEach((item) => {
      const exists = combined.some((i) => i.id === item.id);
      if (!exists) combined.push(item);
    });
    return combined;
  };

  // Save wishlist whenever it changes
  const saveWishlist = async (items: any[]) => {
    if (currentUser) {
      try {
        await saveToFirestore(currentUser.uid, items);
      } catch (error) {
        console.error("Error saving wishlist:", error);
      }
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    }
  };

  // Toggle item in wishlist
  const toggleWishlist = async (product: any) => {
    const exists = wishlistItems.some((item) => item.id === product.id);
    const newItems = exists
      ? wishlistItems.filter((item) => item.id !== product.id)
      : [...wishlistItems, product];

    setWishlistItems(newItems);
    await saveWishlist(newItems);
  };

  // Check if item is in wishlist
  const isInWishlist = (productId: any): boolean => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return { wishlistItems, toggleWishlist, isInWishlist, loading };
};