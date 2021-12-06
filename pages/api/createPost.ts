import { NextApiRequest, NextApiResponse } from 'next'

import { connection } from '../../src/services/mysql'

function createPost(req: NextApiRequest, res: NextApiResponse) {
    const { userId, imageUrl, text } = req.body
    connection.query(
        'INSERT INTO tbpost(userId, imageUrl, text) VALUES(?, ?, ?)',
        [userId, imageUrl, text],
        (err, result) => {

            if (!err) {
                return res.json({
                    status: 'Postagem realizada com sucesso!',
                    sucess: true
                })
            }
        }
    )
}

export default createPost