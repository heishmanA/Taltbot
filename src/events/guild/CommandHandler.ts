import {
  ChatInputCommandInteraction,
  Collection,
  EmbedBuilder,
  Events,
} from "discord.js";
import Event from "../../base/classes/Event";
import TaltClient from "../../base/classes/TaltClient";
import Command from "../../base/classes/Command";

export default class CommandHandler extends Event {
  constructor(client: TaltClient) {
    // super takes client AND options
    super(client, {
      name: Events.InteractionCreate,
      description: "Command Handler Event",
      once: false,
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    // check if someone a non chat command comes through

    const name = interaction.commandName;

    if (interaction.isAutocomplete()) {
      const c: Command | undefined = this.client.commands.get(name);
      if (c !== undefined) {
        await c.AutoComplete(interaction);
      }
    }

    if (!interaction.isChatInputCommand()) {
      return;
    }

    const command: Command = this.client.commands.get(interaction.commandName)!;

    // check if command doesn't exist
    if (!command) {
      // @ts-ignore
      return (
        (await interaction.reply({
          content: "This command does not exist!",
          ephemeral: true,
        })) && this.client.commands.delete(interaction.commandName)
      );
    }

    // cooldown setup
    const { cooldowns } = this.client;
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000; // ms
    if (
      timestamps?.has(interaction.user.id) &&
      now < (timestamps.get(interaction.user.id) || 0) + cooldownAmount
    ) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `❌ Please wait another \`${(((timestamps.get(interaction.user.id) || 0) + cooldownAmount - now) / 100).toFixed(1)} seconds to run this command!`,
            ),
        ],
        ephemeral: true,
      });
    }

    timestamps?.set(interaction.user.id, now);
    setTimeout(() => timestamps?.delete(interaction.user.id), cooldownAmount);

    // run command
    try {
      // for handling subcommands
      const subCommandGroup = interaction.options.getSubcommandGroup(false);
      const subCommand = `${interaction.commandName}${subCommandGroup ? `.${subCommandGroup}` : ""}.${interaction.options.getSubcommand(false) || ""}`;
      // either run sub command or regular command
      return (
        this.client.subCommands.get(subCommand)?.Execute(interaction) ||
        command.Execute(interaction)
      );
    } catch (exception) {
      console.log(exception);
    }
  }
}
