import {CLICK_AREA_W} from "./Ui.js";
import {CLICK_AREA_H} from "./Ui.js";
import {Ui} from "./Ui.js";

export function handleClick(event, G, gui){
    let clickX = event.offsetX;
    let clickY = event.offsetY;
    let Ui = gui;

    
    for(let i = 0 ; i < G.length ; i++){

        if(clickX > G[i].x - CLICK_AREA_W/2 && clickX < G[i].x + CLICK_AREA_W/2
            && clickY > G[i].y && clickY < G[i].y + CLICK_AREA_H){

            if(G[i].mod){
                G[i].modify();
            }

            
        }
    }


}