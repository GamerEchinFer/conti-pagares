import type { NextApiRequest, NextApiResponse } from 'next'
import { loginApiGDI } from '../../../api/ApiAuth'
import interceptors from '../../../api/interceptors'
import { encriptar } from '../../../helpers/encriptar'

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
    let tokenEncr = encriptar(tokenData?.data.access_token as string)
    
    if (tokenData){
      res.status(tokenData.status).json(tokenData?.data.access_token ? tokenEncr : tokenData.data)
    }else{
      res.status(500).json('' as string)
    }
  
}
