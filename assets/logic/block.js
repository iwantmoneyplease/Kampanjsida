export class Block {
  constructor(parent = document.body) {
    this.x = 60;
    this.y = Math.random() * (window.innerHeight - 60);
    this.div = document.createElement("div");
    this.div.classList.add("block");
    parent.appendChild(this.div);
    this.parentSize = parent.getBoundingClientRect();
    console.log(this.parentSize.width);
    this.speed = -20;
  }

  resetPosition() {
    this.x = this.parentSize.width + 60;
    this.y = Math.random() * (this.parentSize.height - 60);
  }

  update(deltatime) {
    this.x += this.speed * deltatime;
    if (this.x < -60) {
      this.resetPosition();
    }
  }

  draw() {
    this.div.style.left = `${this.x}px`;
    this.div.style.top = `${this.y}px`;
  }
}
