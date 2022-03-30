/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Farm", "./Stage/costumes/Farm.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.myVariable = 0;
    this.vars.jumpForce = 12;
    this.vars.acceleration = 1.5;
    this.vars.resistance = 0.8;
    this.vars.scene = 1;
    this.vars.jumpDuration = 6;
    this.vars.platformDx = 0;
    this.vars.platformDy = 0;
    this.vars.lives = 3;
    this.vars.invernableThing = 0;
  }
}
