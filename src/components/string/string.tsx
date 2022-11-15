import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [symbols, setSymbols] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;

  const onInput = (
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    }
  )

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTimeout(() => {
      console.log(2);
    }, 2000);
  }
  
  useEffect(() => {
    setSymbols(input.split(''));
  }, [input])
  

  return (
    <SolutionLayout title="Строка">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            isLimitText={true}
            maxLength={11}
            value={input}
            onChange={onInput}
          />
          <Button
            extraClass="ml-6"
            text="Развернуть"
            type="submit"
            disabled={!input}
            isLoader={isLoading}
          />
        </form>

        <div className={styles.symbolsRow}>
          {symbols &&
            symbols.map(
              (el, index) => (
                <Circle
                  letter={el}
                  key={index}
                  state={ElementStates.Changing}
                />
              )
            )
          }
        </div>
      </section>
    </SolutionLayout>
  );
};
