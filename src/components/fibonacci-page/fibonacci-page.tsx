import React, { useEffect, useState } from "react";
import { startDelay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css';


export const FibonacciPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<number[]>([]);
  const [input, setInput] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = +e.target.value;

    setInput(number);
  };

  const findFib = (number: number) => {
    if (number < 1) {
      return 0;
    };

    let a = 0;
    let b = 1;

    for (let i = 1; i < number; ++i) {
      const c = a + b;
      a = b;
      b = c;
    };

    return b;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setOutput([]);

    const fibonacciNumbers: number[] = Array.from({ length: input + 1 }, (_, k) => findFib(k));

    for (let i in fibonacciNumbers) {
      await startDelay(500);

      setOutput((prev) => [...prev, fibonacciNumbers[i]]);
    };

    setIsLoading(false);
  }

  useEffect(() => {
    if (input >= 1 && input <= 19) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [input]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            isLimitText={true}
            maxLength={19}
            onChange={onInput}

          />
          <Button
            extraClass="ml-6"
            text="Рассчитать"
            type="submit"
            isLoader={isLoading}
            disabled={isDisabled}
          />

        </form>
        <div className={styles.row}>
          {output.map((item, index) => {
            return (
              <Circle
                letter={item.toString()}
                index={index}
                key={index}
              />
            )
          })}
        </div>
      </section>
    </SolutionLayout>
  );
};
