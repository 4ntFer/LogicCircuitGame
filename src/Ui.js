import { canvaHeight } from "./constant.js";
import { canvaWidth } from "./constant.js";
import { handleMove } from "./haddleListener.js";

const SCALE = 1.5;

const LIGHT_WIDTH = 29*SCALE;
const LIGHT_HEIGHT = 46*SCALE;

const PORT_WIDTH = 78*SCALE;
const PORT_HEIGHT = 35*SCALE;

const LEAF_WIDTH = 85*SCALE;
const LEAF_HEIGHT = 84*SCALE;

const TUBE_WIDTH = 20*SCALE;
const TUBE_HEIGHT = 20*SCALE;

const FLOOR_WIDTH = 640*SCALE;
const FLOOR_HEIGHT = 360*SCALE;

const EDGE = PORT_WIDTH;

export const CLICK_AREA_W = PORT_WIDTH;
export const CLICK_AREA_H = PORT_HEIGHT;

const ON = 1;
const OFF = 0;

export class Ui{
    onLight = new Image();
    offLight = new Image();
    andModPort = [];
    orModPort = [];
    andNoModPort = [];
    orNoModPort = [];
    energyFont = [];
    leftTube = [];
    rightTube = [];
    horizontalTube = [];
    verticalTube = [];
    floor = new Image()

    offsetX = EDGE;
    offsetY = canvaWidth/2;

    horizontalPositiveMove = false;
    horizontalNegativeMove = false;

    verticalPositiveMove = false;
    verticalNegativeMove = false;

    canva;
    context;


    constructor(canva, head){
        this.canva = canva;
        this.context = canva.getContext('2d');

        this.canva.addEventListener('mousemove', (event)=>{
            handleMove(event, this);
        });


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

        this.horizontalTube[OFF] = new Image();
        this.horizontalTube[OFF].src = "./res/offMidTubeH.png";
        this.horizontalTube[ON] = new Image();
        this.horizontalTube[ON].src = "./res/onMidTubeH.png"

        this.verticalTube[OFF] = new Image();
        this.verticalTube[OFF].src = "./res/offMidTubeV.png"
        this.verticalTube[ON] = new Image();
        this.verticalTube[ON].src = "./res/onMidTubeV.png"

        this.verticalTube[ON].onload = ()=>{
            this.paintGameBoard(head);
        }
    }

    //redesenha toda a tela da gameplay
    paintGameBoard(head){
        const x = canvaWidth/2;
        const y = EDGE;

        this.offSetRecalculate();

        let light;
        
        if(head.getOutput()){
            light = this.onLight;
        }
        else{
            light = this.offLight;
        }

        this.context.clearRect(0, 0, canvaWidth , canvaHeight);
        //this.context.drawImage(this.floor, 0, 0, FLOOR_WIDTH*SCALE, FLOOR_HEIGHT*SCALE);

        this.paintLine(x, y + EDGE, canvaWidth/2, y + EDGE);
        this.context.drawImage(light, x - LIGHT_WIDTH/ 2  - this.offsetX, y - this.offsetY , LIGHT_WIDTH, LIGHT_HEIGHT);

        this.paintTree(head, canvaWidth/2 - this.offsetX , y + EDGE - this.offsetY);
    }

    //desenha a arvore de portas
    paintTree(head, x, y){
        let flag = false;

        head.x = x;
        head.y = y;

        this.paintPort(head);

        if(head.Linput != null){

            this.paintTree(head.Linput, x - EDGE - head.Linput.bifurcation*EDGE , y + (PORT_HEIGHT/1.3 + TUBE_HEIGHT) + head.Linput.bifurcation*EDGE/2 );
            this.paintLeftTube(head);
        }

        if(head.Rinput != null){
           
            
            this.paintTree(head.Rinput, x + EDGE + head.Rinput.bifurcation*EDGE , y + PORT_HEIGHT/1.3 + TUBE_HEIGHT + head.Rinput.bifurcation * 2 );
            this.paintRightTube(head);
        }

        /*if(head.Linput != null){
            this.paintLine(x, y, x - EDGE - head.Linput.bifurcation*EDGE, y + (PORT_HEIGHT/1.3 + TUBE_HEIGHT)*SCALE);
        }

        if(head.Rinput != null){
            this.paintLine(x, y, x + EDGE + head.Rinput.bifurcation*EDGE, y + (PORT_HEIGHT/1.3 + TUBE_HEIGHT)*SCALE);
        }*/
    }

