import { ReactNode } from 'react'
import styled from 'styled-components'

type PostsWrapperProps = {
    className?: string;
    children: ReactNode;
}

function PostsWrapper({ className, children }: PostsWrapperProps) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

const StyledPostsWrapper = styled(PostsWrapper)`
    display:flex;
    flex-flow: column nowrap;
    align-items:center;
    overflow-y: auto;
    height: 400px;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background-color: #ffffff90;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ffffff;
        border-radius: 2px;
    }
`

export { StyledPostsWrapper as PostsWrapper }