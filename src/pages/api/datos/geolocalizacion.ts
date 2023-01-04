import type { NextApiRequest, NextApiResponse } from 'next';
import { Geolocalizacion } from '../../../api/ApiAuth';
import IpGeolocationResponse from '../../../models/responses/ipGeolocation.response';

const getIpGeolocation = async () => {
	const ipGeolocation = await Geolocalizacion();
	return ipGeolocation
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

	const ipGeolocation = await getIpGeolocation();
	if (ipGeolocation) {
		res.status(ipGeolocation.status).json(ipGeolocation.data as IpGeolocationResponse)
	} else {
		res.status(500).json({ data: ipGeolocation });
	}
}