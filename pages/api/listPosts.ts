import { NextApiRequest, NextApiResponse } from 'next'
import { connection } from '../../src/services/mysql'

export type Post = {
    postId: number;
    userId: number;
    imageUrl: string;
    text: string;
    datePost: string;
}

function listPosts(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.body
    let posts: Post[] = []

    connection.query(
        'SELECT * FROM tbpost WHERE userId = ? ORDER BY datePost DESC',
        [userId],
        (err, result) => {
            if (!err) {
                posts = result
            } else {
                console.log(err.message)
            }

            return res.json(posts)
        }
    )

}

export default listPosts