export class Car {
  constructor(parent = document.body, speed) {
    this.parentSize = parent.getBoundingClientRect();
    this.x = this.parentSize.width + 60;
    this.y = 290;
    this.div = document.createElement("div");
    this.div.classList.add("car");
    parent.appendChild(this.div);

    this.speed = speed;
    this.gone = false;

    this.isBoosting = false;
    this.boostDuration = 0.3;
    this.boostTimer = 0;

    this.defaultBg = "url('/assets/img/car.png')";
    this.boostBg = "url('/assets/img/car-squish.png')";
    this.div.style.backgroundImage = this.defaultBg;
  }

  triggerBoost() {
    this.isBoosting = true;
    this.boostTimer = 0;
    this.div.style.backgroundImage = this.boostBg;
  }

  resetPosition() {
    this.x = this.parentSize.width + 60;
  }

  update(deltatime) {
    this.x += this.speed * deltatime;
    if (this.x < -60) {
      this.gone = true;
    }

    if (this.isBoosting) {
      this.boostTimer += deltatime;
      if (this.boostTimer >= this.boostDuration) {
        console.log("hej");
        this.isBoosting = false;
        this.div.style.backgroundImage = this.defaultBg;
      }
    }
  }

  draw() {
    this.div.style.left = `${this.x}px`;
    this.div.style.top = `${this.y}px`;
  }
}
