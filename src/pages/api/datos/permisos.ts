import type { NextApiRequest, NextApiResponse } from 'next'
import { listarPermisosUsuario } from '../../../api/ApiAuth'
import { desencriptar } from '../../../helpers/encriptar'
import { PermisosUsuarioResponse } from '../../../models/responses'


const getPermisosUsuario = async (token: string, deviceInfo: string, userInfo: string, userCarga: string) => {
	let tokenDes = desencriptar(token as string)
	const permisosUsuario = await listarPermisosUsuario(tokenDes, deviceInfo, userInfo, userCarga);
	return permisosUsuario

}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

	const permisosUsuario = await getPermisosUsuario(req.body.data.token, req.headers.deviceinfo as string, req.headers.userinfo as string, req.body.data.userCarga as string);
	if (permisosUsuario) {
		res.status(permisosUsuario.status).json(permisosUsuario.data as PermisosUsuarioResponse[])
	} else {
		res.status(500).json({ data: permisosUsuario });
	}
}