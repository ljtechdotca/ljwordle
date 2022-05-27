import { useState } from "react";
import styles from "./GameGrid.module.scss";
import Keyboard from "./Keyboard";

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

const GameGrid = () => {
  const [attempts, setAttempts] = useState<string[]>([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);
  const [answer, setAnswer] = useState("HELLO");
  const [counter, setCounter] = useState(0);
  const [input, setInput] = useState("HELLO");
  const [absent, setAbsent] = useState("");
  const [correct, setCorrect] = useState("");
  const [present, setPresent] = useState("");

  const onKeyClick = (key: string) => {
    if (key === "ENTER") {
      let newAttempts = [...attempts];
      newAttempts[counter] = input;
      setAttempts(newAttempts);
      setInput("");
      setCounter(counter + 1);
    } else if (key === "⌫") {
      setInput(input.slice(0, input.length - 1));
    } else if (input.length < 5) {
      setInput(input + key);
    }
  };

  return (
    <div className={styles.root}>
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
