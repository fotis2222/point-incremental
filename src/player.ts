export interface Player {
  points: number;
  pointsMult: number;
  xp: number;
  level: number;
}

export let player: Player = {
  points: 0,
  pointsMult: 1,
  xp: 0,
  level: 1,
};
