import { cookies } from "next/headers";

export const setCookie = (key: string, value: any) => {
    // 登录失效 24h
    const expires = new Date(Date.now() + 24*60*60*1000)
    const path = '/'
    cookies().set(key, value, {
        path,
        expires
    })
}

export const getCookie = (key: string) => {
    return cookies().get(key)?.value
}

export const clearCookie = (key:string) => {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const path = '/'
    cookies().set(key, '', {
        path,
        expires
    })
}

