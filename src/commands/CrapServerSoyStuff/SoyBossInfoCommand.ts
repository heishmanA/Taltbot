// url = https://docs.google.com/document/d/e/2PACX-1vRYOrZCmg0xFaunA8AiCy29TZVJPF_08v52_gkaDzjFUMpWu6WEzhwvg1OU1q7R3ofia7JRfJZ0FnV2/pub

import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  PermissionsBitField,
} from "discord.js";
import Command from "../../base/classes/Command";
import TaltClient from "../../base/classes/TaltClient";

export default class BossKilledCommand extends Command {
  constructor(client: TaltClient) {
    super(client, {
      name: "getsoybossinfo",
      description: "Get Rage's amazing soy boss guide link for boss info",
      defaultMemberPermission: PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 3,
      dmPermission: true,
      options: [],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const url =
      "https://docs.google.com/document/d/e/2PACX-1vRYOrZCmg0xFaunA8AiCy29TZVJPF_08v52_gkaDzjFUMpWu6WEzhwvg1OU1q7R3ofia7JRfJZ0FnV2/pub";
    const message = `Click the [link](${url})`;
    const return_message = new EmbedBuilder()
      .setTitle(`Ragequilt's amazing soy boss guide info`)
      .setDescription(message);

    await interaction.editReply({ embeds: [return_message] });
  }
}
