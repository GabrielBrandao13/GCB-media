import styled from 'styled-components';
import { ReactNode } from 'react';

import { Root, Content, Trigger, Overlay, Portal } from '@radix-ui/react-dialog';

const StyledContent = styled(Content)`
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const StyledOverlay = styled(Overlay)`
    background: rgba(0, 0, 0, .3);
    inset:0;
    position:fixed;
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
}

function Menu({ children, buttonTitle }: MenuProps) {
    return (
        <Root>
            <Trigger asChild>
                <StyledButton>

                    {buttonTitle}
                </StyledButton>
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