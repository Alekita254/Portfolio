import React from 'react'
import identity from '../../config/identity';

function BootingScreen(props) {

    return (
        <div style={(props.visible || props.isShutDown ? { zIndex: "100" } : { zIndex: "-20" })} className={(props.visible || props.isShutDown ? " visible opacity-100" : " invisible opacity-0 ") + " absolute duration-500 select-none flex flex-col justify-around items-center top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen bg-black"}>
            <div className="text-center text-white px-4">
                <div className="text-3xl md:text-5xl font-semibold tracking-wide">{identity.osName}</div>
                <div className="text-sm md:text-base text-gray-300 mt-2">You are exploring Alex Murimi's development workstation.</div>
            </div>
            <div className="w-10 h-10 flex justify-center items-center rounded-full outline-none cursor-pointer" onClick={props.turnOn} >
                {(props.isShutDown
                    ? <div className="bg-white rounded-full flex justify-center items-center w-10 h-10 hover:bg-gray-300"><img width="32px" height="32px" className="w-8" src="./themes/Yaru/status/power-button.svg" alt="Power Button" /></div>
                    : <div className={"w-8 h-8 border-2 border-gray-500 border-t-white rounded-full " + (props.visible ? " animate-spin " : "")}></div>)}
            </div>
            <div className="text-gray-400 mb-4 text-sm">{identity.terminalPersona}</div>
        </div>
    )
}

export default BootingScreen
