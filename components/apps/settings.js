import React from 'react';
import $ from 'jquery';
import identity from '../../config/identity';

export function Settings(props) {
    const wallpapers = {
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

    let changeBackgroundImage = (e) => {
        const path = $(e.currentTarget).data("path");
        if (path) {
            props.changeBackgroundImage(path);
        }
    }

    const applyMotionPreference = (mode) => {
        localStorage.setItem('alex-os-motion', mode);
        document.documentElement.setAttribute('data-motion', mode);
    };

    const replayIntro = () => {
        localStorage.removeItem('alex-os-intro-seen');
        localStorage.removeItem('booting_screen');
        window.location.reload();
    };

    const handleWallpaperKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            changeBackgroundImage(e);
        }
    }

    return (
        <div className={"w-full flex-col flex-grow z-20 max-h-full overflow-y-auto windowMainScreen select-none bg-ub-cool-grey"}>
            <div className="px-4 py-4 border-b border-white border-opacity-10">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-300">System</div>
                <div className="mt-2 text-sm text-white">{identity.osName} v{identity.osVersion}</div>
                <div className="text-xs text-gray-300 mt-1">{identity.userName} • {identity.machineName}</div>
            </div>
            <div className="px-4 pt-4">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-300">Appearance</div>
                <div className="mt-2 text-sm text-gray-200">Dark mode: Always dark</div>
            </div>
            <div className=" md:w-2/5 w-2/3 h-1/3 m-auto my-4" style={{ backgroundImage: `url(${wallpapers[props.currBgImgName]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
            </div>
            <div className="flex flex-wrap justify-center items-center border-t border-gray-900">
                {
                    Object.keys(wallpapers).map((name, index) => {
                        return (
                            <div
                                key={index}
                                role="button"
                                aria-label={`Set wallpaper ${name}`}
                                tabIndex="0"
                                onClick={changeBackgroundImage}
                                onKeyDown={handleWallpaperKeyDown}
                                data-path={name}
                                className={((name === props.currBgImgName) ? " border-yellow-700 " : " border-transparent ") + " md:px-28 md:py-20 md:m-4 m-2 px-14 py-10 outline-none border-4 border-opacity-80"}
                                style={{ backgroundImage: `url(${wallpapers[name]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}
                            ></div>
                        );
                    })
                }
            </div>
            <div className="px-4 py-4 border-t border-white border-opacity-10 space-y-4">
                <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-300">Motion</div>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm">
                        <button type="button" className="rounded border border-white border-opacity-20 px-3 py-1.5 hover:bg-white hover:bg-opacity-10" onClick={() => applyMotionPreference('system')}>
                            Follow system preference
                        </button>
                        <button type="button" className="rounded border border-white border-opacity-20 px-3 py-1.5 hover:bg-white hover:bg-opacity-10" onClick={() => applyMotionPreference('reduced')}>
                            Reduced motion
                        </button>
                        <button type="button" className="rounded border border-white border-opacity-20 px-3 py-1.5 hover:bg-white hover:bg-opacity-10" onClick={() => applyMotionPreference('full')}>
                            Full motion
                        </button>
                    </div>
                </div>
                <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-300">Experience</div>
                    <button type="button" className="mt-2 rounded border border-white border-opacity-20 px-3 py-1.5 text-sm hover:bg-white hover:bg-opacity-10" onClick={replayIntro}>
                        Replay workspace intro
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Settings


export const displaySettings = () => {
    return <Settings> </Settings>;
}
