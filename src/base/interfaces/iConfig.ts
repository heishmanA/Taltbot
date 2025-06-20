/**
 * Interface to allow for easily importing from config.json
 */
export default interface IConfig {
  token: string;
  discordClientId: string;
  guildId: string;
  mongoUrl: string;
  partyChannelID: string;
  dbName: string;
  devID: string;
}
