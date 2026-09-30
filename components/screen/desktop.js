import React, { Component } from 'react';
import BackgroundImage from '../util components/background-image';
import SideBar from './side_bar';
import apps from '../../apps.config';
import Window from '../base/window';
import UbuntuApp from '../base/ubuntu_app';
import AllApplications from '../screen/all-applications'
import DesktopMenu from '../context menus/desktop-menu';
import DefaultMenu from '../context menus/default';
import $ from 'jquery';
import ReactGA from 'react-ga4';
import identity from '../../config/identity';

export class Desktop extends Component {
    constructor() {
        super();
        this.app_stack = [];
        this.initFavourite = {};
        this.allWindowClosed = false;
        this.state = {
            focused_windows: {},
            closed_windows: {},
            allAppsView: false,
            overlapped_windows: {},
            disabled_apps: {},
            favourite_apps: {},
            hideSideBar: false,
            minimized_windows: {},
            desktop_apps: [],
            context_menus: {
                desktop: false,
                default: false,
            },
            showNameBar: false,
            showShortcuts: false,
            notifications: [],
        }
    }

    componentDidMount() {
        // google analytics
        ReactGA.send({ hitType: "pageview", page: "/desktop", title: "Custom Title" });

        this.fetchAppsData();
        this.setContextListeners();
        this.setEventListeners();
        this.setKeyboardListeners();
        window.addEventListener('alex-os:desktop-action', this.handleDesktopAction);
        this.checkForNewFolders();
        this.showNotification(identity.osName, 'Welcome to the workstation.');
    }

    componentWillUnmount() {
        this.removeContextListeners();
        this.removeEventListeners();
        this.removeKeyboardListeners();
        window.removeEventListener('alex-os:desktop-action', this.handleDesktopAction);
    }

    checkForNewFolders = () => {
        var new_folders = localStorage.getItem('new_folders');
        if (new_folders === null && new_folders !== undefined) {
            localStorage.setItem("new_folders", JSON.stringify([]));
        }
        else {
            new_folders = JSON.parse(new_folders);
            new_folders.forEach(folder => {
                apps.push({
                    id: `new-folder-${folder.id}`,
                    title: folder.name,
                    icon: './themes/Yaru/system/folder.png',
                    disabled: true,
                    favourite: false,
                    desktop_shortcut: true,
                    screen: () => { },
                });
            });
            this.updateAppsData();
        }
    }

    setEventListeners = () => {
        this.settingsTrigger = document.getElementById("open-settings");
        if (this.settingsTrigger) {
            this.settingsClickHandler = () => this.openApp("settings");
            this.settingsTrigger.addEventListener("click", this.settingsClickHandler);
        }
    }

    removeEventListeners = () => {
        if (this.settingsTrigger && this.settingsClickHandler) {
            this.settingsTrigger.removeEventListener("click", this.settingsClickHandler);
        }
    }

    setKeyboardListeners = () => {
        window.addEventListener('keydown', this.handleGlobalKeyDown);
    }

    removeKeyboardListeners = () => {
        window.removeEventListener('keydown', this.handleGlobalKeyDown);
    }

