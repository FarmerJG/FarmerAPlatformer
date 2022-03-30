/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Danger extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Blank", "./Danger/costumes/Blank.svg", { x: 0, y: 0 }),
      new Costume("Scene3", "./Danger/costumes/Scene3.svg", {
        x: 110.20754288495402,
        y: 166.10242588246047
      }),
      new Costume("Scene1", "./Danger/costumes/Scene1.svg", {
        x: 82.51350133506614,
        y: 161.56169154700362
      }),
      new Costume("Scene2", "./Danger/costumes/Scene2.svg", {
        x: 139.5,
        y: -25
      }),
      new Costume("Scene5", "./Danger/costumes/Scene5.svg", {
        x: 109.75000000000011,
        y: -32.750000000000284
      }),
      new Costume("costume1", "./Danger/costumes/costume1.svg", {
        x: -115.20194927876139,
        y: -75.66049614715885
      }),
      new Costume("Scene6", "./Danger/costumes/Scene6.svg", {
        x: 122.75000000000028,
        y: -78.75000046426538
      }),
      new Costume("Scene7", "./Danger/costumes/Scene7.svg", {
        x: 233.99390144247695,
        y: 56.57244860720398
      }),
      new Costume("Scene8", "./Danger/costumes/Scene8.svg", {
        x: 67.20753025250633,
        y: -98.42755546426537
      })
    ];

    this.sounds = [new Sound("pop", "./Danger/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Change Scene" },
        this.whenIReceiveChangeScene
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    /* TODO: Implement looks_gotofrontback */ null;
  }

  *whenIReceiveChangeScene() {
    this.costume = "Blank";
    this.costume = "" + "Scene" + this.stage.vars.scene;
    if (
      this.stage.vars.scene == 6 ||
      this.stage.vars.scene == 2 || this.stage.vars.scene == 5 ||
      0
    ) {
      while (true) {
        this.y = 3 * Math.sin(this.scratchToRad(this.timer * 180));
        yield;
      }
    }
  }
}
