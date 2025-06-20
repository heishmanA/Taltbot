/**
 * A simnple interface to be used as a 'view' for the boss info json
 */
export default interface IBossInfo {
  boss: {
    name: string;
    location: string;
    closest_tp: string;
    thumbnail: string;
  }[];
}
