import { FC } from "react";
import styles from "./Keyboard.module.scss";

const keyboard = [
  "Q W E R T Y U I O P",
  "A S D F G H J K L",
  "ENTER Z X C V B N M ⌫",
];

const keyStyle = (key: string, [absent, correct, present]: string[]) => {
  const isAbsent = absent.includes(key);
  const isCorrect = correct.includes(key);
  const isPresent = present.includes(key);
  if (isAbsent) {
    return styles.key__absent;
  } else if (isCorrect) {
    return styles.key__correct;
  } else if (isPresent) {
    return styles.key__present;
  } else {
    return styles.key;
  }
};

interface KeyboardProps {
  active: string[];
  input: string;
  onKeyClick: (key: string) => any;
}

const Keyboard: FC<KeyboardProps> = ({
  active: [absent, correct, present],
  input,
  onKeyClick,
}) => {
  return (
    <div className={styles.root}>
      {keyboard.map((row) => {
        return (
          <div className={styles.base} key={row}>
            {row.split(" ").map((key) => {
              return (
                <button
                  className={keyStyle(key, [absent, correct, present])}
                  key={key}
                  onClick={() => onKeyClick(key)}
                >
                  {key}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
