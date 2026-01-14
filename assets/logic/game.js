import {Manager} from "./manager.js";
import {Player} from "./player.js";
import {ScrollingBackground} from "./bghelper.js";

export class GameEngine {
  constructor({ targetFps = 60, targetEl = document.body } = {}) {
    this.targetFps = targetFps;
    this.targetEl = targetEl;
    this.deltaTime = 0;
    this.lastTime = 0;
    this.isRunning = false;
    this.frameRequest = null;
    this.gametime = 30000;
    this.background = new ScrollingBackground(this.targetEl);
    this.timeLeft = 120;
    this.gameState = "playing";

    this.manager
    this.player

    this.#init();
  }

  #init() {
    this.manager = new Manager(this.targetEl);
    this.player = new Player({parent:this.targetEl, frameCount: 10, width:29, height:39});
    this.hud = document.createElement("div");
    this.hud.className = "hud";
    this.hud.innerHTML = `
      <div class="lives">Lives: 3</div>
      <div class="timer">02:00 <span>until you reach the arc!</span></div>
    `;
    this.targetEl.appendChild(this.hud);
    this.start();
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastTime = performance.now();
      this.#gameLoop(this.lastTime);
    }
  }

  lose() {
    this.gameState = "lose";

    this.loseScreen = document.createElement("div");
    this.loseScreen.className = "loseScreen";

    const text = document.createElement("div");
    text.className = "lose";
    text.textContent = "game over yeahh";

    const btn = document.createElement("button");
    btn.className = "btnRestart";
    btn.textContent = "Play again";

    btn.addEventListener("click", () => {
      this.loseScreen.remove();
      this.reset();
      this.start();
    });

    this.loseScreen.append(text, btn);
    this.targetEl.appendChild(this.loseScreen);

    this.stop();
  }

  win() {
    this.gameState = "win";

    this.winScreen = document.createElement("div");
    this.winScreen.className = "winScreen";

    const text = document.createElement("div");
    text.className = "win";
    text.textContent = "You arrived at the arc!";

    const btn = document.createElement("button");
    btn.className = "btnRestart";
    btn.textContent = "Play again";

    btn.addEventListener("click", () => {
      this.winScreen.remove();
      this.reset();
      this.start();
    });

    this.winScreen.append(text, btn);
    this.targetEl.appendChild(this.winScreen);

    this.stop();
  }

  stop() {
    this.isRunning = false;
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
  }

  reset() {
    this.timeLeft = 120;
    this.player.lives = 3;
    this.manager.destroyAll();
    this.player.x = 100;
    this.player.y = 300;
    this.gameState = "playing";
  }

  #gameLoop(currentTime) {
    if (!this.isRunning) return;

    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update(this.deltaTime);
    this.draw();

    this.frameRequest = requestAnimationFrame((t) => this.#gameLoop(t));
  }

  updateHUD() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = Math.floor(this.timeLeft % 60)
      .toString()
      .padStart(2, "0");

    this.hud.querySelector(".lives").textContent =
      `Lives: ${this.player.lives}`;

    this.hud.querySelector(".timer").innerHTML =
      `${minutes}:${seconds} <span>until you reach the Arc!</span>`;
  }

  update(deltaTime) {
    if (this.gameState !== "playing") return;

    this.timeLeft -= deltaTime;
    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      console.log("win");
      this.win();
    }
    setTimeout(() => {
    if (this.player.lives <= 0) {
      console.log("lost");
      this.lose();
    }
    }, 1);

    this.background.update(deltaTime);
    this.manager.update(deltaTime);
    this.player.update(deltaTime, this.manager.cars, this.manager.birds);

    this.updateHUD();
  }

  draw() {
    this.manager.draw();
    this.player.draw();
  }
}

