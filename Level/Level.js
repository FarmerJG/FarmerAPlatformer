/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Level extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Scene1", "./Level/costumes/Scene1.svg", {
        x: 266.5,
        y: 187
      }),
      new Costume("Scene2", "./Level/costumes/Scene2.svg", { x: 281.5, y: 41 }),
      new Costume("Scene3", "./Level/costumes/Scene3.svg", {
        x: 281.5,
        y: 245
      }),
      new Costume("Scene4", "./Level/costumes/Scene4.svg", {
        x: 253.500004976546,
        y: 292
      }),
      new Costume("Scene5", "./Level/costumes/Scene5.svg", {
        x: 263,
        y: -12.250000000000085
      }),
      new Costume("Scene6", "./Level/costumes/Scene6.svg", { x: 248, y: 39 }),
      new Costume("Scene7", "./Level/costumes/Scene7.svg", {
        x: 267.5,
        y: 32.25
      }),
      new Costume("Scene8", "./Level/costumes/Scene8.svg", {
        x: 238.75,
        y: -132.75000000000006
      }),
      new Costume("Scene9", "./Level/costumes/Scene9.svg", {
        x: 281.75,
        y: 203.25
      })
    ];

    this.sounds = [new Sound("pop", "./Level/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Change Scene" },
        this.whenIReceiveChangeScene
      )
    ];

    this.vars.speedY2 = 0;
    this.vars.gravity2 = 0;
    this.vars.speedX2 = 0;
    this.vars.lastValue2 = 0;
    this.vars.falling2 = 0;
    this.vars.touching2 = 0;
    this.vars.temp2 = 0;
    this.vars.distance2 = 0;
    this.vars.jumping2 = 0;
    this.vars.wallSlide2 = 0;
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    /* TODO: Implement looks_gotofrontback */ null;
  }

  *whenIReceiveChangeScene() {
    this.costume = "" + "Scene" + this.stage.vars.scene;
  }
}
