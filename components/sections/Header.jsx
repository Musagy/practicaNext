import React from "react"
import Image from "next/image"
import MainMenu from "../nav/MainMenu"

const HeaderMain = () => (
  <header>
    <div className="logo">
      <img src="https://ed.team/static/images/logo/isotipo-color.svg" alt="logo" width={50} />
      {/* <Image
        src='/static/images/logo/isotipo-color.svg' alt="logo"
        width="50"
        height="50" /> */}
    </div>
    <MainMenu />
  </header>
)

export default HeaderMain