import { useRef, useState } from "react";
import useAddTransaction from "../../hooks/useAddTransaction";
import styles from "./dashboard.module.css";
import useGetTransactions from "../../hooks/useGetTransactions";
import useGetInfo from "../../hooks/useGetInfo";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { validation } from "../../config/firebase-config";

export const Dashboard = () => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Bill");
  const { addTransaction } = useAddTransaction();
  const { userName, profileURL } = useGetInfo();
  const { transactions, totalAmount } = useGetTransactions();
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const { balance, bill, income } = totalAmount;

  const logoutHandler = async () => {
    signOut(validation);
    navigate("/");
    localStorage.removeItem("id");
  };
  const submitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addTransaction(description, amount, category);
    setDescription("");
    if (ref.current) ref.current.value = "";

    setCategory("Income");
  };
  const formatting = balance * -1;

  return (
    <>
      <section className={styles.sectiondash}>
        <div className={styles.container}>
          <div className={styles["total-bal"]}>
            <div className={styles.profile}>
              <button className={styles.signout} onClick={logoutHandler}>
                Signout
              </button>
              <div className={styles.profileinfo}>
                <p>Welcome {userName.split(" ")[0]}!</p>
                <img
                  src={profileURL}
                  alt={userName}
                  className={styles.avatar}
                />
              </div>
            </div>
            {balance < 0 ? (
              <h3
                style={{ color: "red" }}>{`Bal: -₦ ${formatting.toLocaleString(
                "en-UK"
              )} `}</h3>
            ) : (
              <h3>{`Bal: ₦ ${balance.toLocaleString("en-UK")} `}</h3>
            )}
          </div>
          <div className={styles.both}>
            <p>+{income.toLocaleString("en-UK")}</p>
            <p>-{bill.toLocaleString("en-UK")}</p>
          </div>

          <form action="submit" onSubmit={submitHandler}>
            <div className={styles["input-wrapper"]}>
              <label htmlFor="desc">Cash For?</label>
              <input
                type="text"
                name="desc"
                id="desc"
                placeholder="cash for"
                maxLength={40}
                required
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
              <label htmlFor="amount"> Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                ref={ref}
                placeholder=" ₦"
                onChange={(event) => {
                  setAmount(+event.target.value);
                }}
              />
            </div>
            <label htmlFor="category">Choose Category:</label>
            <select
              id="category"
              name="category"
              onChange={(event) => setCategory(event.target.value)}>
              <option value="Bill">Bill</option>
              <option value="Income">Income</option>
            </select>

            <button>Submit</button>

            <div className={styles["input-incomes"]}>
              <ul>
                <li>
                  {transactions
                    .map(
                      ({ description, transactionAmount, transactionType }) => {
                        return (
                          <div
                            className={styles.list}
                            key={crypto.randomUUID()}>
                            <h4
                              style={{
                                color:
                                  transactionType === "Bill"
                                    ? "rgb(241, 10, 10)"
                                    : "green",
                              }}>
                              {description}.
                            </h4>

                            <p
                              style={{
                                color:
                                  transactionType === "Bill"
                                    ? "rgb(241, 10, 10)"
                                    : "green",
                              }}>
                              ₦{transactionAmount.toLocaleString("en-UK")}
                            </p>
                          </div>
                        );
                      }
                    )
                    .reverse()}
                </li>
              </ul>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
