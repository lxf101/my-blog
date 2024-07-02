import { useEffect, useState } from "react"

import styles from './index.module.scss'
interface IProps{
    time: number,
    onEnd: Function
}

const CountDown = (props: IProps)=>{
    const {time, onEnd} = props
    const [count, setCount] = useState(time || 60)

    useEffect(()=>{
        if(count === 0){
            onEnd && onEnd()
            return
        }
        const id = setTimeout(()=>{
            setCount(count-1)
        }, 1000)
        return ()=>{
            clearTimeout(id)
        }
    }, [count]) // count发生变化时，都会执行函数

    return (
        <div className={styles.countDown}>{count}</div>
    )
}

export default CountDown