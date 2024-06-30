import { useEffect, useState } from "react"


interface IProps{
    time: number,
    onEnd: Function
}

const CountDown = (props: IProps)=>{
    const {time, onEnd} = props
    const [count, setCount] = useState(time || 60)

    useEffect(()=>{
        const id = setInterval(()=>{
            setCount((count)=>{
                if(count === 0){
                    clearInterval(id)
                    onEnd && onEnd()
                    return count
                }
                return count-1
            })
            return ()=>{
                clearInterval(id)
            }
        }, 1000)
    }, [time, onEnd])

    return (
        <div>{count}</div>
    )
}

export default CountDown