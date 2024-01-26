import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import useGetInfo from "./useGetInfo";



const useAddTransaction = () => {
  const addTransaction = async (
    description: string,
    transactionAmount: number,
    transactionType: string
  ) => {
    const { userID } = useGetInfo();
    const transactionCollectionRef = collection(db, "transactions");
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};

export default useAddTransaction;
