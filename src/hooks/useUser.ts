import { Post } from '../types/Post'
import { User } from '../types/User'

import { UserInfoApiResponse } from '../../pages/api/userInfo'

export type UserInfo = {
    user?: User;
    posts: Post[];
} | null

type useUserType = (userName: string) => Promise<UserInfo | null>

const useUser: useUserType = async (userName: string): Promise<UserInfo | null> => {
    let finalData: UserInfo = {
        user: {
            id: '0',
            name: userName,
        },
        posts: []
    }
    const userDataReq = await fetch('http://localhost:3000/api/userInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: userName
        })
    })

    const userData = await userDataReq.json() as UserInfoApiResponse
    if (!userData.sucess) return null

    finalData.user = userData.user

    const userPostsReq = await fetch('http://localhost:3000/api/listPosts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            userId: finalData.user?.id
        })
    })
    const userPosts = await userPostsReq.json() as Post[]
    finalData.posts = userPosts

    return finalData
}

export { useUser }