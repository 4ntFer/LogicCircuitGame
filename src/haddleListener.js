import {CLICK_AREA} from "./Ui.js";
import {Ui} from "./Ui.js";

export function handleClick(event, G, gui){
    let clickX = event.offsetX;
    let clickY = event.offsetY;
    let Ui = gui;

    
    for(let i = 0 ; i < G.length ; i++){

        if(clickX > G[i].x - CLICK_AREA && clickX < G[i].x + CLICK_AREA
            && clickY > G[i].y - CLICK_AREA && clickY < G[i].y + CLICK_AREA){

            if(G[i].mod){
                G[i].modify();
            }

            
        }
    }


}