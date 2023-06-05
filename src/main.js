
import { FalsePort } from "./FalsePort.js";
import {Node} from "./Node.js";
import { TruePort } from "./TruePort.js";
import { AndPort } from "./AndPort.js"; 
import { OrPort } from "./OrPort.js"; 

export class Main{
    context;
    canvaWidth =  600;
    canvaHeight = 400;
    raio = 30;

    constructor(cntx){
        this.context =  cntx;
    }

    start(){
        const TruePortNode = new Node(null, null, new TruePort);
        const FalsePortNode = new Node(null, null, new FalsePort);

        let G = []; // vetor de node
        G.push(new Node(TruePortNode, TruePortNode, new AndPort()));
        
        
        this.paintGameBoard(G.pop());
    }

    paintGameBoard(head){
        const x = this.canvaWidth/2;
        const y = this.raio;
        const raio = this.raio
        const bord = 4*raio
        const diametro = raio*2

        this.context.beginPath();
        this.context.arc(x, y + raio, raio, 0, Math.PI/2, true);
        this.context.stroke();

        console.log(head.getOutput());
        this.context.fillText(head.getOutput(), x - raio / 2 , y + raio);

        this.paintLine(x, y + diametro, this.canvaWidth/2, y + bord);

        this.paintTree(head, this.canvaWidth/2, y + bord);
    }

    paintTree(head, x, y){
        const raio = this. raio;
        const diametro = raio*2;
        const bord = 4*raio

        let xInitLine = x;
        let yInitLine = y + diametro

        this.context.beginPath();
        this.context.arc(x, y + raio, raio, 0, Math.PI/2, true);
        this.context.stroke();
        

        this.context.fillText(head.port.id, x - raio / 2 , y + raio);

        if(head.Linput != null){
            this.paintLine(xInitLine - 30 , yInitLine - 15, xInitLine - bord, yInitLine + bord/2);
            this.paintTree(head.Linput, x - bord, y + bord);
        }

        if(head.Rinput != null){
            this.paintLine(xInitLine + 30, yInitLine - 15, xInitLine + bord, yInitLine + bord/2);
            this.paintTree(head.Rinput, x + bord, y + bord);
        }
    }

    paintLine(x1, y1, x2, y2){
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }
}