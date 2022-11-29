import React, { useState } from "react";
import styles from './stack-page.module.css';
import { ElementStates } from "../../types/element-states";
import { startDelay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./utils";

type TStack = {
  item: string,
  state: ElementStates
};

export const StackPage: React.FC = () => {
  const initialStack = new Stack<TStack>();
  const [stack, setStack] = useState<Stack<TStack>>(initialStack);
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<TStack[]>([]);
  const [pushStatus, setPushStatus] = useState<boolean>(false);
  const [popStatus, setPopStatus] = useState<boolean>(false);
  const [removeStatus, setRemoveStatus] = useState<boolean>(false);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const pushElement = async () => {
    setInput('');
    setPushStatus(true);

    stack.push({item: input, state: ElementStates.Changing});
    setResult([...stack.getElements()]);
    await startDelay(500);
    
    stack.pop();
    stack.push({item: input, state: ElementStates.Default});
    setResult([...stack.getElements()]);

    setPushStatus(false);
  };

  const popElement = async () => {
    setPopStatus(true);

    stack.peak().state = ElementStates.Changing;
    await startDelay(500);

    stack.pop();
    setResult([...stack.getElements()]);
    
    setPopStatus(false);
  };
  
  const clear = async () => {
    setRemoveStatus(true);

    stack.clear();
    await startDelay(500);
    setResult([...stack.getElements()]);

    setRemoveStatus(false);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.controlRow}>
          <Input
            type="text"
            maxLength={4}
            isLimitText={true}
            value={input}
            onChange={onInput}
          />
          <Button 
            text='Добавить'
            onClick={pushElement}
            disabled={removeStatus || popStatus || !input}
            isLoader={pushStatus}
            extraClass={styles.pushWidth}
          />
          <Button 
            text="Удалить"
            onClick={popElement}
            disabled={popStatus || pushStatus || !stack.getSize()}
            isLoader={popStatus}
          />
        </div>
        <Button 
          text='Очистить'
          onClick={clear}
          disabled={popStatus || pushStatus || !stack.getSize()}
          isLoader={removeStatus}
        />
      </form>

      <div className={styles.circlesRow}>
        {result.map(({item, state}, index) => (
          <Circle 
            letter={item}
            state={state}
            index={index}
            key={index}
            head={index === (stack.getSize() - 1) ? 'top' : ''}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
