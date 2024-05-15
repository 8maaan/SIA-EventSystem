import { useState, useEffect, useCallback } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from "../Firebase/firebaseConfig";

export const useUserRoles = (userEmail) => {
  const [isOrganizer, setIsOrganizer] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const fetchUserRoles = useCallback(async () => {
    try {
      const organizerSnapshot = await getDocs(
        query(
          collection(db, "organizers"),
          where("email", "==", userEmail)
        )
      );
      setIsOrganizer(!organizerSnapshot.empty);

      const adminSnapshot = await getDocs(
        query(
          collection(db, "admin"),
          where("email", "==", userEmail)
        )
      );
      setIsAdmin(!adminSnapshot.empty);
    } catch (error) {
      console.error(error);
    }
  }, [userEmail]);

  useEffect(() => {
    if (userEmail) {
      fetchUserRoles();
    }
  }, [userEmail, fetchUserRoles]);

  return { isOrganizer, isAdmin };
};