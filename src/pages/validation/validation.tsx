import styles from "./validation.module.css";
import { provider, validation } from "../../config/firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import useGetInfo from "../../hooks/useGetInfo.js";
export const Validate = () => {
  const navigate = useNavigate();

  const { isLogged } = useGetInfo();
  const signInHandler = async () => {
    const results = await signInWithPopup(validation, provider);
    const ID = {
      userID: results.user.uid,
      profileURL: results.user.photoURL,
      userName: results.user.displayName,
      isLogged: true,
    };
    localStorage.setItem("id", JSON.stringify(ID));
    navigate("/expense");
  };
  if (isLogged) {
    return <Navigate to={"/expense"} />;
  }

  return (

    <section className={styles.section}>
    <div className={styles.container}>
      <div className={styles.bottom}>
        <img className={styles.img} src="../10002732.png"
            alt="login" />
          <h2 >Let get you in.</h2>
        <button className={styles.button} onClick={signInHandler} >    Login with Google.</button>
      </div>
    </div>
  </section>




    // <section className={styles["section-valid"]}>
    //   <div className={styles.container}>
    //     <div className={styles.wrapper}>
    //       <img
    //         src="../10002732.png"
    //         alt="login"
    //         className={styles.image}
    //       />
    //       
    //       <button className={styles.button} onClick={signInHandler}>
    //         Login with Google.
    //       </button>
    //     </div>
    //   </div>
    // </section>
  );
};

