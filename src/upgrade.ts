import Decimal from "break_eternity.js";

export class Upgrade {
  cost: Decimal;
  costScaling: Decimal;
  level: Decimal;

  action: () => void;

  constructor(
    cost: Decimal,
    costScaling: Decimal,
    level: Decimal,
    action: () => void
  ) {
    this.cost = cost;
    this.costScaling = costScaling;
    this.level = level;
    this.action = action;
  }

  toJSON() {
    return {
      cost: this.cost.toString(),
      costScaling: this.costScaling.toString(),
      level: this.level.toString(),
    };
  }

  static fromJSON(json: any, action: () => void) {
    return new Upgrade(json.cost, json.costScaling, json.level, action);
  }
}
