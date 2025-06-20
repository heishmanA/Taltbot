import { Collection, Events, REST, Routes } from "discord.js";
import Command from "../../base/classes/Command";
import Event from "../../base/classes/Event";
import TaltClient from "../../base/classes/TaltClient";

export default class Ready extends Event {
  constructor(client: TaltClient) {
    super(client, {
      name: Events.ClientReady,
      description: "Ready Event",
      once: true,
    });
  }

  async Execute(): Promise<void> {
    // question mark makes sure to not throw null error
    console.log(`${this.client.user?.tag} is now ready`);

    // format client that will send only json to discord with commands
    const commands: object[] = this.GetJson(this.client.commands);
    const rest = new REST().setToken(this.client.config.token);
    const clientID = this.client.config.discordClientId;
    const guildID = this.client.config.guildId;

    // // for deleting guild-based commands
    // rest
    //   .put(Routes.applicationGuildCommands(clientID, guildID), { body: [] })
    //   .then(() => console.log("Successfully deleted all guild commands."))
    //   .catch(console.error);

    // for deleting global commands
    // rest
    //   .put(Routes.applicationCommands(clientID), { body: [] })
    //   .then(() => console.log("Successfully deleted all application commands."))
    //   .catch(console.error);

    const setCommands: any = await rest.put(
      Routes.applicationGuildCommands(clientID, guildID),
      {
        body: commands,
      },
    );
    console.log(`Successfully set ${setCommands.length} commands!`);
  }

  private GetJson(commands: Collection<string, Command>): object[] {
    const data: object[] = [];

    commands.forEach((command) => {
      data.push({
        name: command.name,
        description: command.description,
        options: command.options,
        defaultMemberPermissions: command.defaultMemberPermission.toString(),
        dmPermission: command.dmPermission,
      });
    });

    return data;
  }
}
