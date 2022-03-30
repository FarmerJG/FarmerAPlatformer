/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Platform extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Platform/costumes/costume1.svg", {
        x: 115.5,
        y: 22
      })
    ];

    this.sounds = [new Sound("pop", "./Platform/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Change Scene" },
        this.whenIReceiveChangeScene
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Tick - Platforms " },
        this.whenIReceiveTickPlatforms
      )
    ];

    this.vars.lastX = 140;
    this.vars.lastY = 32;
  }

  *whenIReceiveChangeScene() {
    this.visible = false;
    if (this.stage.vars.scene == 2) {
      this.visible = true;
      yield* this.animatePlatform();
    }
  }

  *animatePlatform() {
    this.goto(22, 22);
    if (this.stage.vars.scene == 2) {
      while (true) {
        yield* this.glide(2.5, 140, 32);
        yield* this.wait(1);
        yield* this.glide(2.5, 22, 22);
        yield* this.wait(1);
        yield;
      }
    }
  }

  *whenIReceiveTickPlatforms() {
    yield* this.tick(this.x, this.y);
    this.vars.lastX = this.x;
    this.vars.lastY = this.y;
  }

  *tick(newX, newY) {
    if (newY > this.vars.lastY) {
      this.y += 1;
    } else {
      this.y = this.vars.lastY + 1;
    }
    if (this.touching(this.sprites["Player"].andClones())) {
      this.stage.vars.platformDx = newX - this.vars.lastX;
      this.stage.vars.platformDy = newY - this.vars.lastY;
    } else {
      null;
    }
    this.goto(newX, newY);
  }
}
