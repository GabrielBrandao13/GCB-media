import { NextApiRequest as Request, NextApiResponse as Response } from 'next'

import { connection as mysql } from '../../src/services/mysql'

type UserSearchApiRequestBody = {
    q: string;
}

export type UserSearchApiResponse = {
    userName: string;
    userId: number;
}[]

export default function handleRequest(req: Request, res: Response) {
    const requestQuery = req.query as UserSearchApiRequestBody

    const { q } = requestQuery

    var users: UserSearchApiResponse = []

    mysql.query(
        'SELECT * FROM tbUsers WHERE userName LIKE ?',
        [`%${q}%`],
        (err, result) => {
            if (!err) {
                users = result
                return res.json(users)
            } else {
                return res.json({
                    status: 'fail',
                    error: err.sqlMessage
                })
            }
        }
    )
}