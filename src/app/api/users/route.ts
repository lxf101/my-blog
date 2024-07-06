import {NextApiRequest, NextApiResponse} from 'next'
import { NextResponse } from "next/server"
import {format} from 'date-fns'
import md5 from 'md5'
import {encode} from 'js-base64'
import {getIronSession} from 'iron-session'

import request from '../../../../service/fetch'
import {ironOptions} from '../../../../config'
import {ISession} from '@/app/api/index'


export const POST = async (req: NextApiRequest, res: NextApiResponse)=>{
    let {to, templateId} = await req.json()
    
    let appId = process.env.APPId
    let AccountId = process.env.ACCOUNTId
    let AuthToken = process.env.AUTHTOKEN

    const NowDate = format(new Date(), "yyyyMMddHHmmss")
    const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`)
    const Authorization = encode(`${AccountId}:${NowDate}`)
    const verifyCode = Math.floor(Math.random()*(9999-1000))+1000
    const expireMinute = '5'
    const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`

    const response = await request.post(url, {
        to,
        templateId,
        appId,
        reqId: "abc123",
        subAppend: "8888",
        datas: [verifyCode, expireMinute]
    }, {
        headers: {
            Authorization
        }
    })

    console.log('====route.ts=====response==', response)

    const session:ISession = getIronSession(req, res, ironOptions);

    const {statusCode, statusMsg} = response as any
    if(statusCode === '000000'){
        // 把验证码存到session中
        session.verifyCode = verifyCode
        await session.save();

        return NextResponse.json({
            code: 0,
            msg: ''
        }, {status: 200})
    } else {
        return NextResponse.json({
            code: statusCode,
            msg: statusMsg
        }, {status: 200})
    }
}