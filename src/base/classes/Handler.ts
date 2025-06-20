import { glob } from "glob";
import path from "path";
import IHandler from "../interfaces/iHandler";
import Command from "./Command";
import Event from "./Event";
import TaltClient from "./TaltClient";
import SubCommand from "./SubCommand";

/**
 * Handler class to handle loading files / events / anything for the bot to use
 */
export default class Handler implements IHandler {
  client: TaltClient;

  constructor(client: TaltClient) {
    this.client = client;
  }
  /**
   * Load all event files
   */
  async LoadEvents() {
    const files = (await glob(`build/events/**/*.js`)).map((filePath) =>
      path.resolve(filePath),
    );

    files.map(async (file: string) => {
      // gets the event
      const event: Event = new (await import(file)).default(this.client);
      // check if event has name
      if (!event.name) {
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have a name.`)
        );
      }
      // get the execute function from the event
      const execute = (...args: any) => event.Execute(...args);

      if (event.once) {
        // @ts-ignore - error doesnt matter
        this.client.once(event.name, execute);
      } else {
        // @ts-ignore
        this.client.on(event.name, execute);
      }

      return delete require.cache[require.resolve(file)];
    });
  }

  /**
   * Loads all commands in build/commands
   */
  async LoadCommands() {
    const files = (await glob(`build/commands/**/*.js`)).map((filePath) =>
      path.resolve(filePath),
    );

    files.map(async (file: string) => {
      // gets the event
      const command: Command | SubCommand = new (await import(file)).default(
        this.client,
      );
      // check if command has name
      if (!command.name) {
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have a name.`)
        );
      }

      /**
       * Subcommands will get added to this collection
       */
      if (file.split("/").pop()?.split(".")[2]) {
        return this.client.subCommands.set(command.name, command);
      }

      this.client.commands.set(command.name, command as Command);

      return delete require.cache[require.resolve(file)];
    });
  }
}
