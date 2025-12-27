import { el, ElementWrapper, updateHTML } from "./element";
import Decimal from "break_eternity.js";
import { player } from "./player";
import "./features/points";
import "./styles/global.scss";

const FPS: number = 30;

setInterval(updateHTML, 1000 / FPS);
