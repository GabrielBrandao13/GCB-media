import styled from 'styled-components'

type UserPostProps = {
    className?: string;
    text: string;
    imageUrl: string;
    date: string;
}

function UserPost({ className, text, imageUrl, date }: UserPostProps) {
    const paragraphs = text.split('\n')

    const fmtDate = new Date(date)

    return (
        <div className={className}>
            <img src={imageUrl} alt="" />
            {paragraphs.map(paragraph => (
                <p>{paragraph}</p>
            ))}
            <div className="date">{fmtDate.getDate()}/{fmtDate.getMonth()}/{fmtDate.getFullYear()}</div>
        </div>
    )
}

const StyledUserPost = styled(UserPost)`
    background:white;
    border-radius: 5px;
    padding: 10px;
    color:rgb(11, 11, 11);
    width: 80%;

    p{
        margin: 1px;
    }
    div.date{
        margin-top: 3px;
        color: rgb(46, 46, 46);
        text-align: right;
    }
`



export { StyledUserPost as UserPost }