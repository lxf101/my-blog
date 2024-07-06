import {NextApiRequest, NextApiResponse} from 'next'
import { NextResponse } from "next/server"

import {clearCookie} from '../../../../../utils'

export const POST = async(req: NextApiRequest, res: NextApiResponse) => {
    clearCookie('userId')
    clearCookie('nickname')
    clearCookie('avatar')

    return NextResponse.json({
        code: 0,
        msg: "退出成功",
        data: {}
    }, {status: 200})
}


