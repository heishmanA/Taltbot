import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
  CacheType,
} from "discord.js";
import Command from "../base/classes/Command";
import TaltClient from "../base/classes/TaltClient";

export default class BossKilledCommand extends Command {
  constructor(client: TaltClient) {
    const bossChoices = client.clientHelper.getBossNames();
    super(client, {
      name: "bosskilled",
      description: "Log the time a boss was killed",
      defaultMemberPermission: PermissionsBitField.Flags.UseApplicationCommands,
      cooldown: 3,
      dmPermission: true,
      options: [
        {
          name: "boss",
          description: "The boss that has been killed",
          type: ApplicationCommandOptionType.String,
          choices: bossChoices,
          required: true,
        },
        {
          name: "conversion_type",
          description: "Set the conversation type of the timestamp",
          type: ApplicationCommandOptionType.String,
          choices: [
            {
              name: "relative",
              value: "R",
            },
            {
              name: "short_time",
              value: "t",
            },
            {
              name: "long_time",
              value: "T",
            },
            {
              name: "long_date_with_short_time",
              value: "f",
            },
            {
              name: "long_date_with_day_of_week_and_time",
              value: "F",
            },
          ],
        },
      ],
    });
  }

  async Execute(interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.deferReply();
    const boss: string = interaction.options.getString("boss") ?? "";
    if (boss.length <= 0 || boss == null) {
      const error_type: string = "Missing Boss Name";
      const deferredEmbed = new EmbedBuilder()
        .setTitle(error_type)
        .setDescription("Please notify Aren if you get this error");
      await interaction.editReply({ embeds: [deferredEmbed] });
      return;
    }
    const bossInfo = this.client.clientHelper.getBossInfo(boss);
    if (bossInfo == null) {
      const error_type: string = "Error finding boss information.";
      const deferredEmbed = new EmbedBuilder()
        .setTitle(error_type)
        .setDescription("Please notify Aren if you get this error");
      await interaction.editReply({ embeds: [deferredEmbed] });
      return;
    }
    const date = new Date();
    const current_time = Math.floor(Number(date) / 1000); // Converting the current date time to a format for discord
    const time_format: string =
      interaction.options.getString("conversion_type") ?? "t";
    const message = `${bossInfo.name} has been killed at <t:${current_time}:${time_format}>\t
                      location: ${bossInfo.location}
                      Closest teleport: ${bossInfo.closest_tp}`;
    const return_message = new EmbedBuilder()
      .setTitle(`${boss}`)
      .setDescription(message)
      .setThumbnail(`${bossInfo.thumbnail}`);
    await interaction.editReply({ embeds: [return_message] });
  }
}
