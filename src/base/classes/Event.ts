import { Events } from "discord.js";
import TaltClient from "./TaltClient";
import IEvent from "../interfaces/iEvent";
import IEventOptions from "../interfaces/iEventOptions";

/**
 * The default event class for extension only. Basically just a template for event
 */
export default class Event implements IEvent {
  client: TaltClient;
  name: Events;
  description: string;
  once: boolean;

  constructor(client: TaltClient, options: IEventOptions) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.once = options.once;
  }

  Execute(...args: any): void {}
}
