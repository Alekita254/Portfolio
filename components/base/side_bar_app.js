import React, { Component } from "react";

export class SideBarApp extends Component {
    constructor() {
        super();
        this.id = null;
        this.state = {
            showTitle: false,
            scaleImage: false,
        };
    }

    componentDidMount() {
        this.id = this.props.id;
    }

    scaleImage = () => {
        setTimeout(() => {
            this.setState({ scaleImage: false });
        }, 1000);
        this.setState({ scaleImage: true });
    }

    openApp = () => {
        if (!this.props.isMinimized[this.id] && this.props.isClose[this.id]) {
            this.scaleImage();
        }
        this.props.openApp(this.id);
        this.setState({ showTitle: false });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.openApp();
        }
    }

    render() {
        return (
            <div
                tabIndex="0"
                onClick={this.openApp}
                onKeyDown={this.handleKeyDown}
                onMouseEnter={() => {
                    this.setState({ showTitle: true });
                }}
                onMouseLeave={() => {
                    this.setState({ showTitle: false });
                }}
                className={(this.props.isClose[this.id] === false && this.props.isFocus[this.id] ? "bg-white bg-opacity-10 " : "") + " w-auto p-2.5 outline-none relative transition hover:bg-white hover:bg-opacity-10 rounded m-1 shrink-0"}
                id={"sidebar-" + this.props.id}
                role="button"
                aria-label={this.props.title}
            >
                <img width="28px" height="28px" className="w-7" src={this.props.icon} alt="Alex OS App Icon" />
                <img className={(this.state.scaleImage ? " scale " : "") + " scalable-app-icon w-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"} src={this.props.icon} alt="" />
                {
                    (
                        this.props.isClose[this.id] === false
                            ? <div className="absolute bottom-0 left-1/2 h-1 w-4 -translate-x-1/2 rounded-sm bg-ub-orange lg:left-0 lg:top-1/2 lg:h-1 lg:w-1 lg:-translate-x-0 lg:-translate-y-1/2"></div>
                            : null
                    )
                }
                <div
                    className={
                        (this.state.showTitle ? " visible " : " invisible ") +
                        " hidden lg:block w-max py-0.5 px-1.5 absolute top-1.5 left-full ml-3 m-1 text-ubt-grey text-opacity-90 text-sm bg-ub-grey bg-opacity-70 border-gray-400 border border-opacity-40 rounded-md"
                    }
                >
                    {this.props.title}
                </div>
            </div>
        );
    }
}

export default SideBarApp;
