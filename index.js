import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player from "./Player/Player.js";
import Level from "./Level/Level.js";
import Danger from "./Danger/Danger.js";
import Platform from "./Platform/Platform.js";
import SplashScreen from "./SplashScreen/SplashScreen.js";
import MainMenu from "./MainMenu/MainMenu.js";
import Enemy from "./Enemy/Enemy.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Player: new Player({
    x: -150,
    y: -105.48328412172387,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Level: new Level({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Danger: new Danger({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 3,
    size: 100,
    visible: true
  }),
  Platform: new Platform({
    x: 140,
    y: 32,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  SplashScreen: new SplashScreen({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: true
  }),
  MainMenu: new MainMenu({
    x: 1,
    y: -12,
    direction: 90,
    costumeNumber: 1,
    size: 100.39999999999998,
    visible: true
  }),
  Enemy: new Enemy({
    x: 36,
    y: 28,
    direction: -90,
    costumeNumber: 1,
    size: 100,
    visible: false
  })
};

const project = new Project(stage, sprites);
export default project;
