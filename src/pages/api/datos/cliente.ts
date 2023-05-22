// import type { NextApiRequest, NextApiResponse } from 'next'
// import interceptor from '../../../api/interceptor'
// import { desencriptar } from '../../../helpers/encriptar'
// import { ClienteDatos } from '../../../interfaces/interfaces'

// export type payloadCliente = {
//   token: string, 
//   nroDocumento: string, 
//   codigoCliente: string
// }

// interceptor();

// const requestToken = async (payload: payloadCliente, deviceInfo: string, userInfo: string)=> {
//     let tokenDes = desencriptar(payload.token as string)
//     payload.token = tokenDes;
//     const res = await getClientId(payload, deviceInfo, userInfo);
//     return res
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//     const clientData = await requestToken(req.body.data, req.headers.deviceinfo as string, req.headers.userinfo as string)
//     if (clientData){
//       res.status(clientData.status).json(clientData.data as ClienteDatos)
//     }else{
//       res.status(500).json({data: clientData})
//     }
  
// }
