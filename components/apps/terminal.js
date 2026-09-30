import React, { useMemo, useState } from 'react';
import identity from '../../config/identity';
import portfolioContent from '../../content/portfolio';

const APP_COMMANDS = ['about', 'projects', 'experience', 'writing', 'resume', 'contact', 'settings'];
const BASIC_COMMANDS = ['help', 'whoami', 'clear', 'ls', 'pwd', 'cd', 'cat', 'history', 'sudo'];
const ALL_COMMANDS = [...BASIC_COMMANDS, ...APP_COMMANDS];

function promptText(directory) {
  return `${identity.terminalPersona}:${directory}$`;
}

function renderList(items) {
  if (!items || items.length === 0) return ['No entries available.'];
  return items;
}

export function Terminal({ openApp }) {
  const [directory, setDirectory] = useState('~');
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [rows, setRows] = useState([]);

  const commandHints = useMemo(() => {
    if (!inputValue.trim()) return [];
    const query = inputValue.trim().toLowerCase();
    return ALL_COMMANDS.filter((cmd) => cmd.startsWith(query)).slice(0, 4);
  }, [inputValue]);

  const appendRow = (command, outputLines = [], promptDirectory = directory) => {
    setRows((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, command, outputLines, promptDirectory }]);
  };

  const runCommand = (rawCommand) => {
    const command = rawCommand.trim();
    const [main, ...args] = command.split(/\s+/);
    const cmd = (main || '').toLowerCase();

    if (!cmd) return;

    if (cmd === 'clear') {
      setRows([]);
      return;
    }

    if (cmd === 'help') {
      appendRow(command, [
        'Available commands:',
        'apps: about, projects, experience, writing, resume, contact, settings',
        'shell: help, whoami, ls, pwd, cd <directory>, cat <topic>, history, clear',
        'easter egg: sudo hire-alex',
      ]);
      return;
    }

    if (cmd === 'whoami') {
      appendRow(command, [
        identity.name,
        'Senior Backend Engineer',
        'Python · Go · Distributed Systems · Cloud',
      ]);
      return;
    }

    if (cmd === 'ls') {
      appendRow(command, ['about  projects  experience  writing  resume  contact  terminal  settings']);
      return;
    }

    if (cmd === 'pwd') {
      appendRow(command, [`/home/${identity.userName}`]);
      return;
    }

    if (cmd === 'cd') {
      const target = (args[0] || '').toLowerCase();
      if (!target || target === '~') {
        setDirectory('~');
        appendRow(command, []);
        return;
      }

      if (target === 'projects') {
        setDirectory('~/projects');
        appendRow(command, []);
        return;
      }

      appendRow(command, [`cd: ${target}: No such directory`]);
      return;
    }

    if (cmd === 'cat') {
      const target = (args[0] || '').toLowerCase();

      if (target === 'about') {
        appendRow(command, [portfolioContent.profile.summary]);
        return;
      }

      if (target === 'resume') {
        appendRow(command, [identity.resumePath]);
        return;
      }

      if (target === 'projects') {
        appendRow(command, renderList(portfolioContent.projects.map((project) => project.name)));
        return;
      }

      appendRow(command, [`cat: ${target || '(missing target)'}: file not found`]);
      return;
    }

    if (cmd === 'history') {
      appendRow(command, history.length ? history.map((item, index) => `${index + 1}  ${item}`) : ['No command history yet.']);
      return;
    }

    if (cmd === 'sudo' && args.join(' ').toLowerCase() === 'hire-alex') {
      appendRow(command, ['Nice try.', 'Start with: contact']);
      return;
    }

    if (cmd === 'cv') {
      openApp('resume');
      appendRow(command, ['Opening Resume...']);
      return;
    }

    if (APP_COMMANDS.includes(cmd)) {
      openApp(cmd);
      appendRow(command, [`Opening ${cmd.charAt(0).toUpperCase() + cmd.slice(1)}...`]);
      return;
    }

    appendRow(command, [`Command '${cmd}' not found. Type 'help' to see supported commands.`]);
  };

  const submitCommand = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    runCommand(trimmed);
    setInputValue('');
  };

  const applyAutocomplete = () => {
    const query = inputValue.trim().toLowerCase();
    if (!query) return;
    const match = ALL_COMMANDS.find((cmd) => cmd.startsWith(query));
    if (match) {
      setInputValue(match);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitCommand();
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      applyAutocomplete();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;

      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(nextIndex);
      setInputValue(history[nextIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!history.length) return;

      if (historyIndex < 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputValue('');
        return;
      }

      setHistoryIndex(nextIndex);
      setInputValue(history[nextIndex]);
    }
  };

  return (
    <div className="h-full w-full bg-ub-drk-abrgn text-white text-sm font-medium p-2" id="terminal-body">
      <div className="px-1 py-1 text-xs text-gray-300 border-b border-white border-opacity-10">
        {identity.osName} terminal. Type "help" to list commands.
      </div>

      <div className="pt-2 space-y-2">
        {rows.map((row) => (
          <div key={row.id}>
            <div className="flex gap-2">
              <span className="text-ubt-green">{promptText(row.promptDirectory || '~')}</span>
              <span className="break-all">{row.command}</span>
            </div>
            {row.outputLines.length > 0 ? (
              <div className="pl-1 mt-1 text-gray-200 space-y-1">
                {row.outputLines.map((line, idx) => (
                  <div key={`${row.id}-${idx}`} className="break-words">{line}</div>
                ))}
              </div>
            ) : null}
          </div>
        ))}

        <div className="flex items-start gap-2">
          <span className="text-ubt-green pt-1">{promptText(directory)}</span>
          <div className="flex-1">
            <input
              aria-label="Terminal command input"
              className="w-full bg-transparent border-none outline-none text-white"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
            {commandHints.length > 0 ? (
              <div className="mt-1 max-w-md rounded border border-white border-opacity-20 bg-black bg-opacity-45 py-1 text-xs text-gray-300">
                {commandHints.map((hint) => (
                  <div key={hint} className="px-2 py-1 hover:bg-white hover:bg-opacity-10">
                    {hint}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terminal;

export const displayTerminal = (addFolder, openApp) => {
  return <Terminal addFolder={addFolder} openApp={openApp}></Terminal>;
};
