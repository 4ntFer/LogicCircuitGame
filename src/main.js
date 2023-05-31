
import { FalsePort } from "./FalsePort.js";
import {Node} from "./Node.js";
import { TruePort } from "./TruePort.js";
import { AndPort } from "./AndPort.js"; 
import { OrPort } from "./OrPort.js"; 

export class Main{
    context;
    canvaWidth =  600;
    canvaHeight = 400;

    constructor(cntx){
        this.context =  cntx;
    }

    start(){
        const TruePortNode = new Node(null, null, new TruePort);
        const FalsePortNode = new Node(null, null, new FalsePort);

        let G = []; // vetor de node
        G.push(new Node(FalsePortNode, FalsePortNode, new OrPort()));
        

        this.paintTree(G.pop(), this.canvaWidth/2, 10);
    }

    paintTree(head, x, y){
        const raio = 30;
        const bord = 4*raio

        this.context.beginPath();
        this.context.arc(x, y + raio, raio, 0, Math.PI/2, true);
        this.context.stroke();
        if(head.Linput != null){
            this.paintTree(head.Linput, x - bord, y + bord);
        }

        if(head.Rinput != null){
            this.paintTree(head.Rinput, x + bord, y + bord);
        }
    } 
}