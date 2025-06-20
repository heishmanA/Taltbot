import { Events } from "discord.js";

/**
 * Interface for event options
 */
export default interface IEventOptions {
  name: Events;
  description: string;
  once: boolean;
}
