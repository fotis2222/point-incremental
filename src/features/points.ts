import { player } from "../player";
import { ElementWrapper, el } from "../element";
import Decimal from "break_eternity.js";
import { Upgrade } from "../upgrade";

export let pointsI = new Upgrade(
  new Decimal(10),
  new Decimal(1.1),
  new Decimal(0),
  () => {
    if (player.points.greaterThanOrEqualTo(pointsI.cost)) {
      player.points = player.points.subtract(pointsI.cost);
      pointsI.cost = pointsI.cost.multiply(pointsI.costScaling).floor();
      pointsI.level = pointsI.level.add(1);

      player.pointsMult = player.pointsMult.add(1);
    }
  }
);

export let xpI = new Upgrade(
  new Decimal(50),
  new Decimal(1.5),
  new Decimal(0),
  () => {
    if (player.points.greaterThanOrEqualTo(xpI.cost)) {
      player.points = player.points.subtract(xpI.cost);
      xpI.cost = xpI.cost.multiply(xpI.costScaling).floor();
      xpI.level = xpI.level.add(1);

      player.xpMult = player.xpMult.multiply(2);
    }
  }
);

export let compressedPointsI = new Upgrade(
  new Decimal(1000),
  new Decimal(1.1),
  new Decimal(0),
  () => {
    if (player.points.greaterThanOrEqualTo(compressedPointsI.cost)) {
      player.points = player.points.subtract(compressedPointsI.cost);
      compressedPointsI.cost = compressedPointsI.cost
        .multiply(compressedPointsI.costScaling)
        .floor();
      compressedPointsI.level = compressedPointsI.level.add(1);

      player.compressedPointsMult = player.compressedPointsMult.add(1.2);
    }
  }
);

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
    `Points I (${pointsI.level})<br>Get +100% points per level<br>${pointsI.cost} Points`
  );
  ElementWrapper.setHTML(
    "xpIUpgrade",
    `XP I (${xpI.level})<br>Get 2x XP per level<br>${xpI.cost} Points`
  );
  ElementWrapper.setHTML(
    "compressedPointsIUpgrade",
    `Compressed Points I (${compressedPointsI.level})<br>Get +20% Compressed Points per level<br>${compressedPointsI.cost} Points`
  );
};

let pointsButton: ElementWrapper = new ElementWrapper("pointsButton");
let pointsIButton: ElementWrapper = new ElementWrapper("pointsIUpgrade");
let xpIButton: ElementWrapper = new ElementWrapper("xpIUpgrade");
let compressedPointsIButton: ElementWrapper = new ElementWrapper(
  "compressedPointsIUpgrade"
);

function clickerClick() {
  player.points = player.points.add(
    player.pointsMult.multiply(player.pointsMultII)
  );
  player.xp = player.xp.add(player.xpMult);
  if (
    player.xp.greaterThanOrEqualTo(Math.floor(10 * 1.1 ** (player.level - 1)))
  ) {
    player.xp = new Decimal(0);
    player.level++;
    if (player.level > player.maxLevel) player.maxLevel = player.level;
  }
}

pointsButton.onClick(clickerClick);

pointsIButton.onClick(function () {
  pointsI.action();
});

xpIButton.onClick(function () {
  xpI.action();
});

compressedPointsIButton.onClick(function () {
  compressedPointsI.action();
});
