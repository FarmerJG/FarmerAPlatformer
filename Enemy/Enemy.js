/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Enemy extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Red1", "./Enemy/costumes/Red1.svg", {
        x: 60.65455948356475,
        y: -84.55911896712968
      }),
      new Costume("Red2", "./Enemy/costumes/Red2.svg", {
        x: 62.802659084730124,
        y: -78.34755576832566
      }),
      new Costume("Red3", "./Enemy/costumes/Red3.svg", {
        x: 70.39950580970321,
        y: -68.99347798626724
      }),
      new Costume("Red4", "./Enemy/costumes/Red4.svg", {
        x: 62.802659084730124,
        y: -78.34755576832566
      }),
      new Costume("Red Squish", "./Enemy/costumes/Red Squish.svg", {
        x: 60.654560000000004,
        y: -113.55538806025845
      })
    ];

    this.sounds = [new Sound("pop", "./Enemy/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Change Scene" },
        this.whenIReceiveChangeScene
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "About to Change Scene" },
        this.whenIReceiveAboutToChangeScene
      )
    ];

    this.vars.speedY3 = 0;
    this.vars.frame = 0;
  }

  *whenIReceiveChangeScene() {
    if (
      this.stage.vars.scene == 8 ||
      this.stage.vars.scene == 7 || this.stage.vars.scene == 4
    ) {
      this.goto(36, 28);
      this.direction = -90;
      this.createClone();
    }
  }

  *whenGreenFlagClicked() {
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.visible = false;
  }

  *startAsClone() {
    this.visible = true;
    this.vars.speedY3 = 0;
    this.vars.frame = 0;
    while (true) {
      this.costume = "Red1";
      this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
      yield* this.moveLeftOrRight();
      yield* this.moveDown();
      this.vars.frame += 0.33;
      this.costume = 1 + (Math.floor(this.vars.frame) % 4);
      this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
      if (
        this.stage.vars.invernableThing == 0 &&
        this.touching(this.sprites["Player"].andClones())
      ) {
        yield* this.touchingPlayer();
      }
      yield;
    }
  }

  *whenIReceiveAboutToChangeScene() {
    this.deleteThisClone();
  }

  *moveDown() {
    this.vars.speedY3 += -1;
    this.y += this.vars.speedY3;
    while (!!this.touching(this.sprites["Level"].andClones())) {
      this.y += 1;
      this.vars.speedY3 = 0;
    }
  }

  *moveLeftOrRight() {
    this.move(2);
    if (
      this.touching(this.sprites["Level"].andClones()) ||
      this.touching(this.sprites[undefined].andClones()) ||
      this.touching(this.sprites[undefined].andClones())
    ) {
      this.move(-2);
      this.direction += 180;
    }
  }

  *touchingPlayer() {
    if (this.sprites["Player"].vars["speedY"] < -3) {
      this.broadcast("Player - Bounce");
      this.costume = "Red Squish";
      yield* this.wait(0.3);
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += 10;
        yield;
      }
      this.deleteThisClone();
    }
    this.broadcast("Loose Life");
  }
}
