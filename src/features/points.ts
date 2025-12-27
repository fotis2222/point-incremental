import { player } from "../player";
import { ElementWrapper, el } from "../element";

let pointsButton: ElementWrapper = new ElementWrapper("pointsButton");

el.update.points = () => {
  ElementWrapper.setHTML("pointsDisplay", `${player.points.toString()} Points`);
  ElementWrapper.setHTML("xpDisplay", `${player.xp.toString()} XP`);
  pointsButton.setHTML(`Get ${player.pointsMult} points and 1 XP`);
};

pointsButton.onClick(function () {
  player.points += player.pointsMult;
  player.xp += 1;
});
