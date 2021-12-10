import { Post } from '../../pages/api/listPosts'

export type UserInfo = {
    userName: string;
    id: number | null;
    posts: Post[];
} | null

type useUserType = (userName: string) => Promise<UserInfo>

const useUser: useUserType = async (userName: string) => {
    let finalData: UserInfo = {
        id: 0,
        userName: userName,
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

    const userData = await userDataReq.json()
    if (!userData.sucess) return null

    finalData.id = userData.user.id
    finalData.userName = userData.user.name

    const userPostsReq = await fetch('http://localhost:3000/api/listPosts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            userId: finalData.id
        })
    })
    const userPosts = await userPostsReq.json() as Post[]
    finalData.posts = userPosts

    return finalData
}

export { useUser }