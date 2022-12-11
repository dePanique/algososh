import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { startDelay, useForceUpdate } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css';
import { Queue } from "./utils";


export const QueuePage: React.FC = () => {
  const forceUpdate = useForceUpdate();
  const [input, setInput] = useState<number | null>(null);
  const [queue, setQueue] = useState(new Queue<number, ElementStates>(7, ElementStates.Default));
  const [enqueueStatus, setEnqueueStatus] = useState(false);
  const [dequeueStatus, setDequeueStatus] = useState(false);
  const [isDequeueBlocked, setIsDequeueBlocked] = useState(false);
  
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = +e.target.value;
    if (!isNaN(inputValue)) setInput(inputValue);
  };

  const addElement = async () => {
    if (queue.getLength() === 7) return 0;
    setEnqueueStatus(true);
    
    queue.changeTailState(ElementStates.Changing);
    await startDelay(500);
    
    setInput(null);
    queue.enqueue(input, ElementStates.Default);
    setIsDequeueBlocked(queue.isDequeueBlocked());
    forceUpdate();
    
    setEnqueueStatus(false);
  };
  
  const deleteElement = async () => {
    setDequeueStatus(true);
    
    queue.changeHeadState(ElementStates.Changing);
    await startDelay(500);
    
    queue.dequeue(ElementStates.Default);
    setIsDequeueBlocked(queue.isDequeueBlocked());
    forceUpdate();
    
    setDequeueStatus(false);
  };
  
  const restartQueue = () => {
    setQueue(new Queue<number, ElementStates>(7, ElementStates.Default));
    setIsDequeueBlocked(true);
  };
  
  useEffect(() => {
    setIsDequeueBlocked(queue.isDequeueBlocked());
  }, []);

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.controlRow}>
          <Input
            type="text"
            maxLength={4}
            isLimitText={true}
            value={input?.toString() || ''}
            onChange={onInput}
          />
          <Button 
            text='Добавить'
            onClick={addElement}
            disabled={!input || dequeueStatus}
            isLoader={enqueueStatus}
          />
          <Button 
            text="Удалить"
            onClick={deleteElement}
            disabled={isDequeueBlocked || enqueueStatus}
            isLoader={dequeueStatus}
          />
        </div>
        <Button
          text='Очистить'
          onClick={restartQueue}
          disabled={queue.isRestartBlocked || enqueueStatus || dequeueStatus}
        />
      </form>

      <div className={styles.circlesRow}>
        {queue.getContainer().map(({item, state}, index) => (
          <Circle
            letter={item?.toString()}
            state={state}
            index={index}
            key={index}
            head={index === (queue.getHead()) ? 'head' : ''}
            tail={index === (queue.getTail()) ? 'tail' : ''}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
