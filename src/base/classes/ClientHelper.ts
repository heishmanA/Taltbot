import TaltClient from "./TaltClient";

export default class ClientHelper {
  client: TaltClient;
  constructor(client: TaltClient) {
    this.client = client;
  }

  /**
   * Get an object containing the names of bosses with the format required by Discord for choices
   * @returns an array containing a collection of boss names in the format [[name, value]]
   */
  getBossNames() {
    // mapping the boss names to the require object format required by discord for choices
    return this.client.bossInfoConfig.boss.map((boss) => {
      return { name: boss.name, value: boss.name };
    });
  }

  /**
   * Gets the information related to a specific boss found in pwd/data/bossinfo.json
   * @param boss_name the name of the boss
   * @returns an object containing information on the specified boss requested.  Returns null if the boss
   *          is not
   */
  getBossInfo(boss_name: string) {
    for (const boss of this.client.bossInfoConfig.boss) {
      if (boss.name == boss_name) {
        return boss;
      }
    }

    return null;
  }
}
