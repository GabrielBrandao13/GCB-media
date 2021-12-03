import type { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '../../src/services/mysql';

export default function register(req: NextApiRequest, res: NextApiResponse) {
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
        WHERE userName = ?
        `,
        [user],
        (err, result) => {
            if (result[0]) {
                console.log('Usuário já existe')
                res.json({
                    status: 'Usuário já existe',
                    sucess: false
                })
            } else {
                console.log('Usuário não existe')
                registerUser()
            }
        }
    )

    function registerUser() {

        connection.query(
            `INSERT INTO tbUsers(userName, userPassword) VALUES(?, ?)`,
            [user, pass],
            (err, result) => {
                if (!err) {
                    return res.json({
                        status: 'Usuário cadastrado com sucesso',
                        sucess: true
                    })
                }

                console.log(err)

                return res.json({
                    status: 'Falha ao cadastrar usuário',
                    sucess: false
                })
            }
        )
    }



}