import {CLICK_AREA_W} from "./Ui.js";
import {CLICK_AREA_H} from "./Ui.js";
import { canvaHeight } from "./constant.js";
import { canvaWidth } from "./constant.js";
import {Ui} from "./Ui.js";

export function handleClick(event, G, gui){
    let clickX = event.offsetX;
    let clickY = event.offsetY;

    
    for(let i = 0 ; i < G.length ; i++){

        if(clickX > G[i].x - CLICK_AREA_W/2 && clickX < G[i].x + CLICK_AREA_W/2
            && clickY > G[i].y && clickY < G[i].y + CLICK_AREA_H){

            if(G[i].mod){
                G[i].modify();
            }

            
        }
    }


}

export function handleMove(event, gui){
    let mousePositionX =  event.offsetX;
    let mousePositionY = event.offsetY;

    if(mousePositionX >= canvaWidth*0.8){
        gui.horizontalPositiveMove= true;
    }else{
        gui.horizontalPositiveMove= false;
    }
    
    if(mousePositionX<= canvaWidth*0.2){
        gui.horizontalNegativeMove = true;
    }else{
        gui.horizontalNegativeMove = false;
    }

    if(mousePositionY >= canvaHeight*0.8){
        gui.verticalPositiveMove= true;
    }else{
        gui.verticalPositiveMove= false;
    }
    
    if(mousePositionY<= canvaHeight*0.2){
        gui.verticalNegativeMove = true;
    }else{
        gui.verticalNegativeMove = false;
    }
}