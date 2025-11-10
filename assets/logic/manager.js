import { Block } from "./block.js";

export class Manager {
    constructor(parent = document.body) {
        this.amount = 3;
        this.arr = [];
        this.#init();
    }

    #init(){
        for(let x = 0; x < this.amount; x++){
            let block = new Block();
            this.arr.push(block);
        }
    }

    update(deltaTime){
        for(let x = 0; x < this.amount; x++){
            this.arr[x].update(deltaTime);
        }
    }
    draw(deltaTime){
        for(let x = 0; x < this.amount; x++){
            this.arr[x].draw();
        }
    }
}