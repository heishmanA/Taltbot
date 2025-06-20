import {
  ChatInputCommandInteraction,
  CacheType,
  AutocompleteInteraction,
  ApplicationCommandOptionData,
} from "discord.js";

import ICommand from "../interfaces/iCommand";
import TaltClient from "./TaltClient";
import ICommandOptions from "../interfaces/iCommandOptions";

/**
 * The default command class for extension only. Basically just a template for commands
 */
export default class Command implements ICommand {
  client: TaltClient;
  name: string;
  description: string;
  options: ApplicationCommandOptionData[];
  defaultMemberPermission: bigint;
  dmPermission: boolean;
  cooldown: number;

  constructor(client: TaltClient, options: ICommandOptions) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.options = options.options;
    this.defaultMemberPermission = options.defaultMemberPermission;
    this.dmPermission = options.dmPermission;
    this.cooldown = options.cooldown;
  }

  async Execute(
    interaction: ChatInputCommandInteraction<CacheType>,
  ): Promise<void> {}

  async AutoComplete(
    interaction: AutocompleteInteraction<CacheType>,
  ): Promise<void> {}
}
