import React, { useState, useEffect } from "react";
import styles from './sorting-page.module.css';
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { startDelay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { getArray, swap } from "./utils";

export type TArray = {
  item: number
  state: ElementStates
};

export const SortingPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState<string>('selection');
  const [newArray, setNewArray] = useState<TArray[]>([]);
  const [isLock, setIsLock] = useState<boolean>(false);

  const makeNewArray = () => {
    setNewArray(getArray());
  };

  const sortItOut = (type: boolean) => {
    if (isChecked === 'selection') {
      selectionSort(type);
    } else bubbleSort(type);
  };

  const render = async () => {
    setNewArray([...newArray]);
    await startDelay(300);
  };

  const selectionSort = async (type: boolean) => {
    const { length } = newArray;
    setIsLock(true);

    for (let i = 0; i < length; i++) {
      let maxInd = i;

      newArray[maxInd].state = ElementStates.Changing;
      setNewArray([...newArray]);

      for (let j = i + 1; j < length; j++) {
        newArray[j].state = ElementStates.Changing;
        await render();

        if (type) {
          if (newArray[maxInd].item > newArray[j].item)
            maxInd = j;
        } else {
          if (newArray[maxInd].item < newArray[j].item)
            maxInd = j;
        }
        newArray[j].state = ElementStates.Default;
        await render();
      }

      swap(newArray, i, maxInd);
      newArray[maxInd].state = ElementStates.Default;
      newArray[i].state = ElementStates.Modified;

      await render();
    }
    setIsLock(false);
  };

  const bubbleSort = async (type: boolean) => {
    const { length } = newArray;
    setIsLock(true);

    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        newArray[j].state = ElementStates.Changing;
        newArray[j + 1].state = ElementStates.Changing;
        await render();

        if (type) {
          if (newArray[j].item > newArray[j + 1].item) {
            swap(newArray, j, j + 1);
            await render();
          }
        } else {
          if (newArray[j].item < newArray[j + 1].item) {
            swap(newArray, j, j + 1);
            await render();
          }
        }

        newArray[j].state = ElementStates.Default;
        newArray[j + 1].state = ElementStates.Default;
      }

      newArray[length - i - 1].state = ElementStates.Modified;
      await render();
    }

    newArray[0].state = ElementStates.Modified;
    await render();

    setIsLock(false);
  };
  
  useEffect(() => {
    setNewArray(getArray());
    return () => {
      setNewArray([]);
    }
  }, []);
  
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.handleRow}>
        <div className={styles.radioRow}>
          <RadioInput
            label='Выбор'
            value='selection'
            name='sorting'
            checked={isChecked === 'selection'}
            onChange={() => setIsChecked('selection')}
            disabled={isLock}
          />
          <RadioInput
            label='Пузырёк'
            value='bubble'
            name='sorting'
            checked={isChecked === 'bubble'}
            onChange={() => setIsChecked('bubble')}
            disabled={isLock}
          />
        </div>

        <div className={styles.buttonsRow}>
          <Button
            sorting={Direction.Ascending}
            text='По возрастанию'
            onClick={() => sortItOut(true)}
            disabled={isLock}
            isLoader={isLock}
          />
          <Button
            sorting={Direction.Ascending}
            text='По убыванию'
            onClick={() => sortItOut(false)}
            disabled={isLock}
            isLoader={isLock}
          />
        </div>

        <Button
          text='Новый массив'
          onClick={makeNewArray}
          disabled={isLock}
        />
      </div>

      <div className={styles.columnsRow}>
        {
          newArray.map((item, index) => (
            <Column
              index={item.item}
              key={index}
              state={item.state}
            />
          ))
        }
      </div>
    </SolutionLayout>
  );
};
