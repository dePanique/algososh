import React, { useEffect, useState } from "react";
import styles from './list-page.module.css';
import { ElementStates } from "../../types/element-states";
import { startDelay, useForceUpdate } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { hardDisabled, initialObj } from "./constants";
import { IObject, TActivness, IHashTable } from "./types";
import { LinkedList } from "./utils";

export const ListPage: React.FC<{children?: React.ReactNode}> = () => {
  const [array, setArray] = useState<IObject[]>([initialObj]);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [indexInput, setIndexInput] = useState<number | null>(null);
  const [isTailActive, setIsTailActive] = useState<TActivness>({ status: false, value: 0 });
  const [isHeadActive, setIsHeadActive] = useState<TActivness>({ status: false, value: 0 });
  const [isDeleteActive, setIsDeleteActive] = useState<TActivness>({ status: false, value: 0, index: -1 });
  const [headStatusRow, setHeadStatusRow] = useState<number[]>([0]);
  const [tailStatusRow, setTailStatusRow] = useState<number[]>([]);
  const [loadersStatus, setLoadersStatus] = useState<{ [name: string]: boolean }>({
    addInHead: false,
    addInTail: false,
    deleteHead: false,
    deleteTail: false,
    addByIndex: false,
    deleteByIndex: false,
  });
  const [disableStatus, setDisableStatus] = useState<{ [name: string]: boolean }>({
    addInHead: true,
    addInTail: true,
    deleteHead: true,
    deleteTail: true,
    addByIndex: true,
    deleteByIndex: true,
  });

  
  const [hashTable, setHashTable]  = useState<IHashTable<number>>()

  const forceUpdate = useForceUpdate();

  const onValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = +e.target.value;
    if (!isNaN(inputValue)) setInputValue(inputValue);
  };

  const onIndexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const indexInput = +e.target.value;
    if (!isNaN(indexInput)) setIndexInput(indexInput);
  };

  const ref = React.useRef<LinkedList<number> | null>(null);

  const concatList = (): LinkedList<number> => {
    if (ref.current === null) {
      ref.current = new LinkedList<number>();
    }

    return ref.current;
  }

  const list = concatList();

  const updateList = () => {
    setHashTable(list.getTable())
    setArray(list.getArray())
  }

  const addToHead = async () => {
    if (typeof inputValue === 'number') {
      setLoadersStatus(prev => ({ ...prev, addInHead: true }));
      setDisableStatus(loadersStatus);

      list.addInHeadRow(
        0,
        <div 
          data-cy={`smallCircle`}
          data-test={`${inputValue.toString()} changing`}
        >
          <Circle 
            letter={inputValue.toString()}
            state={ElementStates.Changing}
            isSmall={true}
          />
        </div> 
      )

      list.prepend(inputValue, ElementStates.Modified)
      list.createTable()
      await startDelay(1000)
      
      updateList()
      await startDelay(1000)

      list.changeElementColor(ElementStates.Default, 0)
      updateList()
      
      setInputValue(null)
      
      setLoadersStatus(prev => ({ ...prev, addInHead: false }))
      setDisableStatus(hardDisabled);
    }
  }

  const addToTail = async () => {
    if (typeof inputValue === 'number') {
      setLoadersStatus(prev => ({ ...prev, addInTail: true }));
      setDisableStatus(loadersStatus);

      const { length } = array

      list.addInHeadRow(
        length - 1,
        <div 
          data-cy={`smallCircle`}
          data-test={`${inputValue.toString()} changing`}
        >
          <Circle 
            letter={inputValue.toString()}
            state={ElementStates.Changing}
            isSmall={true}
          />
        </div> 
      )

      list.append(inputValue, ElementStates.Modified)
      list.createTable()
      await startDelay(1000)
      
      updateList()
      await startDelay(1000)

      list.changeElementColor(ElementStates.Default, length)
      updateList()
      
      setInputValue(null)
      
      setLoadersStatus(prev => ({ ...prev, addInTail: false }))
      setDisableStatus(hardDisabled);
    }
  }

  const deleteHead = async () => {
    setLoadersStatus(prev => ({ ...prev, deleteHead: true }));
    setDisableStatus(loadersStatus);

    const smallCircleValue: string | undefined = hashTable && hashTable[`0`].middleRow.value.toString()
    
    if (hashTable) {
      hashTable[`0`].middleRow.value = ' '
    }

    list.addInTailRow(
      0,
      <div 
        data-cy={`smallCircle`}
        data-test={`${smallCircleValue} changing`}
      >
        <Circle 
          letter={smallCircleValue}
          state={ElementStates.Changing}
          isSmall={true}
        />
      </div> 
    )

    list.deleteHead()
    list.createTable()
    await startDelay(1000)
    
    updateList()
    
    setLoadersStatus(prev => ({ ...prev, deleteHead: false }));
    setDisableStatus(hardDisabled);
  }

  const deleteTail = async () => {
    setLoadersStatus(prev => ({ ...prev, deleteTail: true }));
    setDisableStatus(loadersStatus);

    setTailStatusRow([list.getSize() - 1]);

    setIsDeleteActive({
      status: true,
      value: 0,
      index: list.getSize() - 1,
    });

    setIsTailActive({
      status: true,
      value: array[array.length - 1].value,
    });

    await startDelay(700);
    list.deleteTail();
    setArray(list.getArray());
    forceUpdate();

    setIsDeleteActive({
      status: false,
      value: 0,
      index: -1,
    });

    setIsTailActive({
      status: false,
      value: 0,
    });

    setTailStatusRow([list.getSize() - 1]);
    setLoadersStatus(prev => ({ ...prev, deleteTail: false }));
    setDisableStatus(hardDisabled);
  }

  const insertAt = async () => {
    if (typeof inputValue === 'number' && typeof indexInput === 'number') {
      setLoadersStatus(prev => ({ ...prev, addByIndex: true }));
      setDisableStatus(loadersStatus);
      let ind = 0;

      while (ind < indexInput) {
        setIsHeadActive({
          status: true,
          value: inputValue
        });
        setHeadStatusRow([ind]);

        list.changeElementColor(ElementStates.Changing, ind);
        setArray(list.getArray());
        forceUpdate();
        await startDelay(1000);
        ind++;
      }

      setHeadStatusRow([ind]);
      await startDelay(1000);

      setHeadStatusRow([]);
      list.insertAt(inputValue, ind);
      while (ind >= 0) {
        ind--;
        list.changeElementColor(ElementStates.Default, ind);
      }
      list.changeElementColor(ElementStates.Modified, indexInput);
      setArray(list.getArray());
      forceUpdate();
      await startDelay(1000);

      list.changeElementColor(ElementStates.Default, indexInput);
      setArray(list.getArray());
      setIndexInput(null);
      setInputValue(null);
      forceUpdate();
      setLoadersStatus(prev => ({ ...prev, addByIndex: false }));
      setDisableStatus(hardDisabled);
    }
  }

  const deleteAt = async () => {
    if (typeof indexInput === 'number') {
      setLoadersStatus(prev => ({ ...prev, deleteByIndex: true }));
      setDisableStatus(loadersStatus);

      let ind = 0;

      while (ind <= indexInput) {
        list.changeElementColor(ElementStates.Changing, ind);
        setArray(list.getArray());
        forceUpdate();
        await startDelay(1000);
        ind++;
      }

      setIsDeleteActive({
        status: true,
        value: 0,
        index: ind - 1
      });

      setIsTailActive({
        status: true,
        value: array[ind - 1].value
      });

      setTailStatusRow([ind - 1]);
      list.changeElementColor(ElementStates.Default, ind - 1);
      setArray(list.getArray());
      forceUpdate();
      await startDelay(1000);

      list.deleteAt(indexInput);
      setArray(list.getArray());
      setIsTailActive({
        status: false,
        value: 0
      });
      setIsDeleteActive({
        status: false,
        value: 0,
        index: -1
      });
      forceUpdate();

      while (ind >= 0) {
        list.changeElementColor(ElementStates.Default, ind);
        ind--
      }

      setArray(list.getArray());
      forceUpdate()
      setLoadersStatus(prev => ({ ...prev, deleteByIndex: false }));
      setIndexInput(null);
      setDisableStatus(hardDisabled);
    }
  }

  const handleTail = (obj: TActivness) => {
    if (obj.status === true) {
      return (
        obj.status && <Circle
          letter={obj.value.toString()}
          state={ElementStates.Changing}
          isSmall={true}
        />
      )
    } else {
      return (
        'tail'
      )
    }
  }

  const handleHead = (obj: TActivness) => {
    if (obj.status === true) {
      return (
        obj.status && <Circle
          letter={obj.value.toString()}
          state={ElementStates.Changing}
          isSmall={true}
        />
      )
    } else {
      return (
        'head'
      )
    }
  };

  useEffect(() => {
    [0, 4, 31, 8].forEach((item) => {
      list.append(item, ElementStates.Default)
    });
    setArray(list.getArray());
    list.createTable()
    setHashTable(list.getTable())
  }, [])

  const checkValue = (value: number | null, size: number): boolean => {
    if (size > 19) {
      return true
    }
    if (typeof value === 'number') {
      return false
    }
    return true
  };

  const checkIndex = (value: number | null, size: number) => {
    if (size <= 0) {
      return true
    }

    if (typeof value === 'number') {
      if ((value >= 0) && (value < size)) {
        return false
      }
    } else {
      return true
    };
    return true
  }

  return (
    <SolutionLayout title="Связный список">
      <section className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.inputsBox}>
            <Input
              maxLength={4}
              isLimitText={true}
              placeholder='Введите значение'
              extraClass={' mb-4'}
              onChange={onValueInput}
              value={inputValue?.toString() || ''}
              data-cy='inputValue'
            />
            <Input
              type='number'
              placeholder='Введите индекс'
              onChange={onIndexInput}
              min={0}
              max={array.length}
              isLimitText
              value={indexInput?.toString() || ''}
              data-cy='inputIndex'
            />
          </div>
          <div className={styles.buttonsBox + ' ml-6'}>
            <Button
              text='Добавить в head'
              onClick={addToHead}
              isLoader={loadersStatus.addInHead}
              disabled={Boolean(!inputValue)}
              data-cy={'addToHead'}
            />
            <Button
              text='Добавить в tail'
              onClick={addToTail}
              isLoader={loadersStatus.addInTail}
              disabled={Boolean(!inputValue)}
              data-cy={'addToTail'}
              />
            <Button
              text='Удалить из head'
              onClick={deleteHead}
              isLoader={loadersStatus.deleteHead}
              disabled={!disableStatus.deleteHead || !array.length}
              data-cy={'deleteHead'}
            />
            {/*<Button
              text='Удалить из tail'
              onClick={deleteTail}
              isLoader={loadersStatus.deleteTail}
              disabled={!disableStatus.deleteTail || !array.length}
            />

            <Button
              text='Добавить по индексу'
              onClick={insertAt}
              isLoader={loadersStatus.addByIndex}
              disabled={!disableStatus.addByIndex || checkIndex(indexInput, array.length) || checkValue(inputValue, array.length)}
              extraClass={styles.button}
            />
            <Button
              text='Удалить по индексу'
              onClick={deleteAt}
              isLoader={loadersStatus.deleteByIndex}
              disabled={!disableStatus.deleteByIndex || checkIndex(indexInput, array.length)}
              extraClass={styles.button} */
            /* /> */}
          </div>
        </div>

        <div className={styles.result}>
          {hashTable && array.map(({ value, index: _, state }, ind, array) => (
            <div 
              className={styles.resultElement} 
              key={ind} 
              data-cy={`circle${ind}`}
              data-test={`${hashTable[`${ind}`].middleRow.value} ${ind} ${state}`}
            >
              <Circle
                head={hashTable[`${ind}`].topRow.element}
                tail={hashTable[`${ind}`].bottomRow.element}
                index={ind}
                extraClass={styles.mainCircle}
                letter={hashTable[`${ind}`].middleRow.value.toString()}
                state={hashTable[`${ind}`].middleRow.state}
              />
              <div className={styles.arrow}>
                {array.length - 1 !== ind ? <ArrowIcon /> : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SolutionLayout>
  );
};