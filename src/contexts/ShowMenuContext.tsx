import { createContext, ReactNode, useState } from 'react'
import { Menu } from '../components/Menu'
import { DeleteUserMenu } from '../components/Menu/Menus'

type ShowMenuContextValue = {
    openMenu: (menuName: menusNames) => void;
}

const showMenuContext = createContext({} as ShowMenuContextValue)

type ShowMenuContextProviderProps = {
    children: ReactNode;
}

type menusNames = 'deleteUserMenu'
const menusList = {
    deleteUserMenu: DeleteUserMenu
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