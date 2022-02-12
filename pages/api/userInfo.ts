import { NextApiRequest, NextApiResponse } from 'next/types';
import { connection } from '../../src/services/mysql';
import { User } from '../../src/types/User';

export type UserInfoApiResponse = {
    status: string;
    sucess: boolean;
    user?: User;
}

export default function getUserInfo(req: NextApiRequest, res: NextApiResponse) {
    const { userName } = req.body

    if (!userName) {
        return res.json({
            status: 'Informações faltantes',
            sucess: false
        } as UserInfoApiResponse)
    }

    connection.query(
        `
        SELECT userId, userName FROM tbUsers
        WHERE userName = ?
        `,
        [userName],
        (err, result) => {
            if (err || !result[0]) {
                return res.json({
                    status: 'Falha ao coletar informações do usuário',
                    sucess: false,
                } as UserInfoApiResponse)
            }
            return res.json({
                status: 'Usuário encontrado',
                sucess: true,
                user: {
                    name: result[0].userName,
                    id: result[0].userId
                }
            } as UserInfoApiResponse)
        }

    )
}