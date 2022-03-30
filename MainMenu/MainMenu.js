/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MainMenu extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Play Button", "./MainMenu/costumes/Play Button.svg", {
        x: 97.5926966315717,
        y: 33.538374186599896
      })
    ];

    this.sounds = [new Sound("pop", "./MainMenu/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Main Menu" },
        this.whenIReceiveMainMenu
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenIReceiveMainMenu() {
    yield* this.wait(0.1);
    /* TODO: Implement looks_gotofrontback */ null;
    this.visible = true;
    this.goto(1, -12);
    while (true) {
      if (this.touching("mouse")) {
        this.size += 0.2 * (110 - this.size);
      } else {
        this.size += 0.2 * (100 - this.size);
      }
      yield;
    }
  }

  *whenthisspriteclicked() {
    this.visible = false;
    this.broadcast("Start Game");
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    while (true) {
      if (this.touching("mouse")) {
        this.size += 0.2 * (110 - this.size);
      } else {
        this.size += 0.2 * (100 - this.size);
      }
      yield;
    }
  }
}
