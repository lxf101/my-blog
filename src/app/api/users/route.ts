import {NextApiRequest, NextApiResponse} from 'next'
import { NextResponse } from "next/server"
import {format} from 'date-fns'
import md5 from 'md5'
import {encode} from 'js-base64'
import {getIronSession} from 'iron-session'

import request from '../../../../service/fetch'
import {ironOptions} from '../../../../config'

export const POST = async (req: NextApiRequest, res: NextApiResponse)=>{
    let {to, templateId} = await req.json()
    console.log('==========', to, templateId)
    
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
        datas: [verifyCode, expireMinute]
    }, {
        headers: {
            Authorization
        }
    })

    console.log('====route.ts=====response==', response)

    try{
        return NextResponse.json({
            code: 0,
            message: 'ok'
        }, {status: 200})
    }catch(error){
        return NextResponse.json({
            message: 'error'
        }, {status: 500})
    }
}