import { Client, Collection, GatewayIntentBits } from "discord.js";
import ITaltClient from "../interfaces/iTaltClient";
import IConfig from "../interfaces/iConfig";
import Command from "./Command";
import Handler from "./Handler";
import SubCommand from "./SubCommand";
import IBossInfo from "../interfaces/iBossInfo";
import ClientHelper from "./ClientHelper";

export default class TaltClient extends Client implements ITaltClient {
  config: IConfig;
  handler: Handler;
  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;
  cooldowns: Collection<string, Collection<string, number>>;
  bossInfoConfig: IBossInfo;
  clientHelper: ClientHelper;
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });
    this.config = require(`${process.cwd()}/data/config.json`); // must create a ./data/config.json
    this.handler = new Handler(this);
    this.commands = new Collection();
    this.subCommands = new Collection();
    this.cooldowns = new Collection();
    // misc
    this.bossInfoConfig = require(`${process.cwd()}/data/bossinfo.json`);
    this.clientHelper = new ClientHelper(this);
  }

  /**
   * Initialize the bot
   */
  async Init() {
    await this.LoadHandlers();
    await this.login(this.config.token).catch((err) => console.error(err));
  }

  /**
   * Load all handlers
   */
  async LoadHandlers() {
    await this.handler.LoadEvents();
    await this.handler.LoadCommands();
  }
}
