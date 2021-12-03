import type { NextApiRequest, NextApiResponse } from 'next';

import { connection } from '../../src/services/mysql';


type userType = {
    id: number;
    name: string;
}

type apiResponseType = {
    status: string;
    sucess: boolean;

    user?: userType;
}

export default function login(req: NextApiRequest, res: NextApiResponse) {
    const { user, pass } = req.body

    if (!user.trim() || !pass.trim()) {
        return res.json({
            status: 'Informações faltantes',
            sucess: false
        } as apiResponseType)
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
                } as apiResponseType)
            }

            return res.json({
                status: 'Logado com sucesso',
                sucess: true,
                user: {
                    id: result[0].userId,
                    name: result[0].userName,
                }
            } as apiResponseType)
        }
    )

}