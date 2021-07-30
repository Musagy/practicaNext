import React from "react"
import Image from "next/image"
import MainMenu from "../nav/MainMenu"
import Link from "next/link"

const HeaderMain = () => (
  <header className="main-header">
    <div className="ed-grid s-grid-5 lg-grid-4">
      <div className="s-cols-4 lg-cols-1 s-cross-center">
        <Link href="/">
          <a className="s-mr-1 s-mb-0 s-cross-center s-main-center">
            {/* <img src="https://ed.team/static/images/logo/isotipo-color.svg" alt="logo" width={50} className="main-logo" /> */}
            <Image
              src="https://ed.team/static/images/logo/isotipo-color.svg" alt="logo" width={50} height={50} />
          </a>
        </Link>
      </div>
        <MainMenu />
    </div>
  </header>
)

export default HeaderMain