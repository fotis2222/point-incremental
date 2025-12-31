import { el, ElementWrapper, updateHTML } from "./element";
import Decimal from "break_eternity.js";
import { Player, player } from "./player";
import { Upgrade } from "./upgrade";

import "./features/points";
import { compressedPointsI, pointsI, xpI } from "./features/points";

import "./features/compression";
import "./upgrade";

// glitz
import "./styles/global.scss";

let upgrades = [pointsI, xpI, compressedPointsI];

let autosave = true;

function save() {
  if (!autosave) return;
  localStorage.setItem("playerSave", JSON.stringify(player));
  localStorage.setItem("upgradesSave", JSON.stringify(upgrades));
}

function load() {
  const playerSave = localStorage.getItem("playerSave");
  if (playerSave) Object.assign(player, JSON.parse(playerSave));

  // some keys may be finicky
  for (let k in player) {
    const key = k as keyof Player;
    if (typeof player[key] !== "number" && typeof player[key] !== "boolean") {
      (player[key] as any) = new Decimal(player[key]);
    }
  }

  const upgradesSave = localStorage.getItem("upgradesSave");

  let tempActions = upgrades.map((u) => u.action);

  if (upgradesSave) {
    let parsed = JSON.parse(upgradesSave);
    upgrades.forEach((u, i) => {
      if (parsed[i]) {
        u.cost = new Decimal(parsed[i].cost);
        u.costScaling = new Decimal(parsed[i].costScaling);
        u.level = new Decimal(parsed[i].level);
      }
      u.action = tempActions[i];
    });
  }
}

function wipeSave() {
  autosave = false;
  const ok = confirm(
    "are you sure you want to wipe your save? this cannot be undone."
  );

  if (!ok) {
    autosave = true;
    return;
  }
  localStorage.clear();
  location.reload();
}

ElementWrapper.onClick("wiper", wipeSave);

el.update.story = () => {
  if (player.hasCompressed) {
    ElementWrapper.setHTML("story", "oh what a decision you have made...");
  }
};

function gameLoop() {
  updateHTML();
  save();
}

load();

const FPS: number = 10;
setInterval(gameLoop, 1000 / FPS);
