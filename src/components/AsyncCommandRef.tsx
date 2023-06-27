import { useMemo, useState } from "react";
import COMMAND_DATA from "../lib/data/async-command-help.json";

import "../styles/components/async-commands.scss";

const parseSearchInput = (input: string) =>
  input
    .replace(/\s+/g, " ")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z\s]/gi, "");

const AsyncCommandRef = () => {
  const [search, setSearch] = useState<string | null>(null);

  const commands = useMemo(
    () =>
      COMMAND_DATA.map((command) => ({
        ...command,
        search: parseSearchInput(Object.values(command).join(" ")),
      })),
    []
  );

  const filteredCommands = useMemo(() => {
    if (!search) return commands;
    const searchPattern = new RegExp(search, "i");
    return commands.filter((command) => searchPattern.test(command.search));
  }, [search, commands]);

  return (
    <div className="container async-commands my-2">
      <h1>Async Commands</h1>
      <p>First you need to create game and set active game you modifying.</p>
      <form className="mb-2">
        <div className="input-group">
          <input
            type="search"
            className="form-control full-width "
            placeholder="Filter..."
            onChange={(e) => setSearch(parseSearchInput(e.target.value))}
          />
        </div>
      </form>
      <div className="commands-list">
        {filteredCommands.map((command) => (
          <div className="command-group" key={command.command}>
            {command.heading && <h4>{command.heading}</h4>}
            {command.command && (
              <pre>
                <code>
                  {command.hint && (
                    <>
                      <em>
                        {"// "}
                        {command.hint}
                      </em>
                      {"\n"}
                    </>
                  )}
                  {command.command}
                </code>
              </pre>
            )}
            {command.help && (
              <blockquote className="help-text">{command.help}</blockquote>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AsyncCommandRef;
