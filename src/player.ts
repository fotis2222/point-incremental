import Decimal from "break_eternity.js";

export interface Player {
  points: Decimal;
  pointsMult: Decimal;
  xp: Decimal;
  xpMult: Decimal;
  level: number;
}

export let player: Player = {
  points: new Decimal(0),
  pointsMult: new Decimal(1),
  xp: new Decimal(0),
  xpMult: new Decimal(1),
  level: 1,
};
