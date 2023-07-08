import { raio } from "./constant.js";
import { canvaHeight } from "./constant.js";
import { canvaWidth } from "./constant.js";
import { bord } from "./constant.js";
import { diametro } from "./constant.js";

const LIGHT_WIDTH = 29;
const LIGHT_HEIGHT = 46;

const PORT_WIDTH = 78;
const PORT_HEIGHT = 35;

const LEAF_WIDTH = 85;
const LEAF_HEIGHT = 84;

const TUBE_WIDTH = 17;
const TUBE_HEIGHT = 36;

const FLOOR_WIDTH = 640;
const FLOOR_HEIGHT = 360;

export const CLICK_AREA_W = PORT_WIDTH;
export const CLICK_AREA_H = PORT_HEIGHT;

const SCALE = 1;
const ON = 1;
const OFF = 0;

export class Ui{
    context;
    onLight = new Image();
    offLight = new Image();
    andModPort = [];
    orModPort = [];
    andNoModPort = [];
    orNoModPort = [];
    energyFont = [];
    leftTube = [];
    rightTube = [];
    floor = new Image()


    constructor(cntx){
        this.context = cntx;
        this.onLight.src = "./res/onLamp.png";
        this.offLight.src = "./res/offLamp.png";
        this.floor.src = "./res/floor.png";

        /*Cada modelo de porta tem sua respectiva
        representação para ligado e desligado
        diferenciando se sua saída é true ou false.
        Portas que não podem ser modificadas também
        modelos diferentes daqueles que podem*/

        this.andModPort[OFF] = new Image();
        this.andModPort[OFF].src = "./res/andOffPortMod.png";
        this.andModPort[ON] = new Image();
        this.andModPort[ON].src = "./res/andOnPortMod.png";
        
        this.orModPort[OFF] = new Image();
        this.orModPort[OFF].src = "./res/orOffPortMod.png";
        this.orModPort[ON] = new Image();
        this.orModPort[ON].src = "./res/orOnPortMod.png";
        
        this.andNoModPort[OFF] = new Image();
        this.andNoModPort[OFF].src = "./res/andOffPortNoMod.png";
        this.andNoModPort[ON] = new Image();
        this.andNoModPort[ON].src = "./res/andOnPortNoMod.png";

        this.orNoModPort[OFF] = new Image();
        this.orNoModPort[OFF].src = "./res/orOffPortNoMod.png";
        this.orNoModPort[ON] = new Image();
        this.orNoModPort[ON].src = "./res/orOnPortNoMod.png";

        this.energyFont[OFF] = new Image();
        this.energyFont[OFF].src = "./res/energyOffSource.png";
        this.energyFont[ON] = new Image();
        this.energyFont[ON].src = "./res/energyONSource.png";

        this.rightTube[OFF] = new Image();
        this.rightTube[OFF].src = "./res/offRightTube.png"
        this.rightTube[ON] = new Image();
        this.rightTube[ON].src = "./res/onRightTube.png"

        this.leftTube[OFF] = new Image();
        this.leftTube[OFF].src = "./res/offLeftTube.png"
        this.leftTube[ON] = new Image();
        this.leftTube[ON].src = "./res/onLeftTube.png"
    }

    paintGameBoard(head){
        const x = canvaWidth/2;
        const y = raio;

        let light;
        
        if(head.getOutput()){
            light = this.onLight;
        }
        else{
            light = this.offLight;
        }

        this.context.clearRect(0, 0, canvaWidth , canvaHeight);
        //this.context.drawImage(this.floor, 0, 0, FLOOR_WIDTH*SCALE, FLOOR_HEIGHT*SCALE);

        this.paintLine(x, y + diametro, canvaWidth/2, y + bord);
        this.context.drawImage(light, x - LIGHT_WIDTH * SCALE / 2, y, LIGHT_WIDTH*SCALE, LIGHT_HEIGHT*SCALE);
        
        this.paintTree(head, canvaWidth/2, y + bord);
    }

    paintTree(head, x, y){

        head.x = x;
        head.y = y;

        this.paintPort(head);

        if(head.Linput != null){
            this.paintLeftTube(head);
            this.paintTree(head.Linput, x - bord, y + (PORT_HEIGHT/1.3 + TUBE_HEIGHT)*SCALE);
        }

        if(head.Rinput != null){
            this.paintRightTube(head);
            this.paintTree(head.Rinput, x + bord, y + PORT_HEIGHT*SCALE/1.3 + TUBE_HEIGHT);
        }
    }

