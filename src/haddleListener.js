import {CLICK_AREA_W} from "./Ui.js";
import {CLICK_AREA_H} from "./Ui.js";
import { canvaHeight } from "./constant.js";
import { canvaWidth } from "./constant.js";
import {Ui} from "./Ui.js";

export function handleClick(event, G, gui){
    let clickX = event.offsetX;
    let clickY = event.offsetY;

    if(clickX > gui.shortcutUI.outputButton.x && clickX < gui.shortcutUI.outputButton.x + gui.shortcutUI.outputButton.w
        && clickY > gui.shortcutUI.outputButton.y && clickY < gui.shortcutUI.outputButton.y + gui.shortcutUI.outputButton.h){
            
        if(gui.currentNode.output != null){
            gui.setCurrentNode(gui.currentNode.output);
            gui.executeShortcut();
        }
    }else if(clickX > gui.shortcutUI.LinputButton.x && clickX < gui.shortcutUI.LinputButton.x + gui.shortcutUI.LinputButton.w
        && clickY > gui.shortcutUI.LinputButton.y && clickY < gui.shortcutUI.LinputButton.y + gui.shortcutUI.LinputButton.h){
        
        if(gui.currentNode.Linput != null){
            gui.setCurrentNode(gui.currentNode.Linput);
            gui.executeShortcut();
        }
    }else if(clickX > gui.shortcutUI.RinputButton.x && clickX < gui.shortcutUI.RinputButton.x + gui.shortcutUI.RinputButton.w
        && clickY > gui.shortcutUI.RinputButton.y && clickY < gui.shortcutUI.RinputButton.y +  gui.shortcutUI.RinputButton.h){
 
        if(gui.currentNode.Rinput != null){
            gui.setCurrentNode(gui.currentNode.Rinput);
            gui.executeShortcut();
        }
    }
    
    for(let i = 0 ; i < G.length ; i++){

        if(clickX > G[i].x - CLICK_AREA_W/2 && clickX < G[i].x + CLICK_AREA_W/2
            && clickY > G[i].y && clickY < G[i].y + CLICK_AREA_H){

            if(G[i].mod){
                G[i].modify();
                gui.setCurrentNode(G[i]);
            }

            
        }
    }


}

export function handleMove(event, gui){
    let mousePositionX =  event.offsetX;
    let mousePositionY = event.offsetY;

    if(gui.inShotcutScene != true){
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
}