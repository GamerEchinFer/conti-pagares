import type { NextApiRequest, NextApiResponse } from 'next'
import { listarMarcasPla } from '../../../api/ApiAuth'
import { desencriptar } from '../../../helpers/encriptar'
import MarcasPlaResponse from '../../../models/responses/MarcasPLA.response'


const getMarcasPla = async (token: string, codCliente:string, deviceInfo: string, userInfo: string) => {
	let tokenDes = desencriptar(token as string)
	const marcasPla = await listarMarcasPla(tokenDes, codCliente, deviceInfo, userInfo);
	return marcasPla

}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const marcasPla = await getMarcasPla(req.body.data.token, req.body.data.codCliente, req.headers.deviceinfo as string, req.headers.userinfo as string);
	if (marcasPla) {
		res.status(marcasPla?.status).json(marcasPla.data as MarcasPlaResponse[])
	} else {
		res.status(500).json({ data: marcasPla });
	}
}


