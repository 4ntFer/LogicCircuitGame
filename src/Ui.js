import { raio } from "./constant.js";
import { canvaHeight } from "./constant.js";
import { canvaWidth } from "./constant.js";
import { bord } from "./constant.js";
import { diametro } from "./constant.js";

export class Ui{
    context;

    constructor(cntx){
        this.context = cntx;
    }

    paintGameBoard(head){
        const x = canvaWidth/2;
        const y = raio;

        this.context.clearRect(0, 0, canvaWidth , canvaHeight);

        this.context.beginPath();
        this.context.arc(x, y + raio, raio, 0, Math.PI/2, true);
        this.context.stroke();

        this.context.fillText(head.getOutput(), x - raio / 2 , y + raio);

        this.paintLine(x, y + diametro, canvaWidth/2, y + bord);

        this.paintTree(head, canvaWidth/2, y + bord);
    }

    paintTree(head, x, y){

        head.x = x;
        head.y = y;

        let xInitLine = x;
        let yInitLine = y + diametro

        this.context.beginPath();
        this.context.arc(x, y + raio, raio, 0, Math.PI/2, true);
        this.context.stroke();
        

        this.context.fillText(head.port.id, x - raio / 2 , y +raio);

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