

import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  Unsubscribe,
  
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import useGetInfo from "./useGetInfo";

interface Transaction {
  description: string;
  transactionType: string;
  transactionAmount: number;

}



interface ExtendedTransaction extends Transaction {
  id: string;
}

const useGetTransactions = () => {
  const [transactions, setTransactions] = useState<ExtendedTransaction[]>([]);
  const [totalAmount, setTotalAmount] = useState({
    bill: 0.0,
    income: 0.0,
    balance: 0.0,
  });
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetInfo();

  const getTransactions = () => {
    let unsubscribe: Unsubscribe | undefined;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        
        let totalIncome: number = 0;
        let totalExpenses: number = 0;
        let docs: ExtendedTransaction[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as Transaction;
          const id = doc.id;



          docs.push({ ...data, id });

          if (data.transactionType === "Income") {
            totalIncome += +data.transactionAmount;
          } else {
            totalExpenses += +data.transactionAmount;
          }
        });

        setTransactions(docs);
        let balance = totalIncome - totalExpenses;
        setTotalAmount((prevState) => ({
          ...prevState,
          balance,
          income: totalIncome,
          bill: totalExpenses,
        }));
        
      });
    } catch (error) {
      console.error(error);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  };

  useEffect(() => {
    const cleanup = getTransactions();
    return cleanup;
  }, []);

  return { transactions, totalAmount};
};

export default useGetTransactions;
