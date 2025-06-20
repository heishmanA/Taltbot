import { CacheType, ChatInputCommandInteraction } from "discord.js";
import ISubCommand from "../interfaces/iSubCommand";
import ISubCommandOptions from "../interfaces/iSubCommandOptions";
import TaltClient from "./TaltClient";

export default class SubCommand implements ISubCommand {
  client: TaltClient;
  name: string;
  constructor(client: TaltClient, options: ISubCommandOptions) {
    this.client = client;
    this.name = options.name;
  }

  async Execute(
    interaction: ChatInputCommandInteraction<CacheType>,
  ): Promise<void> {}
}
