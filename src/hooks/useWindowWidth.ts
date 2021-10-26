import { useState, useEffect, useCallback } from "react"

export const useWindowWidth = (width: number) => {
    const widthState = window.innerWidth >= width ? true : false
    const [windowWidth, setWindowWidth] = useState<boolean>(widthState)

    const updateWindowWidth = useCallback(() => {
        if (window.innerWidth >= width) {
            setWindowWidth(true)
        } else {
            setWindowWidth(false)
        }
    }, [width])

    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth)
        return () => {
            window.removeEventListener('resize', updateWindowWidth)
        }
    }, [updateWindowWidth])

    return windowWidth
}