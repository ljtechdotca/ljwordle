import { FC, useEffect, useState } from "react";
import styles from "./GameGrid.module.scss";
import Keyboard from "./Keyboard";

interface GameGrid {
  word: string;
  words: string;
}

const GameGrid: FC<GameGrid> = ({ word, words }) => {
  /**
   * Initializes the game with a new word on component mount.
   */
  useEffect(function initWord() {
    console.log(word);
    setAnswer(word);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkLetters = (answer: string, input: string) => {
    const splitInput = input.split("");
    const absentFilter =
      absent + splitInput.filter((letter) => !answer.includes(letter)).join("");
    const correctFilter =
      present +
      splitInput
        .filter(
          (letter, index) =>
            answer.includes(letter) && answer[index] === input[index]
        )
        .join("");
    const presentFilter =
      present + splitInput.filter((letter) => answer.includes(letter)).join("");
    console.log({ absentFilter, correctFilter, presentFilter });

    setAbsent(absentFilter);
    setCorrect(correctFilter);
    setPresent(presentFilter);
  };

  const [attempts, setAttempts] = useState<string[]>([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);
  const [answer, setAnswer] = useState("");
  const [counter, setCounter] = useState(0);
  const [input, setInput] = useState("HELLO");
  const [absent, setAbsent] = useState("");
  const [correct, setCorrect] = useState("");
  const [present, setPresent] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const checkKeyStyle = (
    answer: string,
    column: number,
    counter: number,
    input: string,
    key: string,
    row: number
  ) => {
    if (key === answer[column]) {
      return styles.cell__correct;
    } else if (answer.includes(key)) {
      return styles.cell__present;
    } else if (!answer.includes(key) && row < counter) {
      return styles.cell__absent;
    } else {
      return styles.cell;
    }
  };

  const keyboard = {
    enter: () => {
      if (attempts[counter] === "     " && input.length < 5) {
        setMessage("Not enough letters.");
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } else if (words.includes(input)) {
        let newAttempts = [...attempts];
        newAttempts[counter] = input;
        setAttempts(newAttempts);
        setInput("");
        setCounter(counter + 1);

        checkLetters(answer, input);
      } else if (!message) {
        setMessage("Not in word list.");
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      }
    },
    backspace: () => {
      setInput(input.slice(0, input.length - 1));
    },
    key: (key: string) => {
      setInput(input + key);
    },
  };

  const onKeyClick = (key: string) => {
    if (key === "ENTER") {
      keyboard.enter();
    } else if (key === "⌫") {
      keyboard.backspace();
    } else if (input.length < 5) {
      keyboard.key(key);
    }
  };

  return (
    <div className={styles.root}>
      {message && (
        <div className={styles.modal__base}>
          <div className={styles.modal}>{message}</div>
        </div>
      )}
      <div className={styles.base}>
        {attempts.map((attempt, row) => {
          return (
            <div className={styles.row} key={`attempt-${row}`}>
              {attempt.split("").map((key, column) => {
                return (
                  <div
                    className={checkKeyStyle(
                      answer,
                      column,
                      counter,
                      input,
                      key,
                      row
                    )}
                    key={`attempt-${row}-key-${column}`}
                  >
                    {row === counter ? input[column] : key}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <Keyboard
        active={[absent, correct, present]}
        input={input}
        onKeyClick={onKeyClick}
      />
    </div>
  );
};

export default GameGrid;
