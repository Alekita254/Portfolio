import React from 'react'
import identity from '../../config/identity';

export default function BackgroundImage(props) {
    const bg_images = {
        "wall-0": "./images/wallpapers/wall-0.webp",
        "wall-1": "./images/wallpapers/wall-1.webp",
        "wall-2": "./images/wallpapers/wall-2.webp",
        "wall-3": "./images/wallpapers/wall-3.webp",
        "wall-4": "./images/wallpapers/wall-4.webp",
        "wall-5": "./images/wallpapers/wall-5.webp",
        "wall-6": "./images/wallpapers/wall-6.webp",
        "wall-7": "./images/wallpapers/wall-7.webp",
        "wall-8": "./images/wallpapers/wall-8.webp",
    };
    const selectedImage = bg_images[props.img] || bg_images["wall-0"];

    return (
        <div style={{ backgroundImage: `url(${selectedImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPositionX: "center" }} className="bg-ubuntu-img absolute -z-10 top-0 right-0 overflow-hidden h-full w-full">
            <div className="absolute inset-0 bg-black bg-opacity-35"></div>
            <div className="desktop-identity absolute right-6 bottom-8 text-right text-white text-opacity-90 pointer-events-none select-none">
                <div className="text-2xl md:text-4xl font-semibold tracking-[0.3em] uppercase">{identity.osName}</div>
                <div className="mt-2 text-xs md:text-sm text-gray-300">{identity.terminalPersona}</div>
            </div>
        </div>
    )
}