    //desenha o tubo direito à porta
    paintRightTube(head){
        let x = head.x + PORT_WIDTH/2 ;
        let y = head.y + PORT_HEIGHT/2 - 5 ;

        let w = head.Rinput.x - x;
        let h = head.Rinput.y - y - PORT_HEIGHT/2;


        if(head.Rinput.port.id!="TRUE" && head.Rinput.port.id!="FALSE"){
            
            if(head.Rinput.getOutput()){
                this.context.drawImage(this.horizontalTube[ON],  x, y, w, TUBE_HEIGHT);
                this.context.drawImage(this.rightTube[ON], x + w, y, TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.verticalTube[ON], head.Rinput.x + 1, y + TUBE_HEIGHT - 2, TUBE_WIDTH, h);
            }else{

                
                this.context.drawImage(this.horizontalTube[OFF], x, y, w, TUBE_HEIGHT);
                this.context.drawImage(this.rightTube[OFF], x + w, y, TUBE_WIDTH , TUBE_HEIGHT);
                this.context.drawImage(this.verticalTube[OFF],head.Rinput.x + 1,  y + TUBE_HEIGHT - 2, TUBE_WIDTH, h);
            }
        }

    }

    //desenha o tubo esquerto à porta
    paintLeftTube(head){
        
        let x = head.x  - PORT_WIDTH /2 ;
        let y = head.y + TUBE_HEIGHT/2 ;

        let w = x - head.Linput.x;
        let h = head.Linput.y - y - PORT_HEIGHT/2;
        
        if(head.Linput.port.id!="TRUE" && head.Linput.port.id!="FALSE"){
            
            if(head.Linput.getOutput()){
                this.context.drawImage(this.horizontalTube[ON], head.Linput.x + TUBE_WIDTH, y, w - TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.leftTube[ON], head.Linput.x, y, TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.verticalTube[ON], head.Linput.x - 1, y + TUBE_HEIGHT - 2, TUBE_WIDTH, h);
            }else{

                
                this.context.drawImage(this.horizontalTube[OFF], head.Linput.x + TUBE_WIDTH, y, w - TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.leftTube[OFF], head.Linput.x, y, TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.verticalTube[OFF], head.Linput.x - 1,  y + TUBE_HEIGHT - 2, TUBE_WIDTH, h);
            }
        }
        
    }

    //desenha a porta
    paintPort(head){

        if(head.getOutput()){

            if(head.mod){
                //caso a porta seja modificavel e esteja ligada

                if(head.port.id == "AND"){
                    this.context.drawImage(this.andModPort[ON], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                }else if(head.port.id == "OR") {
                    this.context.drawImage(this.orModPort[ON], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                }

            }else{
                //caso a porta não seja modificavel e esteja ligada
                if(head.port.id == "AND"){
                    this.context.drawImage(this.andNoModPort[ON], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                }else if(head.port.id == "OR"){
                    this.context.drawImage(this.orNoModPort[ON], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                }else{
                    this.paintLeaf(head);
                }
            }

        }else{

            
            if(head.mod){
            //caso a porta seja modificavel e esteja desligada
                
                if(head.port.id == "AND"){
                    this.context.drawImage(this.andModPort[OFF], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                }else if(head.port.id == "OR"){
                    this.context.drawImage(this.orModPort[OFF], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                }

            }else{
                //caso a porta não seja modificavel e esteja desligada

                if(head.port.id == "AND"){
                    this.context.drawImage(this.andNoModPort[OFF], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                }else if(head.port.id == "OR"){
                    this.context.drawImage(this.orNoModPort[OFF], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                }else{
                    this.paintLeaf(head);
                }

            }
        }

    }

    //desenha os nós folhas que são portas booleanas
    paintLeaf(head){
        if(head.port.id == "TRUE"){
            this.context.drawImage(this.energyFont[ON], head.x - LEAF_WIDTH/2, head.y - LEAF_HEIGHT/2, LEAF_WIDTH, LEAF_HEIGHT);
        }else if(head.port.id == "FALSE"){
            this.context.drawImage(this.energyFont[OFF], head.x - LEAF_WIDTH/2, head.y - LEAF_HEIGHT/2, LEAF_WIDTH, LEAF_HEIGHT);
        }
    }

    //desenha linha
    paintLine(x1, y1, x2, y2){
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    offSetRecalculate(){
        if(this.horizontalPositiveMove){
            this.offsetX += 10;
        }else if(this.horizontalNegativeMove){
            this.offsetX -= 10;
        }
    
        if(this.verticalPositiveMove){
            this.offsetY += 10;
        }else if(this.verticalNegativeMove){
            this.offsetY -= 10;
        }
    }
}