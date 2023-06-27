import {diametro} from "./constant.js";
import {Ui} from "./Ui.js";

export function handleClick(event, G, gui){
    let clickX = event.offsetX;
    let clickY = event.offsetY;
    let Ui = gui;

    
    for(let i = 0 ; i < G.length ; i++){

        if(clickX > G[i].x - diametro && clickX < G[i].x + diametro
            && clickY > G[i].y - diametro && clickY < G[i].y + diametro){

            if(G[i].mod){
                G[i].modify();
            }

            
        }
    }


}