import {ChangeEvent, useState} from 'react'
import { observer } from 'mobx-react-lite';
import {message} from 'antd'

import request from '../../../service/fetch'
import styles from './index.module.scss'
import CountDown from '../CountDown'
import {useStore} from '../../../store'
interface IProps{
    isShow: boolean,
    onClose: Function
}

const Login = (props: IProps) => {
    const store = useStore()
    const [isVerifyCodeShow, setIsVerifyCodeShow] = useState(false)
    const [isRepeatClick, setIsRepeatClick] = useState(false)
    const [form, setForm] = useState({
        phone: '',
        verify: ''
    })
    const {isShow = false, onClose} = props

    const handleClose = ()=>{
        onClose()
    }
    const handleFormChange = (e:ChangeEvent<HTMLInputElement>)=>{
        let {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    // 点击获取验证码
    const handleGetVerifyCode = ()=>{
        if(!form.phone){
            message.warning('请输入手机号')
            return;
        }
        if(!isRepeatClick){
            setIsRepeatClick(true)
            request.post("/api/users", {
                to: form.phone,
                templateId: 1
            }).then(res => {
                if(res.code === 0){
                    console.log('res======', res)
                    setIsVerifyCodeShow(true)
                    setIsRepeatClick(false)
                }else {
                    message.error(res.msg || '未知错误')
                    setIsRepeatClick(false)
                }
            }).catch(err => {
                setIsRepeatClick(false)
                console.log('error=======', err)
            })
        }
    }
    const hideCountDown = ()=>{
        setIsVerifyCodeShow(false)
    }
    // 登录
    const handleLogin = ()=>{
        if(form.phone.trim() === ''){
            message.error('请输入手机号')
            return;
        }
        if(form.verify.trim() === ''){
            message.error('请输入验证码')
            return;
        }

        // 请求后端接口，登录
        request.post("/api/users/login", {
            ...form,
            "identity_type": "phone"
        }).then(res => {
            if(res.code === 0){
                store.user.setUserInfo(res.data)
                // 登录成功
                handleClose()
            }else{
                message.error(res.msg || '未知错误')
            }
        })
    }
    const handleOAthGithub = ()=>{

    }
    return (
        isShow ? 
            <div className={styles.loginArea}>
                <div className={styles.loginBox}>
                    <div className={styles.loginTitle}>
                        <div>手机号登录</div>
                        <div className={styles.close} onClick={handleClose}>x</div>
                    </div>
                    <input name="phone" type="text" placeholder='请输入手机号' value={form.phone} onChange={handleFormChange}/>
                    <div className={styles.verifyCodeArea}>
                        <input name="verify" type="text" placeholder='请输入验证码' value={form.verify} onChange={handleFormChange}/>
                        <span className={styles.verifyCode} onClick={handleGetVerifyCode}>
                            {
                                isVerifyCodeShow ? <CountDown time={10} onEnd={hideCountDown}/> : '获取验证码'
                            }
                        </span>
                    </div>
                    <div className={styles.loginBtn} onClick={handleLogin}>登录</div>
                    <div className={styles.otherLogin} onClick={handleOAthGithub}>使用Github 登录</div>
                    <div className={styles.loginPrivacy}><a href="https://moco.imooc.com/privacy.html" target="_blank">注册登录即表示同意</a></div>
                </div>
            </div> 
        : null
    )
}

export default observer(Login)