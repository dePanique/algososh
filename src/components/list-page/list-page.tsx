import React from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css';


export const ListPage: React.FC = () => {

  return (
    <SolutionLayout title="Связный список">
      <section className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.inputsBox}>
            <Input 
              type='text'
              maxLength={4}
              isLimitText={true}
              placeholder='Введите значение'
              extraClass={' mb-4'}
              // value={input}
              // onChange={handleChange}
            />
            <Input
              type='number'
              placeholder='Введите индекс'
              // onChange={}
              // value={}
              
            />
          </div>
          <div className={styles.buttonsBox + ' ml-6'}>
            <Button 
              text='Добавить в head'
              // onClick={}
              // isLoader={0}
              // disabled={}
            />
            <Button 
              text='Добавить в tail'
              // onClick={}
              // isLoader={0}
              // disabled={}
            />
            <Button 
              text='Удалить из head'
              // onClick={}
              // isLoader={0}
              // disabled={}
            />
            <Button 
              text='Удалить из tail'
              // onClick={}
              // isLoader={0}
              // disabled={}
            />
            
            <Button 
              text='Добавить по индексу'
              // onClick={}
              // isLoader={0}
              // disabled={}
              extraClass={styles.button}
            />
            <Button 
              text='Удалить по индексу'
              // onClick={}
              // isLoader={0}
              // disabled={}
              extraClass={styles.button}
            />

          </div>
        </div>

        <div className={styles.result}>
          {[0,0,0,0,0].map((el, index) => (
            <div className={styles.resultElement}>
              <div className={styles.resultColumns}>
                <Circle 
                  isSmall={true}
                  extraClass={styles.smallCircle}
                />
                <Circle 
                  head={'head'}
                  tail={'tail'}
                  index={4}
                  extraClass={styles.mainCircle}
                />
                <Circle 
                  isSmall={true}
                  extraClass={styles.smallCircle}
                />
              </div>

              <div className={styles.arrow}>
                <ArrowIcon />
              </div>
            </div>
          ))}

        </div>
      </section>
    </SolutionLayout>
  );
};
