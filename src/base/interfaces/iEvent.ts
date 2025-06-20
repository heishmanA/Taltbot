import { Events } from "discord.js";
import TaltClient from "../classes/TaltClient";

/**
 * Interface for events
 */
export default interface IEvent {
  client: TaltClient;
  name: Events; // dont have to manually type out
  description: string;
  once: boolean;
}
