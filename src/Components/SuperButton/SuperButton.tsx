import React from 'react';
import s from "./SuperButton.module.css"

type SuperButtonPropsType ={
    name: string
    callBack: ()=>void
    disabled: boolean
    children?: React.ReactNode
}

export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
    name, // можно удалить и передавать через children как удобно
    callBack,
    disabled,
    children,
    ...props
    }
) => {

    const onClickHandler = () => {
      callBack()
    }

    const finalClassName = `${s.button} ${s.defaultColor} ${disabled ? s.disabled : ''}` //шаблонные сроки
return(

    <button disabled={disabled} className={finalClassName} onClick={onClickHandler}>{children}</button>
)
}