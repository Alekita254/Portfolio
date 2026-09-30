import React, { Component } from 'react';
import Clock from '../util components/clock';
import Status from '../util components/status';
import StatusCard from '../util components/status_card';
import identity from '../../config/identity';

export default class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			status_card: false
		};
	}

	render() {
		return (
			<div className="main-navbar-vp absolute top-0 right-0 w-screen shadow-md flex flex-nowrap justify-between items-center bg-ub-grey text-ubt-grey text-sm select-none z-50 border-b border-white border-opacity-10 px-1 sm:px-0">
				<div
					tabIndex="0"
					className={
						'pl-2 pr-2 sm:pl-3 sm:pr-3 outline-none transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange py-1 text-[10px] sm:text-xs md:text-sm tracking-[0.24em] uppercase '
					}
				>
					{identity.osName}
				</div>
				<div className="hidden lg:block text-xs text-gray-400">{identity.machineName}</div>
				<div
					tabIndex="0"
					className={
						'pl-2 pr-2 text-xs md:text-sm outline-none transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange py-1'
					}
				>
					<span className="sm:hidden"><Clock onlyTime={true} /></span>
					<span className="hidden sm:inline"><Clock /></span>
				</div>
				<div className="flex items-center gap-1 sm:gap-2 pr-2 sm:pr-3">
					<div className="hidden xl:block text-xs text-gray-400">{identity.terminalPersona}</div>
					<div
						id="status-bar"
						tabIndex="0"
						onFocus={() => {
							this.setState({ status_card: true });
						}}
						className={
							'relative pr-1 pl-1 outline-none transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange py-1 '
						}
					>
						<Status />
					<StatusCard
						shutDown={this.props.shutDown}
						lockScreen={this.props.lockScreen}
						visible={this.state.status_card}
						toggleVisible={() => {
							// this prop is used in statusCard component in handleClickOutside callback using react-onclickoutside
							this.setState({ status_card: false });
						}}
					/>
					</div>
				</div>
			</div>
		);
	}
}
