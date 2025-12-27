import Decimal from "break_eternity.js";

interface Upgrade {
  cost: Decimal;
  level: number;
  costScaling: number;
  action: () => void;
}

export let upgrades: Record<string, Upgrade> = {};
