import { Collection } from "discord.js";
import Command from "../classes/Command";
import IConfig from "./iConfig";
import SubCommand from "../classes/SubCommand";

export default interface ITaltClient {
  config: IConfig;
  commands: Collection<String, Command>;
  subCommands: Collection<String, SubCommand>;
  cooldowns: Collection<String, Collection<string, number>>;
  Init(): void;
  LoadHandlers(): void;
}
