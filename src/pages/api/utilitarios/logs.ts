import type { NextApiRequest, NextApiResponse } from 'next';
'use strict';
const fs = require('fs');
const oracledb = require('oracledb');

try {
    const libPath = 'C:\\oracle\\instantclient_21_9';

    if (libPath && fs.existsSync(libPath)) {
        oracledb.initOracleClient({ libDir: libPath });
    }
    oracledb.extendedMetaData = true;

} catch (error) {
    console.error(error);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const connection = await oracledb.getConnection({
        user: process.env.NEXT_PUBLIC_USER_DB as string,
        password: process.env.NEXT_PUBLIC_USER_PASSWORD_DB as string,
        connectString: process.env.NEXT_PUBLIC_CONNECTSTRING_DB as string,
    });

    try {
        if(connection) {
            const _datos_usuario = JSON.stringify(req.body.data.datos_usuario);
            const _datos_dispositivo = JSON.stringify(req.body.data.datos_dispositivo);         
            const _request = JSON.stringify(req.body.data.req);
            const _response = JSON.stringify(req.body.data.response);

            await connection.execute(
                `BEGIN
                    stage.SP_INSERT_LOGS_FRONTEND(
                        :pi_tipo_evento,
                        :pi_evento,
                        :pi_descripcion,
                        :pi_tipo,
                        :pi_user_operador,
                        :pi_clie_key,
                        :pi_ip,
                        :pi_id_dispositivo,
                        :pi_dispositivo,
                        :pi_version_aplicacion,
                        :pi_canal,
                        :pi_datos_usuario,
                        :pi_datos_dispositivo,
                        :pi_request,
                        :pi_response
                    );
                END;`,
                {
                    pi_tipo_evento: { val: req.body.data.tipo_evento, dir: oracledb.BIND_INOUT },
                    pi_evento: { val: req.body.data.evento, dir: oracledb.BIND_INOUT },
                    pi_descripcion: { val: req.body.data.descripcion, dir: oracledb.BIND_INOUT },
                    pi_tipo: { val: req.body.data.tipo, dir: oracledb.BIND_INOUT },
                    pi_user_operador: { val: req.body.data.user_operador, dir: oracledb.BIND_INOUT },
                    pi_clie_key: { val: req.body.data.clie_key, dir: oracledb.BIND_INOUT },
                    pi_ip: { val: req.body.data.ip, dir: oracledb.BIND_INOUT },
                    pi_id_dispositivo: { val: req.body.data.id_dispositivo, dir: oracledb.BIND_INOUT },
                    pi_dispositivo: { val: req.body.data.dispositivo, dir: oracledb.BIND_INOUT },
                    pi_version_aplicacion: { val: req.body.data.version_aplicacion, dir: oracledb.BIND_INOUT },
                    pi_canal: { val: req.body.data.canal, dir: oracledb.BIND_INOUT },
                    pi_datos_usuario: { val: _datos_usuario, dir: oracledb.BIND_INOUT },
                    pi_datos_dispositivo: { val: _datos_dispositivo, dir: oracledb.BIND_INOUT },
                    pi_request: { val: _request, dir: oracledb.BIND_INOUT },
                    pi_response: { val: _response, dir: oracledb.BIND_INOUT }
                }
            );
        }
        return res.send('success');
    } catch (err: any) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}