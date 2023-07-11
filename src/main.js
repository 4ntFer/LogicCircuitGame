
import { FalsePort } from "./FalsePort.js";
import {Node} from "./Node.js";
import { TruePort } from "./TruePort.js";
import { AndPort } from "./AndPort.js"; 
import { OrPort } from "./OrPort.js"; 
import {handleClick} from "./haddleListener.js";
import {Ui} from "./Ui.js";
import {Game} from "./Game.js"

export class Main{
    context;
    wiondow;
    canva;
    gui;
    

    constructor(canva, window){
        this.canva =  canva;
        this.context = canva.getContext("2d");
        this.wiondow = window;
    }

    start(){
        let ui;

        let game = new Game();
        game.init(10,8);

        this.gui = new Ui(this.canva.getContext("2d"), game.G[0]);
        ui = this.gui;

        this.gui.paintGameBoard(game.G[0]);
        this.canva.addEventListener('click', function(event){
            handleClick(event, game.G);
            ui.paintGameBoard(game.G[0]);
        })
    }
}