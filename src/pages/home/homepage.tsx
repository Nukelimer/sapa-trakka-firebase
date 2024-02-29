import { useState, useEffect } from "react";
import styles from "./homepage.module.css";
import { useNavigate } from "react-router-dom";
enum WittyPhrases {
  First = "Person wey poor, na dem fit relate.",
  Second = "Poor man no dey fear ATM queue.",
  Third = "Why poor man no dey play hide? Na visibility.",
  Fourth = "Wetin poor man dey take cook dinner? Wish soup.",
  Fifth = "Person wey poor, na ATM dey confuse.",
  Sixth = "Wetin poor man fit carry? Di cross.",
  Seventh = "Why poor man no dey like suspense? E suspense.",
  Eighth = "Person wey poor, no go dey check balance.",
  Ninth = "Wetin poor man fit drive? Im destiny.",
  Tenth = "Why poor man dey always optimistic? Him never tire."

}

type WittyPhraseKeys = keyof typeof WittyPhrases;

export function Homepage() {
  const navigate = useNavigate()
  const [currentPhrase, setCurrentPhrase] = useState<WittyPhraseKeys>("First");
  const id = crypto.randomUUID();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const phraseKeys: WittyPhraseKeys[] = Object.keys(
        WittyPhrases
      ) as WittyPhraseKeys[];
      const currentIndex = phraseKeys.indexOf(currentPhrase) + 1;
      const nextIndex = currentIndex < phraseKeys.length ? currentIndex : 0;
      setCurrentPhrase(phraseKeys[nextIndex]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentPhrase]);

  const navigateHandler = () => {
    navigate('./validation')
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          key={id}
          className={`${styles["slide-in-out"]} ${styles["active"]}`}>
          <h2>{WittyPhrases[currentPhrase]}</h2>
        </div>
        <div className={styles.bottom}>
          <img src="../interest-loan-calculator.svg" alt="tracker" />
          <button onClick={navigateHandler} >Login</button>
        </div>
      </div>
    </section>
  );
}