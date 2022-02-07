import { NextApiRequest as Request, NextApiResponse as Response } from 'next';

import { connection } from '../../src/services/mysql';

export type PostsApiResponse = {
    postId: number;
    userId: number;
    imageUrl: string;
    text: string;
    datePost: string;
    userName: string;
}

export default function posts(req: Request, res: Response) {
    var posts: PostsApiResponse[] = []
    connection.query(`SELECT postId, imageUrl, datePost, text, userName FROM tbpost INNER JOIN tbusers ON tbusers.userId = tbpost.userId ORDER BY datePost DESC`, (err, result) => {
        if (!err) {
            posts = result
        } else {
            return res.json(err.message)
        }
        return res.json(posts)
    });
}