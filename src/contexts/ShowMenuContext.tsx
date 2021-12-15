import { createContext, ReactNode, useState } from 'react'
import { Menu } from '../components/Menu'

type ShowMenuContextValue = {
    openMenu: (menuName: menusNames) => void;
}

const showMenuContext = createContext({} as ShowMenuContextValue)

type ShowMenuContextProviderProps = {
    children: ReactNode;
}

type menusNames = 'baseMenu'
const menusList = {
    baseMenu: <h1>Menu teste</h1>
}

function ShowMenuContextProvider({ children }: ShowMenuContextProviderProps) {
    const [showMenu, setShowMenu] = useState(false)
    const [menuContent, setMenuContent] = useState<ReactNode>()

    function openMenu(menuName: menusNames) {
        setMenuContent(menusList[menuName])
        setShowMenu(true)
    }


    return (
        <showMenuContext.Provider value={{ openMenu }}>
            <>
                {showMenu && (
                    <Menu close={() => setShowMenu(false)} >
                        {menuContent}
                    </Menu>

                )}
                {children}
            </>
        </showMenuContext.Provider>
    )
}

export { showMenuContext, ShowMenuContextProvider }