import React from 'react';
import UbuntuApp from '../base/ubuntu_app';
import identity from '../../config/identity';

export class AllApplications extends React.Component {
    constructor() {
        super();
        this.state = {
            query: "",
            apps: [],
            category: 0,
        }
    }

    componentDidMount() {
        this.setState({
            apps: this.props.apps,
        })
    }

    handleChange = (e) => {
        const query = e.target.value;
        this.setState({
            query,
            apps: query === "" || query === null
                ? this.props.apps
                : this.props.apps.filter((app) => app.title.toLowerCase().includes(query.toLowerCase())),
        })
    }

    getFrequentApps = () => {
        const frequentAppsInfo = JSON.parse(localStorage.getItem("frequentApps"));
        let frequentApps = [];

        if (frequentAppsInfo) {
            frequentAppsInfo.forEach((appInfo) => {
                const app = this.props.apps.find((item) => item.id === appInfo.id);
                if (app) {
                    frequentApps.push(app);
                }
            });
        }

        return frequentApps;
    }

    renderApps = () => {
        const apps = this.state.category === 0 ? [...this.state.apps] : this.getFrequentApps();

        return apps.map((app, index) => (
            <UbuntuApp
                key={index}
                id={app.id}
                name={app.title}
                description={app.description}
                icon={app.icon}
                openApp={this.props.openApp}
                showDescription={true}
            />
        ));
    }

    handleSwitch = (category) => {
        if (category !== this.state.category) {
            this.setState({ category });
        }
    }

    render() {
        return (
            <div className="absolute top-7 h-full w-full z-20 border-black border-opacity-60 bg-black bg-opacity-85 px-4 md:px-10 xl:px-20">
                <div className="pt-5 text-center text-white">
                    <div className="text-xs uppercase tracking-[0.25em] text-gray-400">{identity.osName}</div>
                    <div className="mt-2 text-xl font-semibold">Alex OS Applications</div>
                </div>
                <div className="flex justify-center pt-5">
                    <div className="flex h-full w-full max-w-2xl items-center overflow-hidden rounded-xl border-black bg-white bg-opacity-95 pl-2 pr-2 md:w-2/3">
                        <img className="h-5 w-5" alt="search icon" src={'./images/logos/search.png'} />
                        <input
                            className="w-full bg-transparent p-2 text-black focus:outline-none"
                            placeholder="Search Alex Murimi's applications"
                            value={this.state.query}
                            onChange={this.handleChange}
                            aria-label="Search Alex OS applications"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 pb-24 pt-8 md:grid-cols-2 xl:grid-cols-3">
                    {this.renderApps()}
                </div>
                <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-black to-transparent pb-4">
                    <button type="button" className="w-1/4 max-w-40 cursor-pointer bg-transparent text-center text-white" onClick={this.handleSwitch.bind(this, 1)}>
                        <h4>Frequent</h4>
                        {this.state.category === 1 ? <div className="mt-1 h-1 self-center bg-ub-orange" /> : <div className="mt-1 h-1 bg-transparent" />}
                    </button>
                    <button type="button" className="w-1/4 max-w-40 cursor-pointer bg-transparent text-center text-white" onClick={this.handleSwitch.bind(this, 0)}>
                        <h4>All</h4>
                        {this.state.category === 0 ? <div className="mt-1 h-1 self-center bg-ub-orange" /> : <div className="mt-1 h-1 bg-transparent" />}
                    </button>
                </div>
            </div>
        )
    }
}

export default AllApplications;
