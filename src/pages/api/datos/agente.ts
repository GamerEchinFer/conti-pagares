import type { NextApiRequest, NextApiResponse } from 'next'
import { listarDatosAgente } from '../../../api/ApiAuth'
import { desencriptar } from '../../../helpers/encriptar'


const getDatosAgente = async (token: string, usuario: string, deviceInfo: string, userInfo: string) => {
	let tokenDes = desencriptar(token as string)
	const datosAgente = await listarDatosAgente(tokenDes, usuario, deviceInfo, userInfo);
	return datosAgente

}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

	const datosAgente = await getDatosAgente(req.body.data.token, req.body.data.usuario, req.headers.deviceinfo as string, req.headers.userinfo as string);
	if (datosAgente) {
		res.status(datosAgente.status).json(datosAgente.data as any)
	} else {
		res.status(500).json({ data: datosAgente });
	}
}