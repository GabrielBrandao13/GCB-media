import { ReactNode } from 'react';
import styled from 'styled-components';

type ModalProps = {
    close: () => void;
    className?: string;
    children: ReactNode;
}


function Menu({ close, className, children }: ModalProps) {
    return (
        <div className={className}>
            <div className="inner">
                <div className="options">
                    <button onClick={close}>Fechar</button>
                </div>

                {children}
            </div>
        </div>
    )
}

const StyledMenu = styled(Menu)`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .2);
    backdrop-filter: blur(3px);

    .inner{
        width: 100%;
        max-width: 500px;
        height: 400px;
        background:white;

        .options{
            display:flex;
            flex-flow: row nowrap;
            align-items:center;
            justify-content:flex-end;
        }
    }
`

export { StyledMenu as Menu }