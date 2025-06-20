import {
  ApplicationCommandOptionData,
  ChatInputCommandInteraction,
} from "discord.js";
import TaltClient from "../classes/TaltClient";

export default interface ISubCommand {
  client: TaltClient;
  name: string;
  Execute(interaction: ChatInputCommandInteraction): void;
}
