import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import Navbarmain from '../Navbarmain';
import Navmobile from '../Navbarmobile';

function Navbar() {
    const [screenwidth, setscreenwidth] = useState(window.innerWidth)
    useEffect(() => {
        window.addEventListener("resize", () => {
            setscreenwidth(window.innerWidth)
        })
    }, [])
    return (
        <>
            {
                screenwidth >= 768 ? <Navbarmain /> : <Navmobile />
            }
        </>
    )

}

export default Navbar