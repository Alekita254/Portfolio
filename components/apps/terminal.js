import React, { Component } from 'react'
import $ from 'jquery';
import identity from '../../config/identity';
import portfolioContent from '../../content/portfolio';

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.current_directory = "~";
        this.appCommands = {
            about: 'about',
            projects: 'projects',
            experience: 'experience',
            writing: 'writing',
            resume: 'resume',
            contact: 'contact',
        };
        this.prev_commands = [];
        this.commands_index = -1;
        this.state = {
            terminal: [],
        }
    }

    componentDidMount() {
        this.reStartTerminal();
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = () => {
        clearInterval(this.cursor);
        this.terminal_rows = 1;
        this.prev_commands = [];
        this.commands_index = -1;
        this.setState({ terminal: [] }, () => {
            this.appendTerminalRow();
        });
    }

    appendTerminalRow = () => {
        const rowId = this.terminal_rows;
        this.setState((prevState) => ({
            terminal: [...prevState.terminal, this.terminalRow(rowId)],
        }), () => {
            this.terminal_rows += 2;
        });
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full h-5">
                    <div className="flex">
                        <div className=" text-ubt-green">{identity.terminalPersona}</div>
                        <div className="text-white mx-px font-medium">:</div>
                        <div className=" text-ubt-blue">{this.current_directory}</div>
                        <div className="text-white mx-px font-medium mr-1">$</div>
                    </div>
                    <div id={`cmd-${id}`} onClick={this.focusCursor} className=" bg-transperent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input id={`terminal-input-${id}`} data-row-id={id} onKeyDown={this.checkKey} onBlur={this.unFocusCursor} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal"}></div>
            </React.Fragment>
        );

    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        const targetId = $(e.target).data("row-id") || $(e.target).closest("[data-row-id]").data("row-id") || (this.terminal_rows - 2);
        this.startCursor(targetId);
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        if (!id || !$(`input#terminal-input-${id}`).length) {
            id = this.terminal_rows - 2;
        }
        $(`input#terminal-input-${id}`).trigger("focus");
        // On input change, set current text in span
        $(`input#terminal-input-${id}`).off("input").on("input", function () {
            $(`#show-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            }
            else return;
            // push to history
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;

            this.clearInput(terminal_row_id);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) return;
            if (this.commands_index <= -1) this.commands_index = 0;

            if (this.commands_index === this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index++;
        }
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    handleCommands = (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0]?.toLowerCase();
        let result = "";

        switch (main) {
            case "help":
                result = "Available commands: help, about, projects, experience, writing, resume, contact, whoami, ls, cv, clear";
                break;
            case "about":
            case "projects":
            case "experience":
            case "writing":
            case "resume":
            case "contact":
                result = `Opening ${main.charAt(0).toUpperCase() + main.slice(1)}...`;
                this.props.openApp(this.appCommands[main]);
                break;
            case "cv":
                result = "Opening Resume...";
                this.props.openApp("resume");
                break;
            case "whoami":
                result = `${identity.name}<br/>${identity.professionalTitle}<br/>${identity.location}`;
                break;
            case "ls":
                result = Object.keys(this.appCommands).concat(["terminal", "settings"]).map((appId) => `<span class='mr-3 text-ubt-blue'>${appId}</span>`).join('');
                break;
            case "clear":
                this.reStartTerminal();
                return;
            default:
                result = `Command '${this.xss(main || "")}' not found. Type 'help' to see supported commands.`;
        }
        document.getElementById(`row-result-${rowId}`).innerHTML = result;
        this.appendTerminalRow();
    }

    xss(str) {
        if (!str) return;
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp';
                case '<':
                    return '&lt';
                case '>':
                    return '&gt';
                case '"':
                    return '&quot';
                case "'":
                    return '&#x27';
                case '/':
                    return '&#x2F';
                default:
                    return char;
            }
        }).join('');
    }

    render() {
        return (
            <div className="h-full w-full bg-ub-drk-abrgn text-white text-sm font-bold" id="terminal-body">
                <div className="px-1 py-1 text-xs text-gray-300">
                    {identity.osName} terminal. Type "help" to list commands. Current profile: {portfolioContent.profile.name}.
                </div>
                {
                    this.state.terminal
                }
            </div>
        )
    }
}

export default Terminal

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}
