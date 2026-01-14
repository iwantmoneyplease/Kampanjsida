import { Bird } from "./bird.js";
import { Car } from "./car.js";

export class Manager {
    constructor(parent) {
        this.amount = 1;
        this.cars = [];
        this.birds = [];
        this.parent = parent;
        this.#init();
        this.timer = 0;
        this.newCar = 2;
    }

    #init(){
        let car = new Car(this.parent, -200);
        this.cars.push(car);
        let bird = new Bird(this.parent);
        this.birds.push(bird)
    }

    update(deltaTime){
        let newArr = [];
        this.timer += deltaTime;
        if(this.timer > this.newCar){
            let car = new Car(this.parent, Math.random()*-300);
            this.cars.push(car);
            this.timer = 0;
        }

        for(let x = 0; x < this.cars.length; x++){
            this.cars[x].update(deltaTime);
            if(!this.cars[x].gone){
                newArr.push(this.cars[x]);
            }else {
                this.cars[x].div.remove();
            }
        }
        this.cars = newArr;


        for(let x = 0; x < this.birds.length; x++){
            this.birds[x].update(deltaTime);
        }
    }
    
    destroyAll() {
    this.cars.forEach(car => car.div.remove());
    this.cars.length = 0;
    this.birds.forEach(bird => bird.div.remove());
    this.birds.length = 0;
    }

    draw(deltaTime){
        for(let x = 0; x < this.cars.length; x++){
            this.cars[x].draw();
        }
        for(let x = 0; x < this.birds.length; x++){
            this.birds[x].draw();
        }
    }
}