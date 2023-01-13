import React, {ChangeEvent, useEffect, useState} from "react";
import {SuperButton} from "./SuperButton/SuperButton";
import styles from "./Counter.module.css"



export const Counter = () => {

    const valueStartForFirstRender = 0
    const valueMaxForFirstRender = 5
    const stepCount = 1

    const [countMin, setCountMin]  = useState<number>(valueStartForFirstRender)
    const [countMax, setCountMax]  = useState<number>(valueMaxForFirstRender)
    const [count, setCount] = useState<number>(countMin)

    let [error, setError] = useState<string| null>(null)
    const [disabled, setDisabled] = useState<boolean>(false)

    const getCountsFromLocalStorage = () => {     // общая для всех значений из LocalStorage // забираем значения из LocalStorage
        let objectLocalStorage = {countMin: valueStartForFirstRender, countMax: valueMaxForFirstRender}

        let valueMaxAsString = localStorage.getItem('countMax')
        let valueMinAsString = localStorage.getItem('countMin')

        if (valueMaxAsString != undefined) {  // если значение есть в Локал
            const valueMax = JSON.parse(valueMaxAsString)
            objectLocalStorage.countMax = valueMax   // если значение есть то записываем в обьект
        }
        if (valueMinAsString != undefined) {  // если значение есть в Локал
            const valueMin = JSON.parse(valueMinAsString)
            objectLocalStorage.countMin = valueMin
        }
        return objectLocalStorage
    }

    useEffect(()=>{  // 1. срабатывает первый раз при открытии стр "получаем значения с LocalStorage
        let objectFromFromLocalStorage = getCountsFromLocalStorage()
        setCountMin(objectFromFromLocalStorage.countMin)
        setCountMax(objectFromFromLocalStorage.countMax)
        setCount(objectFromFromLocalStorage.countMin); // сетаем мин значение из LocalStorage для отрисовки Count
    },[])

    useEffect(()=>{  // 3. срабатывает каждый раз когда меняем значение инпута Макс или мин
        validateCountMaxAndCountMin(countMax)
        validateCountMaxAndCountMin(countMin)
    },[countMax, countMin])

    const countIncrease = () => {
        setCount(count + stepCount)
    }

    const countReset = () => {
        setCount(countMin)
    }

    const setLimitCount = () => {  // 4.Нажатие кнопки set
        localStorage.setItem('countMin', countMin.toString());  // новые засетаные значения из useState поместить в LocalStorage
        localStorage.setItem('countMax', countMax.toString()); // новые засетаные значения из useState поместить в LocalStorage
        setCount(countMin);  // для отрисовки мин значения Count
        setDisabled(false) // сброс Disabled с кнопок тк значения инпутов отправлены
    }


    const validateCountMaxAndCountMin = (value:number) => { // функция валидации (проверка значений)
        if(value < 0 || countMax === countMin){
            setError('Incorrect value')
            return
        }
        if(countMax < countMin){
            setError('Max value не может быть меньше Start value')
            return
        }
        else {
            setError('')
            return
        }
    }

    const onChangeCountMax = (event: ChangeEvent<HTMLInputElement>) => {  // 2.ввод значения, валидация и отправка в useState Max
        const value = +event.currentTarget.value; // короткая запись для Number(event.currentTarget.value);
        setCountMax(value);
        setDisabled(true) // как только вводим в инпуты кнопки Disabled
    }
    const onChangeCountMin = (event: ChangeEvent<HTMLInputElement>) => { // 2.ввод значения, валидация и отправка в useState Min
        const value = +event.currentTarget.value;  // короткая запись для Number(event.currentTarget.value);
        setCountMin(value);
        setDisabled(true)  // как только вводим в инпуты кнопки Disabled
    }

    const funForDisabled = () => {    // если в инпутах ошибка то Disabled кнопку set
        return countMax <= countMin || countMin < 0 || countMax === countMin;
    }

/*    const funForDisabled = () => {  // длинная запись
        if(countMax <= countMin || countMin < 0 || countMax === countMin){
            return  true
        } else {
            return  false
        }
    }*/

    return (
        <div className={styles.block}>

            <div className={styles.box}>
                <div className={styles.boxInput}>
                    <div className={styles.maxStartValueText}>Max value:
                        <input
                            value={countMax}
                            onChange={onChangeCountMax}
                            className={`${styles.input} ${countMax <= countMin ? styles.inputError : ''}`}
                            type="number" step="1" min="-100" max="100"
                        />
                    </div>
                    <div className={styles.maxStartValueText}>Start value:
                        <input
                            value={countMin}
                            onChange={onChangeCountMin}
                            className={`${styles.input} ${countMin < 0 || countMax === countMin ? styles.inputError : ''}`}
                            type="number" step="1" min="-100" max="100"
                        />
                    </div>
                </div>
                <div className={styles.boxButton}>
                    <SuperButton disabled={funForDisabled()} callBack={setLimitCount} name={"set"}>{"set"}</SuperButton>
                </div>
            </div>


            <div className={styles.box}>
                {error && <div className={`${styles.boxCount} ${styles.textRed}`}>{error}</div>}
                {(!error && disabled ) &&  <div className={`${styles.boxCount} ${styles.textRed}`}>Press the button SET</div>}
                {(!error && !disabled ) && <div className={`${styles.boxCount} ${count === countMax ? styles.textRed :''}`}>{count}</div>}
                <div className={styles.boxButton}>
                    <SuperButton disabled={count === countMax || disabled} name={"inc"} callBack={countIncrease}>{"inc"}</SuperButton>
                    <SuperButton disabled={disabled} name={"reset"} callBack={countReset}>{"reset"}</SuperButton>
                </div>
            </div>


        </div>
    )
}