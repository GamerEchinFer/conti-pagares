import type { NextApiRequest, NextApiResponse } from 'next'
import { listarDatosAdicionales } from '../../../api/ApiAuth'
import { desencriptar } from '../../../helpers/encriptar'
import DatosAdicionalesResponse from '../../../models/responses/DatosAdicionales.response'


const getDatosAdicionales = async (token: string, codCliente: string, deviceInfo: string, userInfo: string) => {
	let tokenDes = desencriptar(token as string)
	const datosAdicionales = await listarDatosAdicionales(tokenDes, codCliente, deviceInfo, userInfo);
	return datosAdicionales

}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

	const datosAdicionales = await getDatosAdicionales(req.body.data.token, req.body.data.codCliente, req.headers.deviceinfo as string, req.headers.userinfo as string);
	if (datosAdicionales) {
		res.status(datosAdicionales.status).json(datosAdicionales.data as DatosAdicionalesResponse)
	} else {
		res.status(500).json({ data: datosAdicionales });
	}
}