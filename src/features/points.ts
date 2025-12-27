import { player } from "../player";
import { ElementWrapper, el } from "../element";

let pointsButton: ElementWrapper = new ElementWrapper("pointsButton");

el.update.points = () => {
  ElementWrapper.setHTML("pointsDisplay", `${player.points.toString()} Points`);
  ElementWrapper.setHTML(
    "xpDisplay",
    `Level ${player.level} (${player.xp}/${Math.floor(
      10 * 1.1 ** (player.level - 1)
    )})`
  );
  pointsButton.setHTML(`Get ${player.pointsMult} points and 1 XP`);
};

pointsButton.onClick(function () {
  player.points += player.pointsMult;
  player.xp += 1;
  if (player.xp >= Math.floor(10 * 1.1 ** (player.level - 1))) {
    player.xp = 0;
    player.level++;
  }
});
