import {
  ApplicationCommandOptionData,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
} from "discord.js";
import TaltClient from "../classes/TaltClient";

/**
 * Interface for any command
 */
export default interface ICommand {
  client: TaltClient;
  name: string;
  description: string;
  options: ApplicationCommandOptionData[];
  defaultMemberPermission: bigint;
  dmPermission: boolean;
  cooldown: number;
  /**
   * Executes the command
   * @param interaction the command interaction
   */
  Execute(interaction: ChatInputCommandInteraction): void;
  /**
   * Gives the option for autocomplete so user can type values in
   * @param interaction the command interaction
   */
  AutoComplete(interaction: AutocompleteInteraction): void;
}