    showNotification = (title, message) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        this.setState((prev) => ({
            notifications: [...prev.notifications, { id, title, message }].slice(-3)
        }));
        window.setTimeout(() => {
            this.setState((prev) => ({ notifications: prev.notifications.filter((item) => item.id !== id) }));
        }, 2600);
    }

    handleDesktopAction = (event) => {
        const action = event?.detail?.action;
        if (!action) return;

        if (action === 'about-system') {
            this.showNotification(identity.osName, `${identity.userName} • ${identity.machineName} • v${identity.osVersion}`);
            this.openApp('about');
            return;
        }

        if (action === 'show-shortcuts') {
            this.setState({ showShortcuts: true });
            return;
        }

        if (action === 'restart-experience') {
            localStorage.removeItem('booting_screen');
            localStorage.removeItem('screen-locked');
            localStorage.removeItem('shut-down');
            this.showNotification(identity.osName, 'Restarting experience...');
            window.setTimeout(() => window.location.reload(), 120);
            return;
        }

        if (action === 'skip-intro') {
            localStorage.setItem('alex-os-intro-seen', 'true');
            this.showNotification(identity.osName, 'Intro will be skipped on next visit.');
        }
    }

    cycleOpenWindows = () => {
        const openWindows = this.app_stack.filter((id) => this.state.closed_windows[id] === false && !this.state.minimized_windows[id]);
        if (openWindows.length <= 1) return;
        const focusedId = openWindows.find((id) => this.state.focused_windows[id]);
        const activeIndex = openWindows.indexOf(focusedId);
        const nextId = openWindows[(activeIndex + 1) % openWindows.length];
        if (nextId) {
            this.focus(nextId);
        }
    }

    handleGlobalKeyDown = (event) => {
        const isMetaK = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
        const isMetaTerminal = (event.ctrlKey || event.metaKey) && event.key === '`';
        const isAltTab = event.altKey && event.key === 'Tab';

        if (isMetaK) {
            event.preventDefault();
            this.setState((prev) => ({ allAppsView: !prev.allAppsView, showShortcuts: false }));
            return;
        }

        if (event.key === 'Escape') {
            this.setState({ allAppsView: false, showShortcuts: false }, this.hideAllContextMenu);
            return;
        }

        if (isMetaTerminal) {
            event.preventDefault();
            this.openApp('terminal');
            return;
        }

        if (isAltTab) {
            event.preventDefault();
            this.cycleOpenWindows();
        }
    }

    setContextListeners = () => {
        document.addEventListener('contextmenu', this.checkContextMenu);
        // on click, anywhere, hide all menus
        document.addEventListener('click', this.hideAllContextMenu);
    }

    removeContextListeners = () => {
        document.removeEventListener("contextmenu", this.checkContextMenu);
        document.removeEventListener("click", this.hideAllContextMenu);
    }

    checkContextMenu = (e) => {
        e.preventDefault();
        this.hideAllContextMenu();
        switch (e.target.dataset.context) {
            case "desktop-area":
                ReactGA.event({
                    category: `Context Menu`,
                    action: `Opened Desktop Context Menu`
                });
                this.showContextMenu(e, "desktop");
                break;
            default:
                ReactGA.event({
                    category: `Context Menu`,
                    action: `Opened Default Context Menu`
                });
                this.showContextMenu(e, "default");
        }
    }

    showContextMenu = (e, menuName /* context menu name */) => {
        let { posx, posy } = this.getMenuPosition(e);
        let contextMenu = document.getElementById(`${menuName}-menu`);

        if (posx + $(contextMenu).width() > window.innerWidth) posx -= $(contextMenu).width();
        if (posy + $(contextMenu).height() > window.innerHeight) posy -= $(contextMenu).height();

        posx = posx.toString() + "px";
        posy = posy.toString() + "px";

        contextMenu.style.left = posx;
        contextMenu.style.top = posy;

        this.setState({ context_menus: { ...this.state.context_menus, [menuName]: true } });
    }

    hideAllContextMenu = () => {
        let menus = this.state.context_menus;
        Object.keys(menus).forEach(key => {
            menus[key] = false;
        });
        this.setState({ context_menus: menus });
    }

    getMenuPosition = (e) => {
        var posx = 0;
        var posy = 0;

        if (!e) e = window.event;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }
        return {
            posx, posy
        }
    }

    fetchAppsData = () => {
        let focused_windows = {}, closed_windows = {}, disabled_apps = {}, favourite_apps = {}, overlapped_windows = {}, minimized_windows = {};
        let desktop_apps = [];
        apps.forEach((app) => {
            focused_windows = {
                ...focused_windows,
                [app.id]: false,
            };
            closed_windows = {
                ...closed_windows,
                [app.id]: true,
            };
            disabled_apps = {
                ...disabled_apps,
                [app.id]: app.disabled,
            };
            favourite_apps = {
                ...favourite_apps,
                [app.id]: app.favourite,
            };
            overlapped_windows = {
                ...overlapped_windows,
                [app.id]: false,
            };
            minimized_windows = {
                ...minimized_windows,
                [app.id]: false,
            }
            if (app.desktop_shortcut) desktop_apps.push(app.id);
        });
        this.setState({
            focused_windows,
            closed_windows,
            disabled_apps,
            favourite_apps,
            overlapped_windows,
            minimized_windows,
            desktop_apps
        });
        this.initFavourite = { ...favourite_apps };
    }

    updateAppsData = () => {
        let focused_windows = {}, closed_windows = {}, favourite_apps = {}, minimized_windows = {}, disabled_apps = {};
        let desktop_apps = [];
        apps.forEach((app) => {
            focused_windows = {
                ...focused_windows,
                [app.id]: ((this.state.focused_windows[app.id] !== undefined || this.state.focused_windows[app.id] !== null) ? this.state.focused_windows[app.id] : false),
            };
            minimized_windows = {
                ...minimized_windows,
                [app.id]: ((this.state.minimized_windows[app.id] !== undefined || this.state.minimized_windows[app.id] !== null) ? this.state.minimized_windows[app.id] : false)
            };
            disabled_apps = {
                ...disabled_apps,
                [app.id]: app.disabled
            };
            closed_windows = {
                ...closed_windows,
                [app.id]: ((this.state.closed_windows[app.id] !== undefined || this.state.closed_windows[app.id] !== null) ? this.state.closed_windows[app.id] : true)
            };
            favourite_apps = {
                ...favourite_apps,
                [app.id]: app.favourite
            }
            if (app.desktop_shortcut) desktop_apps.push(app.id);
        });
        this.setState({
            focused_windows,
            closed_windows,
            disabled_apps,
            minimized_windows,
            favourite_apps,
            desktop_apps
        });
        this.initFavourite = { ...favourite_apps };
    }

    renderDesktopApps = () => {
        if (Object.keys(this.state.closed_windows).length === 0) return;
        let appsJsx = [];
        apps.forEach((app, index) => {
            if (this.state.desktop_apps.includes(app.id)) {

                const props = {
                    name: app.title,
                    id: app.id,
                    icon: app.icon,
                    openApp: this.openApp,
                    isExternalApp: app.isExternalApp,
                    url: app.url
                }

                appsJsx.push(
                    <UbuntuApp key={index} {...props} />
                );
            }
        });
        return appsJsx;
    }

    renderNotifications = () => {
        if (!this.state.notifications.length) return null;

        return (
            <div className="absolute right-4 top-12 z-50 flex w-[calc(100vw-2rem)] max-w-72 flex-col gap-2 pointer-events-none">
                {this.state.notifications.map((item) => (
                    <div key={item.id} className="notification-toast rounded border border-white border-opacity-20 bg-black bg-opacity-70 px-3 py-2 text-sm text-gray-100 shadow-lg">
                        <div className="text-xs uppercase tracking-[0.2em] text-gray-300">{item.title}</div>
                        <div className="mt-1 text-xs text-gray-200">{item.message}</div>
                    </div>
                ))}
            </div>
        );
    }

    renderShortcutPanel = () => {
        if (!this.state.showShortcuts) return null;
        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4" role="dialog" aria-modal="true" aria-label="Keyboard Shortcuts">
                <div className="w-full max-w-lg rounded border border-white border-opacity-20 bg-ub-grey p-4 text-white shadow-xl">
                    <div className="text-xs uppercase tracking-[0.24em] text-gray-400">Keyboard Shortcuts</div>
                    <div className="mt-3 space-y-3 text-sm max-h-[70vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-white border-opacity-10 pb-2">
                            <span>Open application launcher</span>
                            <span className="text-gray-300">Ctrl/Cmd + K</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white border-opacity-10 pb-2">
                            <span>Open terminal</span>
                            <span className="text-gray-300">Ctrl/Cmd + `</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white border-opacity-10 pb-2">
                            <span>Switch open apps</span>
                            <span className="text-gray-300">Alt + Tab</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Close launcher or overlays</span>
                            <span className="text-gray-300">Esc</span>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button type="button" onClick={() => this.setState({ showShortcuts: false })} className="rounded border border-white border-opacity-20 px-3 py-1.5 text-sm hover:bg-white hover:bg-opacity-10">Close</button>
                    </div>
                </div>
            </div>
        );
    }

    renderWindows = () => {
        let windowsJsx = [];
        apps.forEach((app, index) => {
            if (this.state.closed_windows[app.id] === false) {

                const props = {
                    title: app.title,
                    id: app.id,
                    screen: app.screen,
                    addFolder: this.addToDesktop,
                    closed: this.closeApp,
                    openApp: this.openApp,
                    focus: this.focus,
                    isFocused: this.state.focused_windows[app.id],
                    hideSideBar: this.hideSideBar,
                    hasMinimised: this.hasMinimised,
                    minimized: this.state.minimized_windows[app.id],
                    changeBackgroundImage: this.props.changeBackgroundImage,
                    bg_image_name: this.props.bg_image_name,
                }

                windowsJsx.push(
                    <Window key={index} {...props} />
                )
            }
        });
        return windowsJsx;
    }

    hideSideBar = (objId, hide) => {
        if (hide === this.state.hideSideBar) return;

        if (objId === null) {
            if (hide === false) {
                this.setState({ hideSideBar: false });
            }
            else {
                for (const key in this.state.overlapped_windows) {
                    if (this.state.overlapped_windows[key]) {
                        this.setState({ hideSideBar: true });
                        return;
                    }  // if any window is overlapped then hide the SideBar
                }
            }
            return;
        }

        if (hide === false) {
            for (const key in this.state.overlapped_windows) {
                if (this.state.overlapped_windows[key] && key !== objId) return; // if any window is overlapped then don't show the SideBar
            }
        }

        let overlapped_windows = this.state.overlapped_windows;
        overlapped_windows[objId] = hide;
        this.setState({ hideSideBar: hide, overlapped_windows });
    }

    hasMinimised = (objId) => {
        let minimized_windows = this.state.minimized_windows;
        var focused_windows = this.state.focused_windows;

        // remove focus and minimise this window
        minimized_windows[objId] = true;
        focused_windows[objId] = false;
        this.setState({ minimized_windows, focused_windows });

        this.hideSideBar(null, false);

        this.giveFocusToLastApp();
    }

    giveFocusToLastApp = () => {
        // if there is atleast one app opened, give it focus
        if (!this.checkAllMinimised()) {
            for (const index in this.app_stack) {
                if (!this.state.minimized_windows[this.app_stack[index]]) {
                    this.focus(this.app_stack[index]);
                    break;
                }
            }
        }
    }

    checkAllMinimised = () => {
        let result = true;
        for (const key in this.state.minimized_windows) {
            if (!this.state.closed_windows[key]) { // if app is opened
                result = result & this.state.minimized_windows[key];
            }
        }
        return result;
    }

    openApp = (objId) => {

        // google analytics
        ReactGA.event({
            category: `Open App`,
            action: `Opened ${objId} window`
        });

        // if the app is disabled
        if (this.state.disabled_apps[objId]) return;

        if (this.state.minimized_windows[objId]) {
            // focus this app's window
            this.focus(objId);

            // set window's last position
            var r = document.querySelector("#" + objId);
            r.style.transform = `translate(${r.style.getPropertyValue("--window-transform-x")},${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;

            // tell childs that his app has been not minimised
            let minimized_windows = this.state.minimized_windows;
            minimized_windows[objId] = false;
            this.setState({ minimized_windows: minimized_windows });
            return;
        }

        //if app is already opened
        if (this.app_stack.includes(objId)) this.focus(objId);
        else {
            let closed_windows = this.state.closed_windows;
            let favourite_apps = this.state.favourite_apps;
            var frequentApps = localStorage.getItem('frequentApps') ? JSON.parse(localStorage.getItem('frequentApps')) : [];
            var currentApp = frequentApps.find(app => app.id === objId);
            if (currentApp) {
                frequentApps.forEach((app) => {
                    if (app.id === currentApp.id) {
                        app.frequency += 1; // increase the frequency if app is found 
                    }
                });
            } else {
                frequentApps.push({ id: objId, frequency: 1 }); // new app opened
            }

            frequentApps.sort((a, b) => {
                if (a.frequency < b.frequency) {
                    return 1;
                }
                if (a.frequency > b.frequency) {
                    return -1;
                }
                return 0; // sort according to decreasing frequencies
            });

            localStorage.setItem("frequentApps", JSON.stringify(frequentApps));

            setTimeout(() => {
                favourite_apps[objId] = true; // adds opened app to sideBar
                closed_windows[objId] = false; // openes app's window
                this.setState({ closed_windows, favourite_apps, allAppsView: false }, () => this.focus(objId));
                this.app_stack.push(objId);
                const openedApp = apps.find((app) => app.id === objId);
                if (openedApp) {
                    this.showNotification(openedApp.title, 'Application opened');
                }
            }, 180);
        }
    }

    closeApp = (objId) => {

        // remove app from the app stack
        this.app_stack.splice(this.app_stack.indexOf(objId), 1);

        this.giveFocusToLastApp();

        this.hideSideBar(null, false);

        // close window
        let closed_windows = this.state.closed_windows;
        let favourite_apps = this.state.favourite_apps;

        if (this.initFavourite[objId] === false) favourite_apps[objId] = false; // if user default app is not favourite, remove from sidebar
        closed_windows[objId] = true; // closes the app's window

        this.setState({ closed_windows, favourite_apps });
    }

    focus = (objId) => {
        // removes focus from all window and 
        // gives focus to window with 'id = objId'
        var focused_windows = this.state.focused_windows;
        focused_windows[objId] = true;
        for (let key in focused_windows) {
            if (focused_windows.hasOwnProperty(key)) {
                if (key !== objId) {
                    focused_windows[key] = false;
                }
            }
        }
        this.setState({ focused_windows });

        if (this.app_stack.includes(objId)) {
            this.app_stack.splice(this.app_stack.indexOf(objId), 1);
            this.app_stack.unshift(objId);
        }
    }

    addNewFolder = () => {
        this.setState({ showNameBar: true });
    }

    addToDesktop = (folder_name) => {
        folder_name = folder_name.trim();
        let folder_id = folder_name.replace(/\s+/g, '-').toLowerCase();
        apps.push({
            id: `new-folder-${folder_id}`,
            title: folder_name,
            icon: './themes/Yaru/system/folder.png',
            disabled: true,
            favourite: false,
            desktop_shortcut: true,
            screen: () => { },
        });
        // store in local storage
        var new_folders = JSON.parse(localStorage.getItem('new_folders'));
        new_folders.push({ id: `new-folder-${folder_id}`, name: folder_name });
        localStorage.setItem("new_folders", JSON.stringify(new_folders));

        this.setState({ showNameBar: false }, this.updateAppsData);
    }

    showAllApps = () => { this.setState({ allAppsView: !this.state.allAppsView }) }

    renderNameBar = () => {
        let addFolder = () => {
            let folder_name = document.getElementById("folder-name-input").value;
            this.addToDesktop(folder_name);
        }

        let removeCard = () => {
            this.setState({ showNameBar: false });
        }

        return (
            <div className="absolute rounded-md top-1/2 left-1/2 text-center text-white font-light text-sm bg-ub-cool-grey transform -translate-y-1/2 -translate-x-1/2 sm:w-96 w-3/4 z-50">
                <div className="w-full flex flex-col justify-around items-start pl-6 pb-8 pt-6">
                    <span>New folder name</span>
                    <input className="outline-none mt-5 px-1 w-10/12  context-menu-bg border-2 border-yellow-700 rounded py-0.5" id="folder-name-input" type="text" autoComplete="off" spellCheck="false" autoFocus={true} />
                </div>
                <div className="flex">
                    <div onClick={addFolder} className="w-1/2 px-4 py-2 border border-gray-900 border-opacity-50 border-r-0 hover:bg-ub-warm-grey hover:bg-opacity-10 hover:border-opacity-50">Create</div>
                    <div onClick={removeCard} className="w-1/2 px-4 py-2 border border-gray-900 border-opacity-50 hover:bg-ub-warm-grey hover:bg-opacity-10 hover:border-opacity-50">Cancel</div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={" h-full w-full pt-8 pb-16 lg:pb-0 bg-transparent relative overflow-hidden overscroll-none window-parent"}>

                {/* Window Area */}
                <div className="absolute h-full w-full bg-transparent" data-context="desktop-area">
                    {this.renderWindows()}
                </div>

                {/* Background Image */}
                <BackgroundImage img={this.props.bg_image_name} />

                {/* Ubuntu Side Menu Bar */}
                <SideBar apps={apps}
                    hide={this.state.hideSideBar}
                    hideSideBar={this.hideSideBar}
                    favourite_apps={this.state.favourite_apps}
                    showAllApps={this.showAllApps}
                    allAppsView={this.state.allAppsView}
                    closed_windows={this.state.closed_windows}
                    focused_windows={this.state.focused_windows}
                    isMinimized={this.state.minimized_windows}
                    openAppByAppId={this.openApp} />

                {/* Desktop Apps */}
                <div className="absolute right-3 top-11 z-10 hidden lg:flex flex-col items-end gap-y-1">
                    {this.renderDesktopApps()}
                </div>

                {/* Context Menus */}
                <DesktopMenu active={this.state.context_menus.desktop} openApp={this.openApp} addNewFolder={this.addNewFolder} />
                <DefaultMenu active={this.state.context_menus.default} />

                {/* Folder Input Name Bar */}
                {
                    (this.state.showNameBar
                        ? this.renderNameBar()
                        : null
                    )
                }

                { this.state.allAppsView ?
                    <AllApplications apps={apps}
                        recentApps={this.app_stack}
                        openApp={this.openApp} /> : null}

                {this.renderShortcutPanel()}

                {this.renderNotifications()}

                {this.app_stack.length === 0 ? (
                    <div className="absolute bottom-20 lg:bottom-4 left-1/2 z-10 -translate-x-1/2 rounded border border-white border-opacity-10 bg-black bg-opacity-40 px-3 py-1.5 text-xs text-gray-300">
                        No applications open.
                    </div>
                ) : null}

            </div>
        )
    }
}

export default Desktop