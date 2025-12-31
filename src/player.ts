import Decimal from "break_eternity.js";

export interface Player {
  points: Decimal;
  pointsMult: Decimal;
  pointsMultII: Decimal;
  xp: Decimal;
  xpMult: Decimal;
  level: number;
  maxLevel: number;
  hasCompressed: boolean;
  compressedPoints: Decimal;
  compressedPointsMult: Decimal;
}

export let player: Player = {
  points: new Decimal(0),
  pointsMult: new Decimal(1),
  pointsMultII: new Decimal(1),
  xp: new Decimal(0),
  xpMult: new Decimal(1),
  level: 1,
  maxLevel: 1,
  hasCompressed: false,
  compressedPoints: new Decimal(0),
  compressedPointsMult: new Decimal(1),
};
