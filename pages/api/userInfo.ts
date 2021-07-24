import { NextApiRequest, NextApiResponse } from 'next/types';
import { connection } from '../../src/services/mysql';

export default function getUserInfo(req: NextApiRequest, res: NextApiResponse) {
    const { userName } = req.body

    if (!userName) {
        return res.json({
            status: 'Informações faltantes',
            sucess: false
        })
    }

    connection.query(
        `
        SELECT userId, userName FROM tbUsers
        WHERE userName = '${userName}'
        `,
        (err, result) => {
            if (err || !result[0]) {
                return res.json({
                    status: 'Falha ao coletar informações do usuário',
                    sucess: false,
                })
            }
            return res.json({
                status: 'Usuário encontrado',
                sucess: true,
                user: {
                    name: result[0].userName,
                    id: result[0].userId
                }
            })
        }

    )
}