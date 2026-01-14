export class ScrollingBackground {
  constructor(container) {
    this.container = container;

    this.far = document.createElement("div");
    this.road = document.createElement("div");

    this.far.className = "bg-layer bg-far";
    this.road.className = "bg-layer bg-road";

    container.appendChild(this.far);
    container.appendChild(this.road);

    this.farX = 0;
    this.roadX = 0;

    this.farSpeed = 10;
    this.roadSpeed = 80;
  }

  update(deltatime) {
    this.farX -= this.farSpeed * deltatime;
    this.roadX -= this.roadSpeed * deltatime;

    this.far.style.backgroundPositionX = `${this.farX}px`;
    this.road.style.backgroundPositionX = `${this.roadX}px`;
  }
}
