import React, { useState } from 'react'
import SideBarApp from '../base/side_bar_app';

let renderApps = (props) => {
    let sideBarAppsJsx = [];
    props.apps.forEach((app, index) => {
        if (props.favourite_apps[app.id] === false) return;
        sideBarAppsJsx.push(
            <SideBarApp key={index} id={app.id} title={app.title} icon={app.icon} isClose={props.closed_windows} isFocus={props.focused_windows} openApp={props.openAppByAppId} isMinimized={props.isMinimized} openFromMinimised={props.openFromMinimised} />
        );
    });
    return sideBarAppsJsx;
}

export default function SideBar(props) {

    function showSideBar() {
        props.hideSideBar(null, false);
    }

    function hideSideBar() {
        setTimeout(() => {
            props.hideSideBar(null, true);
        }, 2000);
    }

    return (
        <>
            <div className={(props.hide ? " lg:-translate-x-full " : "") + " absolute transform duration-300 select-none z-40 left-0 right-0 bottom-0 h-16 px-2 flex flex-row justify-start items-center overflow-x-auto border-t border-black border-opacity-60 bg-black bg-opacity-70 backdrop-blur-sm lg:left-0 lg:top-0 lg:right-auto lg:bottom-auto lg:h-full lg:w-auto lg:px-0 lg:pt-7 lg:overflow-visible lg:border-t-0 lg:border-r lg:bg-black lg:bg-opacity-50 lg:flex-col"}>
                {
                    (
                        Object.keys(props.closed_windows).length !== 0
                            ? renderApps(props)
                            : null
                    )
                }
                <AllApps showApps={props.showAllApps} />
            </div>
            <div onMouseEnter={showSideBar} onMouseLeave={hideSideBar} className={"hidden lg:block w-1 h-full absolute top-0 left-0 bg-transparent z-50"}></div>
        </>
    )
}

export function AllApps(props) {

    const [title, setTitle] = useState(false);

    return (
        <div
            className={`w-11 h-11 rounded m-1 hover:bg-white hover:bg-opacity-10 flex items-center justify-center lg:mt-auto`}
            onMouseEnter={() => {
                setTitle(true);
            }}
            onMouseLeave={() => {
                setTitle(false);
            }}
            onClick={props.showApps}
        >
            <div className="relative">
                <img width="28px" height="28px" className="w-7" src="./themes/Yaru/system/view-app-grid-symbolic.svg" alt="Alex OS application launcher" />
                <div
                    className={
                        (title ? " visible " : " invisible ") +
                        " hidden lg:block w-max py-0.5 px-1.5 absolute top-1 left-full ml-5 text-ubt-grey text-opacity-90 text-sm bg-ub-grey bg-opacity-70 border-gray-400 border border-opacity-40 rounded-md"
                    }
                >
                    Alex OS Applications
                </div>
            </div>
        </div>
    );
}