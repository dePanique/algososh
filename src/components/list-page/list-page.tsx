import React, { useEffect, useState } from "react";
import styles from './list-page.module.css';
import { ElementStates } from "../../types/element-states";
import { startDelay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { hardDisabled, initialObj } from "./constants";
import { IObject, IHashTable } from "./types";
import { LinkedList } from "./utils";

export const ListPage: React.FC<{ children?: React.ReactNode }> = () => {
  const [array, setArray] = useState<IObject[]>([initialObj]);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [indexInput, setIndexInput] = useState<number | null>(null);
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

  const [hashTable, setHashTable] = useState<IHashTable<number>>()

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

    const { length } = array

    const smallCircleValue: string | undefined = hashTable && hashTable[`${length - 1}`].middleRow.value.toString()

    if (hashTable) {
      hashTable[`${length - 1}`].middleRow.value = ' '
    }

    list.addInTailRow(
      length - 1,
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

    list.deleteTail()
    list.createTable()
    await startDelay(1000)

    updateList()

    setLoadersStatus(prev => ({ ...prev, deleteTail: false }));
    setDisableStatus(hardDisabled);
  }

  const insertAt = async () => {
    if (typeof inputValue === 'number' && typeof indexInput === 'number') {
      setLoadersStatus(prev => ({ ...prev, addByIndex: true }));
      setDisableStatus(loadersStatus);
      let ind = 0;

      while (ind <= indexInput) {
        console.log(ind);

        list.addInHeadRow(
          ind,
          <div
            data-cy={`smallCircle${ind}`}
            data-test={`${inputValue.toString()} ${ind} changing`}
          >
            <Circle
              letter={inputValue.toString()}
              state={ElementStates.Changing}
              isSmall={true}
            />
          </div>
        )

        if (ind === 1) {
          list.addInHeadRow(
            0,
            'head'
          )

          hashTable && (
            hashTable[`0`].middleRow.state = ElementStates.Changing
          )
        } else if (ind > 1) {
          list.addInHeadRow(
            ind - 1,
            ''
          )

          hashTable && (
            hashTable[`${ind - 1}`].middleRow.state = ElementStates.Changing
          )
        }

        updateList()
        await startDelay(700);
        ind++;
      }

      list.insertAt(inputValue, indexInput, ElementStates.Modified)
      list.createTable()
      updateList()

      await startDelay(700)

      list.changeElementColor(ElementStates.Default, indexInput)
      updateList()

      setInputValue(null)
      setIndexInput(null)
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
        list.changeElementColor(ElementStates.Changing, ind)

        list.createTable()
        updateList()
        await startDelay(1000);
        ind++;
      }

      list.deleteTableValue(ind - 1)
      setHashTable(list.getTable())

      const smallCircleValue: string | undefined = hashTable && hashTable[`${ind - 1}`].middleRow.value.toString()

      list.addInTailRow(
        ind - 1,
        <div
          data-cy={`smallCircle`}
          data-test={`${smallCircleValue} ${ind - 1} changing`}
        >
          <Circle
            letter={smallCircleValue}
            state={ElementStates.Changing}
            isSmall={true}
          />
        </div>
      )

      updateList()
      await startDelay(700)
      list.createTable()
      updateList()

      list.deleteAt(ind - 1)
      list.createTable()
      while(ind >= 0) {
        list.changeElementColor(ElementStates.Default, ind)
        ind--
      }
      updateList()

      setIndexInput(null);
      setLoadersStatus(prev => ({ ...prev, deleteByIndex: false }));
      setDisableStatus(hardDisabled);
    }
  }

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
              max={array.length ? array.length - 1 : '0'}
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
              disabled={inputValue === null ? true : false}
              data-cy={'addToHead'}
            />
            <Button
              text='Добавить в tail'
              onClick={addToTail}
              isLoader={loadersStatus.addInTail}
              disabled={inputValue === null ? true : false}
              data-cy={'addToTail'}
            />
            <Button
              text='Удалить из head'
              onClick={deleteHead}
              isLoader={loadersStatus.deleteHead}
              disabled={!disableStatus.deleteHead || !array.length}
              data-cy={'deleteHead'}
            />
            <Button
              text='Удалить из tail'
              onClick={deleteTail}
              isLoader={loadersStatus.deleteTail}
              disabled={!disableStatus.deleteTail || !array.length}
              data-cy={'deleteTail'}
            />
            <Button
              text='Добавить по индексу'
              onClick={insertAt}
              isLoader={loadersStatus.addByIndex}
              disabled={!disableStatus.addByIndex || checkIndex(indexInput, array.length) || checkValue(inputValue, array.length)}
              extraClass={styles.button}
              data-cy={'insertAt'}
            />
            <Button
              text='Удалить по индексу'
              onClick={deleteAt}
              isLoader={loadersStatus.deleteByIndex}
              disabled={!disableStatus.deleteByIndex || checkIndex(indexInput, array.length)}
              extraClass={styles.button}
              data-cy={'deleteAt'}
            />
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