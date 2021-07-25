import { NextApiRequest as Request, NextApiResponse as Response } from 'next/types';
import { connection } from '../../src/services/mysql';

export default function deleteUser(req: Request, res: Response) {
    const { userName, password } = req.body

    if (userName.trim() && password.trim()) {
        connection.query(
            `
            DELETE FROM tbUsers
            WHERE userName = '${userName}' AND userPassword = '${password}'
            `,
            (err, result) => {
                if (err) {
                    return res.json({
                        status: 'Erro ao deletar usuário',
                        sucess: false,
                        err
                    })
                }
                return res.json({
                    status: 'Usuário deletado com sucesso',
                    sucess: true,
                    result
                })
            }
        )
    }
}