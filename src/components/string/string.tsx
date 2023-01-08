import React, { useCallback, useEffect, useState } from "react";
import styles from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { useForceUpdate } from "../../utils/utils";
import { startDelay } from "../../utils/utils";

type TOutput = {
  symbol: string
  status: ElementStates
};

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [symbols, setSymbols] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<TOutput[]>([]);
  const [symbolsStatus, setSymbolsStatus] = useState<ElementStates[]>([]);
  const [finalArray, setFinalArray] = useState<TOutput[]>([]);

  const forceUpdate = useForceUpdate();

  const onInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    }
    , 
    []
  );

  const makeOutput = (symbols: string[], symbolsStatus: ElementStates[]): TOutput[] => {

    const result = symbols.map((el, index) => ({symbol: el, status: symbolsStatus[index]}));

    return result;
  };

  const makeSymbolsStatus = (array: string[]) => {
    if (array.length === 1) return [ElementStates.Modified];

    const result = array.map((_, index) => {
      if ((index === 0) || (index === array.length - 1)) {
        return ElementStates.Changing;
        
      } else return ElementStates.Default;
    });

    return result;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let head: number = 0;
    let array = output;
    let tail: number = array.length - 1;

    setIsLoading(true);
    setFinalArray(output);

    while (head < tail) {
      await startDelay(500);

      if (array[head].status === ElementStates.Changing) {
        let tmp: TOutput;

        array[head].status = ElementStates.Modified;
        array[head + 1].status = ElementStates.Changing;

        array[tail].status = ElementStates.Modified;

        if (tail - head - 1) {
          array[tail - 1].status = ElementStates.Changing;
        };

        if ((head - tail + 2) === 0) {
          array[tail - 1].status = ElementStates.Modified;
        };

        tmp = array[head];
        array[head] = array[tail];
        array[tail] = tmp;
      };

      forceUpdate();
      head++;
      tail--;
      setOutput(array);
      setFinalArray(array);
    };

    setIsLoading(false);
  };

  useEffect(() => {
    setSymbols(input.split(''));
  }, [input]);

  useEffect(() => {
    setSymbolsStatus(makeSymbolsStatus(symbols));
  }, [symbols]);

  useEffect(() => {
    setOutput(makeOutput(symbols, symbolsStatus));
  }, [symbolsStatus, symbols]);

  return (
    <SolutionLayout title="Строка">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            isLimitText={true}
            maxLength={11}
            value={input}
            onChange={onInput}
            data-cy="input"
          />
          <Button
            extraClass="ml-6"
            text="Развернуть"
            type="submit"
            disabled={!input}
            isLoader={isLoading}
            data-cy="button"
            
            />
        </form>

        <div className={styles.symbolsRow}>
          {finalArray.map(({ symbol, status }, index) => 
              (
                <div
                  data-cy={`circle${index}`}
                  data-testid={status}
                  data-test={symbol}
                  key={index}
                >
                <Circle
                  letter={symbol}
                  state={status}
                />
                </div>
              )
            )
          }
        </div>
      </section>
    </SolutionLayout>
  );
};
