import { player } from "../player";
import { ElementWrapper, el } from "../element";
import Decimal from "break_eternity.js";
import { upgrades } from "../upgrade";

upgrades.pointsI = {
  cost: new Decimal(10),
  costScaling: 1.1,
  level: 0,
  action() {
    if (player.points.greaterThanOrEqualTo(this.cost)) {
      player.points = player.points.subtract(this.cost);
      this.cost = this.cost.multiply(this.costScaling).floor();
      this.level++;

      player.pointsMult = player.pointsMult.add(1);
    }
  },
};

upgrades.xpI = {
  cost: new Decimal(50),
  costScaling: 1.5,
  level: 0,
  action() {
    if (player.points.greaterThanOrEqualTo(this.cost)) {
      player.points = player.points.subtract(this.cost);
      this.cost = this.cost.multiply(this.costScaling).floor();
      this.level++;

      player.xpMult = player.xpMult.multiply(2);
    }
  },
};

el.update.points = () => {
  ElementWrapper.setHTML("pointsDisplay", `${player.points.toString()} Points`);
  ElementWrapper.setHTML(
    "xpDisplay",
    `Level ${player.level} (${player.xp}/${Math.floor(
      10 * 1.1 ** (player.level - 1)
    )})`
  );
  ElementWrapper.setHTML(
    "pointsButton",
    `Get ${player.pointsMult} points and ${player.xpMult} XP`
  );
  ElementWrapper.setHTML(
    "pointsIUpgrade",
    `Points I (${upgrades.pointsI.level})<br> Get +100% <span class="points">points</span> per level <br> ${upgrades.pointsI.cost} <span class="points">Points</span>`
  );
  ElementWrapper.setHTML(
    "xpIUpgrade",
    `XP I (${upgrades.xpI.level})<br> Get 2x <span class="xp">XP</span> per level <br> ${upgrades.xpI.cost} <span class="points">Points</span>`
  );
};

let pointsButton: ElementWrapper = new ElementWrapper("pointsButton");
let pointsIButton: ElementWrapper = new ElementWrapper("pointsIUpgrade");
let xpIButton: ElementWrapper = new ElementWrapper("xpIUpgrade");

function clickerClick() {
  player.points = player.points.add(player.pointsMult);
  player.xp = player.xp.add(player.xpMult);
  if (
    player.xp.greaterThanOrEqualTo(Math.floor(10 * 1.1 ** (player.level - 1)))
  ) {
    player.xp = new Decimal(0);
    player.level++;
  }
}

pointsButton.onClick(clickerClick);

pointsIButton.onClick(function () {
  upgrades.pointsI.action();
});

xpIButton.onClick(function () {
  upgrades.xpI.action();
});
