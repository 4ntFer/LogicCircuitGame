
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
        this.gui = new Ui(canva.getContext("2d"));
    }

    start(){
        /*const TruePortNode = new Node(null, null, new TruePort);
        const FalsePortNode = new Node(null, null, new FalsePort);

        let G = []; // vetor de node
        let node = new Node(TruePortNode, FalsePortNode, new AndPort());
        let vet = [];
        let ui = this.gui;

        vet.push(new OrPort());
        node.setMod(vet);

        G.push(node);
        
        this.gui.paintGameBoard(G[0]);
        this.canva.addEventListener('click', function(event){
            handleClick(event, G);
            ui.paintGameBoard(G[0]);
        });*/

        let ui = this.gui;

        let game = new Game();
        game.init(4,2);

        for(let i = 0 ; i<game.G.length ; i++){
            console.log(game.G[i]);
        }

        this.gui.paintGameBoard(game.G[0]);
        this.canva.addEventListener('click', function(event){
            handleClick(event, game.G);
            ui.paintGameBoard(game.G[0]);
        })
    }
}