import {useState} from 'react'

import styles from './index.module.scss'

interface IProps{
    isShow: boolean,
    onClose: Function
}

const Login = (props: IProps) => {
    const [form, setForm] = useState({
        phone: '',
        verify: ''
    })
    console.log(form.phone, form.verify)
    const {isShow = false} = props

    const handleClose = ()=>{

    }
    const handlePhoneChange = ()=>{

    }
    const handleVerifyChange = ()=>{

    }
    const handleGetVerifyCode = ()=>{

    }
    const handleLogin = ()=>{

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
                    <input name="phone" type="text" placeholder='请输入手机号' value={form.phone} onChange={handlePhoneChange}/>
                    <div className={styles.verifyCodeArea}>
                        <input name="verify" type="text" placeholder='请输入验证码' value={form.verify} onChange={handleVerifyChange}/>
                        <span className={styles.verifyCode} onClick={handleGetVerifyCode}>获取验证码</span>
                    </div>
                    <div className={styles.loginBtn} onClick={handleLogin}>登录</div>
                    <div className={styles.otherLogin} onClick={handleOAthGithub}>使用Github 登录</div>
                    <div className={styles.loginPrivacy}><a href="https://moco.imooc.com/privacy.html" target="_blank">注册登录即表示同意</a></div>
                </div>
            </div> 
        : null
    )
}

export default Login