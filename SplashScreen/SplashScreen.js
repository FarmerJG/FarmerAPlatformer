/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class SplashScreen extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Game Over", "./SplashScreen/costumes/Game Over.svg", {
        x: 322.40466247670867,
        y: 219.14365578738355
      }),
      new Costume("Main Menu", "./SplashScreen/costumes/Main Menu.svg", {
        x: 255,
        y: 242
      })
    ];

    this.sounds = [new Sound("pop", "./SplashScreen/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.costume = "Main Menu";
    /* TODO: Implement looks_gotofrontback */ null;
    this.visible = true;
    this.broadcast("Main Menu");
  }

  *whenIReceiveGameOver() {
    this.goto(0, 0);
    this.costume = "Game Over";
    /* TODO: Implement looks_gotofrontback */ null;
    this.visible = true;
    this.broadcast("Main Menu");
  }

  *whenIReceiveStartGame() {
    this.visible = false;
  }
}
