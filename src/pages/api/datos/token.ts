import type { NextApiRequest, NextApiResponse } from 'next'
import { encriptar } from '../../../helpers/encriptar'
import { loginApiGDI } from '../../../api/ApiAuth'
import interceptors from '../../../api/interceptors'

type payload = {
  v1: string, 
  v2: string, 
  v3: string
}

interceptors();

const requestToken = async ()=> {
    const res = await loginApiGDI();
    return res
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const tokenData = await requestToken()
    let tokenEncr = tokenData?.data ? encriptar(tokenData?.data.access_token as string) : '';
    if (tokenData){
      res.status(tokenData.status ? tokenData.status : ((tokenData as any)?.response?.status) ? (tokenData as any)?.response?.status : 500).json((tokenData?.data && tokenData?.data.access_token) ? tokenEncr : tokenData)
    }else{
      res.status(500).json(tokenData ? tokenData : '' as string)
    }
  
}
