import { player, Player } from "../player";
import { ElementWrapper, el } from "../element";
import Decimal from "break_eternity.js";
import { Upgrade } from "../upgrade";
import { xpI, pointsI, compressedPointsI } from "./points";

function calculateCompressedPoints(player: Player): Decimal {
  return new Decimal(Math.floor(1.5 ** (player.level - 50)))
    .multiply(player.compressedPointsMult)
    .floor();
}

function compress() {
  let tempCompressed: Decimal = calculateCompressedPoints(player);
  if (player.level >= 51) {
    pointsI.cost = new Decimal(10);
    pointsI.level = new Decimal(0);

    xpI.cost = new Decimal(50);
    xpI.level = new Decimal(0);

    compressedPointsI.cost = new Decimal(1000);
    compressedPointsI.level = new Decimal(0);

    Object.assign(player, {
      points: new Decimal(0),
      pointsMult: new Decimal(1),
      xp: new Decimal(0),
      xpMult: new Decimal(1),
      level: 1,
      compressedPointsMult: new Decimal(1),
    });
    player.compressedPoints = player.compressedPoints.add(tempCompressed);
    if (!player.hasCompressed) player.hasCompressed = true;
  }
}

el.update.compression = () => {
  if (player.maxLevel < 51) {
    ElementWrapper.hide("compressionDiv");
  } else {
    ElementWrapper.block("compressionDiv");
  }

  if (!player.hasCompressed) {
    ElementWrapper.hide("compressLockedPointsStuff");
    ElementWrapper.hide("compressLockedCompressionStuff");
  } else {
    ElementWrapper.block("compressLockedPointsStuff");
    ElementWrapper.block("compressLockedCompressionStuff");
  }

  ElementWrapper.setHTML(
    "compressButton",
    `do it for ${calculateCompressedPoints(player)}`
  );

  ElementWrapper.setHTML(
    "compressedPointsDisplay",
    `you have ${player.compressedPoints} <span class="compression">Compressed points</span>`
  );
};

let compressButton = new ElementWrapper("compressButton");
compressButton.onClick(compress);
