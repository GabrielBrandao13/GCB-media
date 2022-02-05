import styled, { keyframes } from 'styled-components';
import { ReactNode } from 'react';

import { Root, Content, Trigger, Overlay, Portal } from '@radix-ui/react-dialog';

const StyledContent = styled(Content)`
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const overlayFadeIn = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`

const StyledOverlay = styled(Overlay)`
    background: rgba(0, 0, 0, .3);
    inset:0;
    position:fixed;
    animation: ${overlayFadeIn} .3s;
`

const StyledButton = styled.button`
    font-size: 12pt;
    border:none;
    border-radius: 4px;
    background:rgb(70, 10, 211);
    cursor:pointer;
    color:white;
    padding: 3px;
`

type MenuProps = {
    children: ReactNode;
    buttonTitle: string;
    buttonClassName: string;
}

function Menu({ children, buttonTitle, buttonClassName }: MenuProps) {
    return (
        <Root>
            <Trigger asChild>
                <button className={buttonClassName}>
                    {buttonTitle}
                </button>
            </Trigger>
            <Portal>
                <StyledOverlay />
                <StyledContent>
                    {children}
                </StyledContent>
            </Portal>
        </Root>
    )
}

export { Menu }