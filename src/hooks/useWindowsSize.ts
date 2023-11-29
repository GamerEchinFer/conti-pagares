import { MutableRefObject, useEffect, useState } from "react";
export const useWindowSize = (parentRef: MutableRefObject<any>) => {
    const [windowHeight, setWindowHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getRestantHeight = (pixelsToSubstract?: number): number => {
        const parentElementOffsetHeight = parentRef.current?.offsetTop ?? 0;
        const restantHeight = windowHeight - parentElementOffsetHeight - (pixelsToSubstract ?? 0);
        return restantHeight;
    };
    const getRestantHeightPx = (pixelsToSubstract?: number): string => {
        return getRestantHeight(pixelsToSubstract) + "px";
    }
    return {
        windowHeight,
        windowWidth,
        getRestantHeight,
        getRestantHeightPx
    }
}