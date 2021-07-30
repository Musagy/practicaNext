import React, {createRef} from "react"
import Link from "next/link"

const menu = createRef()
const toggleMenu = () => {
    menu.current.classList.toggle("show")
}

const MainMenu = () => (
    <div className="s-grid-1 lg-cols-3 s-cross-center s-main-end header-links">
        <nav className="main-menu" ref={menu}>
            <ul>
                <li><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/about"><a>About</a></Link></li>
            </ul>
        </nav>
        <div 
            className="main-menu-toggle to-l"
            onClick={() => toggleMenu()}
            >
        </div>
    </div>
)

export default MainMenu