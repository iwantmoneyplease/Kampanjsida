export class Player {
    constructor({
        parent = document.body,
        width,
        height,
        frameCount = 2, //see next comment
        frameSpeed = 24,
    }) {

        this.parent = parent;

        this.element = document.createElement("div");
        this.element.id = "player";
        parent.appendChild(this.element);
        this.width = width;
        this.height = height;
        this.frameWidth = width;
        this.frameHeight = height;
        this.frameCount = 2; //for some reason if this tries to read framecount the sprite breaks completely
        this.frameDuration = 1 / frameSpeed;
        this.frameDistance = 0;
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.x = 100;
        this.y = 300;
        this.yVelocity = 0;
        this.xVelocity = 0;
        this.speed = 200;
        this.gravity = 800;
        this.jumpForce = -400;
        this.groundY = 300;
        this.onGround = true;
        this.moving = false;
        this.lives = 3;
        this.canLoseLife = true;
        this.animation = "assets/img/jumpman_run.png";
        this.state = "run";
        this.canBoost = true;
        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.backgroundImage = `url(${this.animation})`;
        this.element.style.backgroundRepeat = "no-repeat";
        this.element.style.backgroundSize = `${this.frameWidth * this.frameCount}px ${this.frameHeight}px`;
        this.element.style.backgroundPosition = "0 0";

        this.keys = {};
        document.addEventListener("keydown", (e) => (this.keys[e.code] = true));
        document.addEventListener("keyup", (e) => (this.keys[e.code] = false));
    }

    update(deltaTime, cars, birds) {
        this.xVelocity = 0;
        const containerWidth = this.parent.clientWidth;
        const containerHeight = this.parent.clientHeight;

        if (this.keys["KeyA"]) {
            this.xVelocity = -this.speed
            this.moving = true;
        }
        if (this.keys["KeyD"]) {
            this.xVelocity = this.speed
            this.moving = true;
        }
        if (this.keys["KeyW"] && this.onGround) {
            this.jump();
        }
        this.x += this.xVelocity * deltaTime;
        this.yVelocity += this.gravity * deltaTime;
        let y = this.y + (this.yVelocity * deltaTime);
        cars.forEach((car) => {
        if (this.x + this.width > car.x && this.x < car.x + 59) {

            if (!this.onGround) {
                if (y + this.height > car.y + 10 && this.canBoost) {
                    this.jump();
                    car.triggerBoost();

                }
            }
            else {
            this.x = car.x - this.width;
            this.loseLife();
            }
        }
        });
        birds.forEach((bird) => {
        if (this.x + this.width > bird.x && this.x < bird.x + 20) {
                if (this.y + this.height > bird.y == this.y + this.height < bird.y + 8) {
                    this.loseLife();
                }
            }
        });

        this.y = this.y + (this.yVelocity * deltaTime);

        if (this.y >= this.groundY) {
            this.y = this.groundY;
            this.yVelocity = 0;
            this.onGround = true;
        }

        if (this.x < 0) {
            this.x = 0
        };
        if (this.x + this.width > containerWidth) {
            this.x = containerWidth - this.width
        };
        if (this.y < 0) {
            this.y = 0
        };
        if (this.y + this.height > containerHeight) {
            this.y = containerHeight - this.height
        };

        this.frameTimer += deltaTime;
        if (this.moving == true) {
            if (this.frameTimer >= this.frameDuration) {
                this.frameTimer = 0;
                this.currentFrame = (this.currentFrame + 1) % this.frameCount;
            }
        }

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.moving = false;

        this.draw();
    }
    
    loseLife() {
        if (!this.canLoseLife) return;

        this.canLoseLife = false;
        this.lives--;

        setTimeout(() => {
            this.canLoseLife = true;
        }, 1000);
    }

    jump(){
        this.yVelocity = this.jumpForce;
        this.onGround = false;
        this.currentFrame = 0;
    }

    draw() {
        this.element.style.backgroundPosition =
            `${-this.currentFrame * this.frameWidth}px 0px`;
    }
}
