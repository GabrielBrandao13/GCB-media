import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid'

import { connection } from '../../src/services/mysql';

export type LoginApiResponse = {
    status: string;
    sucess: boolean;
    token: string;
    user?: {
        id: number;
        name: string;
    };
}

export default function login(req: NextApiRequest, res: NextApiResponse) {
    const { user, pass } = req.body

    if (!user.trim() || !pass.trim()) {
        return res.json({
            status: 'Informações faltantes',
            sucess: false
        } as LoginApiResponse)
    }


    connection.query(
        `
        SELECT * FROM tbUsers 
            WHERE userName=? AND userPassword=?
        `,
        [user, pass],
        (err, result) => {
            if (!result[0]) {
                return res.json({
                    status: 'Usuário não encontrado',
                    sucess: false,
                } as LoginApiResponse)
            }

            return res.json({
                status: 'Logado com sucesso',
                sucess: true,
                token: uuid(),
                user: {
                    id: result[0].userId,
                    name: result[0].userName
                }
            } as LoginApiResponse)
        }
    )

}