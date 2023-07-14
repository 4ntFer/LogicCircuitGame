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
        let mousePositionX;
        let mousePositionY;

        let game = new Game();
        game.init(20,20);

        this.gui = new Ui(this.canva, game.G[0], game.G.pop);
        ui = this.gui;
        this.canva.addEventListener('click', function(event){
            handleClick(event, game.G, ui);
        })

        setInterval(()=>{
            this.gui.paintGameBoard(game.G[0]);
        }, 10)
    }
}