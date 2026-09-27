import React from 'react'
import identity from '../../config/identity';

function DefaultMenu(props) {
    return (
        <div id="default-menu" className={(props.active ? " block " : " hidden ") + " cursor-default w-52 context-menu-bg border text-left border-gray-900 rounded text-white py-4 absolute z-50 text-sm"}>
            <div className="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">🖥️</span> <span className="ml-2">{identity.osName}</span>
            </div>
            <Devider />
            <a rel="noreferrer noopener" href={identity.github} target="_blank" className="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">🤝</span> <span className="ml-2">Follow on <strong>Github</strong></span>
            </a>
            <a rel="noreferrer noopener" href={`mailto:${identity.email}`} target="_blank" className="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">📥</span> <span className="ml-2">Contact</span>
            </a>
            <a rel="noreferrer noopener" href={identity.resumePath} target="_blank" className="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">📄</span> <span className="ml-2">Open Resume</span>
            </a>
            <Devider />
            <div onClick={() => { localStorage.clear(); window.location.reload() }} className="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">🧹</span> <span className="ml-2">Reset {identity.osName}</span>
            </div>
        </div>
    )
}

function Devider() {
    return (
        <div className="flex justify-center w-full">
            <div className=" border-t border-gray-900 py-1 w-2/5"></div>
        </div>
    );
}

export default DefaultMenu
