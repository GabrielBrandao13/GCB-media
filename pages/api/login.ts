import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid'

import { connection } from '../../src/services/mysql';

export default function login(req: NextApiRequest, res: NextApiResponse) {
    const { user, pass } = req.body

    if (!user.trim() || !pass.trim()) {
        return res.json({
            status: 'Informações faltantes',
            sucess: false
        })
    }


    connection.query(
        `
        SELECT * FROM tbUsers 
            WHERE userName=? AND userPassword=?
        `,
        [user, pass],
        (err, result) => {
            // console.log(result[0])
            if (!result[0]) {
                return res.json({
                    status: 'Usuário não encontrado',
                    sucess: false,
                })
            }

            return res.json({
                status: 'Logado com sucesso',
                sucess: true,
                user: {
                    id: result[0].userId,
                    name: result[0].userName,
                    token: uuid()
                }
            })
        }
    )

}