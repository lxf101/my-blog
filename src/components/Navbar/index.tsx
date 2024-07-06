'use client'
import type {NextPage} from 'next'
import { observer } from 'mobx-react-lite';
import Link from 'next/link'
import {useRouter, usePathname} from 'next/navigation'
import {Button, Avatar, Dropdown, Menu, message} from 'antd'
import {LoginOutlined, HomeOutlined} from '@ant-design/icons'
import {useState} from 'react'

import {navs} from './config'
import styles from './index.module.scss'
import Login from '../Login'
import {useStore} from '../../../store/index'
import request from '../../../service/fetch'

const Navbar:NextPage = ()=>{
    const store = useStore()
    const {userId, avatar} = store.user.userInfo
    console.log('======navbar====', store)
    const router = useRouter()
    const pathname = usePathname()
    const [isShowLogin, setIsShowLogin] = useState(false)


    const handleGotoEditorPage = ()=>{

    }

    const handleLogin = ()=>{
        setIsShowLogin(true);

    }

    const handleClose = () => {
        setIsShowLogin(false);
    }
    const handleGotoPersonalPage = ()=>{

    }

    const handleLogout = () => {
        request.post('/api/users/logout').then(res => {
            if(res.code === 0){
                store.user.setUserInfo({})
                message.success(res.msg)
            }
        })
    }

    const renderDropDownMenu = ()=>{
        return (
            <Menu>
                <Menu.Item onClick={handleGotoPersonalPage}>
                    <HomeOutlined />&nbsp; 个人主页
                </Menu.Item>
                <Menu.Item onClick={handleLogout}>
                    <LoginOutlined />&nbsp; 退出系统
                </Menu.Item>
            </Menu>
        )
    }

    return (
        <div className={styles.navbar}>
            <section className={styles.logoArea}>BLOG-C</section>
            <section className={styles.linkArea}>
                {
                    navs?.map(nav => (
                        <Link key={nav.label} href={nav.value} className={pathname === nav?.value ? styles.active : ''}>{nav.label}</Link> 
                    ))
                }
            </section>
            <section className={styles.operationArea}>
                <Button onClick={handleGotoEditorPage}>写文章</Button>
                {
                    userId ? (
                        <>
                            <Dropdown overlay={renderDropDownMenu()} placement='bottomLeft'>
                                <Avatar src={avatar} size={32}/>
                            </Dropdown>
                        </>
                    ) : (
                        <Button type="primary" onClick={handleLogin}>登录</Button>
                    )
                }
                
                
                
                
            </section>
            <Login isShow={isShowLogin} onClose={handleClose} />
        </div>
    )
}

export default observer(Navbar)