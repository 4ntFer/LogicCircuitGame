import { ShortcutButton } from "./ShortcutButton.js";

/*Representa os botões de atalho
*de currentNode*/
export class ShortcutUIFunc{
    gui;
    outputButton = new ShortcutButton();
    LinputButton =  new ShortcutButton();
    RinputButton = new ShortcutButton();

    constructor(gui){
        this.gui = gui;
    }

    setOutputButtonPosition(x, y, w, h){
        this.outputButton.setVals(x,y,w,h);
    }

    setRinputButtonPosition(x, y, w, h){
        this.RinputButton.setVals(x,y,w,h);
    }

    setLinputButtonPosition(x, y, w, h){
        this.LinputButton.setVals(x,y,w,h);
    }
}