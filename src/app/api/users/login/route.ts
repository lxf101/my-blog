import {NextApiRequest, NextApiResponse} from 'next'
import { NextResponse } from "next/server"

import {prepareConnection} from '../../../../../db'
import {User, UserAuth} from "../../../../../db/entity"
import { setCookie } from '../../../../../utils';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    let {phone, verify, identity_type = 'phone'} = await req.json()
    const db = await prepareConnection()
    const userRepo = db.getRepository(User)
    const userAuthRepo = db.getRepository(UserAuth)

    // console.log("===userRepo===", await userRepo.find())
    // 判断输入的验证码和session中的验证码是否相同
    // 这里，假设验证码的相同
    // 在user_auths表中查找identity_type是否有记录
    const userAuth = await userAuthRepo.findOne({
        identity_type,
        identifier: phone
    }, {
        relations: ['user']
    })
    // 如果找到了
    if(userAuth){
        const user = userAuth.user;
        const {id, nickname, avatar} = user
        // session.userId = id;
        // session.nickname = nickname;
        // session.avatar = avatar;
        // await session.save();

        // 设置 cookie
        setCookie('userId', id)
        setCookie('nickname', nickname)
        setCookie('avatar', avatar)
        
        return NextResponse.json({
            code: 0,
            msg: "登录成功",
            data: {
                userId: id,
                nickname,
                avatar
            }
        }, {status: 200})
    }else{
        // 新建用户，自动注册
        const user = new User()
        user.nickname = `用户_${Math.floor(Math.random()*10000)}`
        user.avatar = '/images/avatar.jpg'
        user.job = ''
        user.introduce = ''

        const userAuth = new UserAuth()
        userAuth.identity_type = identity_type
        userAuth.identifier = phone
        userAuth.credential = verify
        userAuth.user = user

        // 保存userAuth
        const resUserAuth = await userAuthRepo.save(userAuth)
        const {user: {id, nickname, avatar}} = resUserAuth
        // session.userId = id;
        // session.nickname = nickname;
        // session.avatar = avatar;
        // await session.save();

        // 设置 cookie
        setCookie('userId', id)
        setCookie('nickname', nickname)
        setCookie('avatar', avatar)
        
        return NextResponse.json({
            code: 0,
            msg: "登录成功",
            data: {
                userId: id,
                nickname,
                avatar
            }
        }, {status: 200})
    }
}