    paintRightTube(head){
        let x = head.x + PORT_WIDTH*SCALE - 3;
        let y = head.y + PORT_HEIGHT*SCALE/1.3;

        if(head.Rinput.getOutput()){
            this.context.drawImage(this.rightTube[ON], x - PORT_WIDTH*SCALE/2, y, TUBE_WIDTH * SCALE, TUBE_HEIGHT * SCALE);
        }else{
            this.context.drawImage(this.rightTube[OFF], x - PORT_WIDTH*SCALE/2, y, TUBE_WIDTH * SCALE, TUBE_HEIGHT * SCALE);
        }

    }

    paintLeftTube(head){
        
        let x = head.x - (TUBE_WIDTH)*SCALE + 10;
        let y = head.y + PORT_HEIGHT*SCALE/1.3;
        
        if(head.Linput.getOutput()){
            this.context.drawImage(this.leftTube[ON], x - PORT_WIDTH*SCALE/2, y, TUBE_WIDTH * SCALE, TUBE_HEIGHT * SCALE);
        }else{
            this.context.drawImage(this.leftTube[OFF], x - PORT_WIDTH*SCALE/2, y, TUBE_WIDTH * SCALE, TUBE_HEIGHT * SCALE);
        }
        
    }

    paintPort(head){

        if(head.getOutput()){

            if(head.mod){

                if(head.port.id == "AND"){
                    this.context.drawImage(this.andModPort[ON], head.x - PORT_WIDTH*SCALE/2, head.y, PORT_WIDTH*SCALE, PORT_HEIGHT*SCALE);
                }else if(head.port.id == "OR") {
                    this.context.drawImage(this.orModPort[ON], head.x - PORT_WIDTH*SCALE/2, head.y, PORT_WIDTH*SCALE, PORT_HEIGHT*SCALE);
                }

            }else{
                if(head.port.id == "AND"){
                    this.context.drawImage(this.andNoModPort[ON], head.x - PORT_WIDTH*SCALE/2, head.y, PORT_WIDTH*SCALE, PORT_HEIGHT*SCALE);
                }else if(head.port.id == "OR"){
                    this.context.drawImage(this.orNoModPort[ON], head.x - PORT_WIDTH*SCALE/2, head.y, PORT_WIDTH*SCALE, PORT_HEIGHT*SCALE);
                }else{
                    this.paintLeaf(head);
                }
            }

        }else{

            if(head.mod){

                if(head.port.id == "AND"){
                    this.context.drawImage(this.andModPort[OFF], head.x - PORT_WIDTH*SCALE/2, head.y, PORT_WIDTH*SCALE, PORT_HEIGHT*SCALE);
                }else if(head.port.id == "OR"){
                    this.context.drawImage(this.orModPort[OFF], head.x - PORT_WIDTH*SCALE/2, head.y, PORT_WIDTH*SCALE, PORT_HEIGHT*SCALE);
                }

            }else{

                if(head.port.id == "AND"){
                    this.context.drawImage(this.andNoModPort[OFF], head.x - PORT_WIDTH*SCALE/2, head.y, PORT_WIDTH*SCALE, PORT_HEIGHT*SCALE);
                }else if(head.port.id == "OR"){
                    this.context.drawImage(this.orNoModPort[OFF], head.x - PORT_WIDTH*SCALE/2, head.y, PORT_WIDTH*SCALE, PORT_HEIGHT*SCALE);
                }else{
                    this.paintLeaf(head);
                }

            }
        }

    }

    paintLeaf(head){
        if(head.port.id == "TRUE"){
            this.context.drawImage(this.energyFont[ON], head.x - LEAF_WIDTH*SCALE/2, head.y - LEAF_HEIGHT*SCALE/2, LEAF_WIDTH*SCALE, LEAF_HEIGHT*SCALE);
        }else if(head.port.id == "FALSE"){
            this.context.drawImage(this.energyFont[OFF], head.x - LEAF_WIDTH*SCALE/2, head.y - LEAF_HEIGHT*SCALE/2, LEAF_WIDTH*SCALE, LEAF_HEIGHT*SCALE);
        }
    }

    paintLine(x1, y1, x2, y2){
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }


}