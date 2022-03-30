/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume2", "./Player/costumes/costume2.svg", {
        x: 53.810826247018895,
        y: 48.96671173583985
      })
    ];

    this.sounds = [
      new Sound("A Elec Guitar", "./Player/sounds/A Elec Guitar.wav"),
      new Sound("Drum Set1", "./Player/sounds/Drum Set1.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Tick - Player" },
        this.whenIReceiveTickPlayer
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Loop" },
        this.whenIReceiveGameLoop
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Tick - Last" },
        this.whenIReceiveTickLast
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Loose Life" },
        this.whenIReceiveLooseLife
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Player - Bounce" },
        this.whenIReceivePlayerBounce
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Main Menu" },
        this.whenIReceiveMainMenu
      )
    ];

    this.vars.speedY = -1.5737704918032789;
    this.vars.gravity = -1.5;
    this.vars.speedX = 0;
    this.vars.lastValue = -105.48328412172387;
    this.vars.falling = 0;
    this.vars.touching = 1;
    this.vars.temp = 90;
    this.vars.distance = 1;
    this.vars.jumping = 0;
    this.vars.wallSlide = 0;
  }

  *whenGreenFlagClicked() {
    this.broadcast("Main Menu");
  }

  *moveInSteps(steps) {
    this.vars.falling += 1;
    for (let i = 0; i < steps; i++) {
      this.vars.lastValue = this.x;
      this.x += this.vars.speedX / steps;
      yield* this.checkTouchingSolid();
      if (this.vars.touching > 0) {
        yield* this.collideXSlopeOrWall();
      }
      this.vars.lastValue = this.y;
      this.y += this.vars.speedY / steps;
      yield* this.checkTouchingSolid();
      if (this.vars.touching > 0) {
        yield* this.collideYCeilingOrFloor();
      }
    }
  }

  *checkTouchingSolid() {
    if (
      this.touching(this.sprites["Level"].andClones()) ||
      this.touching(this.sprites["Platform"].andClones())
    ) {
      this.vars.touching = 1;
    } else {
      this.vars.touching = 0;
    }
  }

  *whenIReceiveTickPlayer() {
    yield* this.movedByMovingPlatform();
    yield* this.controlsUpAndDown();
    yield* this.controlsLeftAndRight();
    yield* this.moveInSteps(
      Math.abs(this.vars.speedY) + Math.abs(this.vars.speedX)
    );
  }

  *controlsUpAndDown() {
    if (this.keyPressed("up arrow")) {
      if (this.vars.wallSlide > 0 && this.vars.jumping == 0) {
        this.vars.jumping = 1;
        this.vars.falling = 3;
        this.vars.wallSlide = 0;
      }
      if (this.vars.falling < 3 && this.vars.jumping == 0) {
        this.vars.jumping = 1;
        this.vars.falling = 3;
      }
      if (
        this.vars.jumping > 0 &&
        this.vars.jumping < this.stage.vars.jumpDuration
      ) {
        this.vars.jumping += 1;
        this.vars.speedY = this.stage.vars.jumpForce;
      }
    } else {
      this.vars.jumping = 0;
    }
    this.vars.speedY += this.vars.gravity;
  }

  *controlsLeftAndRight() {
    if (this.keyPressed("left arrow")) {
      this.vars.speedX += 0 - this.stage.vars.acceleration;
    }
    if (this.keyPressed("right arrow")) {
      this.vars.speedX += this.stage.vars.acceleration;
    }
    this.vars.speedX = this.vars.speedX * this.stage.vars.resistance;
  }

  *resetAndBeginLevel() {
    this.stage.vars.invernableThing = 0;
    this.stage.vars.scene = 1;
    this.vars.speedX = 0;
    this.vars.speedY = 0;
    this.vars.falling = 99;
    this.direction = 90;
    yield* this.beginSceneGoToXY(1, -150, 55);
  }

  *whenIReceiveGameLoop() {
    this.effects.ghost = 0;
    while (true) {
      this.broadcast("Tick - Platforms ");
      this.broadcast("Tick - Player");
      this.broadcast("Tick - Last");
      yield;
    }
  }

  *whenIReceiveTickLast() {
    if (this.x > 235) {
      yield* this.beginSceneGoToXY(this.stage.vars.scene + 1, -235, 0);
    }
    if (this.x < -235) {
      yield* this.beginSceneGoToXY(this.stage.vars.scene + -1, 235, 0);
    }
    if (this.touching(this.sprites["Danger"].andClones())) {
      this.broadcast("Loose Life");
    }
  }

  *beginSceneGoToXY(scene2, x, y) {
    this.stage.vars.scene = scene2;
    this.x = x;
    this.broadcast("About to Change Scene");
    this.broadcast("Change Scene");
    /* TODO: Implement stop other scripts in sprite */ null;
    yield* this.wait(0);
    yield* this.fixCollisionDirection(0);
    this.broadcast("Game Loop");
  }

  *fixCollisionDirection(dir) {
    this.vars.temp = this.direction;
    this.vars.distance = 1;
    this.direction = dir;
    for (let i = 0; i < 64; i++) {
      yield* this.checkTouchingSolid();
      if (this.vars.touching < 1) {
        this.direction = this.vars.temp;
        return;
      }
      this.move(this.vars.distance);
      this.direction += 180;
      this.vars.distance += 1;
    }
  }

  *collideXSlopeOrWall() {
    yield* this.checkCanWallSlide();
    this.y += 1;
    yield* this.checkTouchingSolid();
    if (this.vars.touching > 0) {
      this.y += 1;
      yield* this.checkTouchingSolid();
      if (this.vars.touching > 0) {
        this.y += -2;
        this.x = this.vars.lastValue;
        this.vars.speedX = 0;
        return;
      }
      this.vars.speedX = this.vars.speedX * 0.8;
    }
    this.vars.speedX = this.vars.speedX * 0.95;
    yield* this.slip();
  }

  *collideYCeilingOrFloor() {
    this.y = this.vars.lastValue;
    if (this.vars.speedY > 0) {
      this.vars.speedY = 0;
      return;
    }
    if (this.vars.falling > 0) {
      this.vars.falling = 0;
      yield* this.slip();
    }
    this.vars.speedY = this.vars.speedY * 0.8;
  }

  *slip() {
    this.y += -2;
    this.x += 1;
    yield* this.checkTouchingSolid();
    if (this.vars.touching < 1) {
      this.vars.falling = 9;
      this.vars.speedX += 1;
      return;
    }
    this.x += -2;
    yield* this.checkTouchingSolid();
    if (this.vars.touching < 1) {
      this.vars.falling = 9;
      this.vars.speedX += -1;
      return;
    }
    this.y += 2;
    this.x += 1;
  }

  *checkCanWallSlide() {
    if (this.vars.falling < 2) {
      this.vars.wallSlide = 0;
      return;
    }
  }

  *whenIReceiveLooseLife() {
    this.stage.vars.invernableThing = 1;
    /* TODO: Implement stop other scripts in sprite */ null;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    yield* this.wait(0.5);
    this.stage.vars.lives += -1;
    if (this.stage.vars.lives > 0) {
      yield* this.resetAndBeginLevel();
    } else {
      this.broadcast("Game Over");
    }
  }

  *movedByMovingPlatform() {
    yield* this.checkTouchingSolid();
    if (this.vars.touching > 0) {
      yield* this.fixCollisionDirection(0);
      if (this.vars.touching > 0) {
        this.broadcast("Loose Life");
      }
    }
  }

  *whenIReceiveStartGame() {
    this.vars.gravity = -1.5;
    this.stage.vars.jumpForce = 12;
    this.stage.vars.jumpDuration = 6;
    this.stage.vars.acceleration = 1.5;
    this.stage.vars.lives = 3;
    this.stage.vars.resistance = 0.8;
    yield* this.resetAndBeginLevel();
  }

  *whenIReceivePlayerBounce() {
    this.vars.speedY = 10;
  }

  *whenIReceiveMainMenu() {
    while (true) {
      /* TODO: Implement music_playDrumForBeats */ null;
      /* TODO: Implement music_setInstrument */ null;
      /* TODO: Implement music_playNoteForBeats */ null;
      /* TODO: Implement music_playNoteForBeats */ null;
      /* TODO: Implement music_playNoteForBeats */ null;
      /* TODO: Implement music_setInstrument */ null;
      /* TODO: Implement music_playNoteForBeats */ null;
      /* TODO: Implement music_playNoteForBeats */ null;
      /* TODO: Implement music_playNoteForBeats */ null;
      yield;
    }
  }
}
