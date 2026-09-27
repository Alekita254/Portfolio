import { displayTerminal } from './components/apps/terminal';
import { displaySettings } from './components/apps/settings';
import { displayContact } from './components/apps/contact';
import {
    displayAbout,
    displayProjects,
    displayExperience,
    displayWriting,
    displayResume,
} from './components/apps/alex';

const apps = [
    {
        id: "about",
        title: "About",
        icon: './themes/Yaru/system/user-home.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayAbout,
    },
    {
        id: "projects",
        title: "Projects",
        icon: './themes/Yaru/status/projects.svg',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayProjects,
    },
    {
        id: "experience",
        title: "Experience",
        icon: './themes/Yaru/status/education.svg',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayExperience,
    },
    {
        id: "writing",
        title: "Writing",
        icon: './themes/Yaru/apps/gedit.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayWriting,
    },
    {
        id: "resume",
        title: "Resume",
        icon: './themes/Yaru/status/download.svg',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayResume,
    },
    {
        id: "terminal",
        title: "Terminal",
        icon: './themes/Yaru/apps/bash.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminal,
    },
    {
        id: "contact",
        title: "Contact",
        icon: './themes/Yaru/apps/gedit.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayContact,
    },
    {
        id: "settings",
        title: "Settings",
        icon: './themes/Yaru/apps/gnome-control-center.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displaySettings,
    },
]

export default apps;