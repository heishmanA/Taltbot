import { ApplicationCommandOptionData } from "discord.js";

/**
 * Interface that allows easy use of command options
 */
export default interface ICommandOptions {
  name: string;
  description: string;
  options: ApplicationCommandOptionData[];
  defaultMemberPermission: bigint;
  dmPermission: boolean;
  cooldown: number;
}
