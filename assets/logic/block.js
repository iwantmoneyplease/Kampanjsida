export class Block {
  constructor(parent = document.body) {
    this.x = -60;
    this.y = Math.random() * (window.innerHeight - 60);
    this.div = document.createElement("div");
    this.div.classList.add("block");
    parent.appendChild(this.div);
    this.parentSize = parent.getBoundingClientRect();
    console.log(this.parentSize.width);
    this.speed = 200;
  }

  resetPosition() {
    this.x = -60;
    this.y = Math.random() * (window.innerHeight - 60);
  }

  update(deltatime) {
    this.x += this.speed * deltatime;
    if (this.x > this.parentSize.width) {
      this.resetPosition();
    }


  }

  draw() {
    this.div.style.left = `${this.x}px`;
    this.div.style.top = `${this.y}px`;
  }
}
