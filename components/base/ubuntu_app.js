import React, { Component } from 'react'

export class UbuntuApp extends Component {

    openApp = () => {
        if (this.props.isExternalApp && this.props.url) {
            window.open(this.props.url, "_blank");
        } else {
            this.props.openApp(this.props.id);
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.openApp();
        }
    }

    render() {
        return (
            <div
                className={"p-1 m-px z-10 bg-white bg-opacity-0 hover:bg-opacity-20 focus:bg-ub-orange focus:bg-opacity-40 focus:border-yellow-700 focus:border-opacity-100 border border-transparent outline-none rounded select-none flex flex-col justify-start items-center text-center text-xs font-normal text-white relative " + (this.props.showDescription ? "w-full min-h-[7rem] h-auto px-3 py-3 items-start text-left" : "w-24 h-20")}
                id={"app-" + this.props.id}
                onDoubleClick={this.openApp}
                onKeyDown={this.handleKeyDown}
                tabIndex={0}
                role="button"
                aria-label={this.props.description ? `${this.props.name}. ${this.props.description}` : this.props.name}
            >
                <div className={"relative " + (this.props.showDescription ? "flex items-start gap-3 w-full" : "") }>
                    <img width="40px" height="40px" className="mb-1 w-10" src={this.props.icon} alt={"Alex OS " + this.props.name} />
                    {this.props.isExternalApp && (
                        <img 
                            src="./themes/Yaru/status/arrow-up-right.svg" 
                            alt="External Link" 
                            className="w-2.5 h-2.5 absolute -bottom-0.5 -right-0.5"
                        />
                    )}
                    {this.props.showDescription ? (
                        <div className="min-w-0 pt-0.5">
                            <div className="font-medium text-sm text-white">{this.props.name}</div>
                            <div className="mt-1 text-xs leading-5 text-gray-300">{this.props.description}</div>
                        </div>
                    ) : null}
                </div>
                {!this.props.showDescription ? this.props.name : null}
            </div>
        )
    }
}

export default UbuntuApp
