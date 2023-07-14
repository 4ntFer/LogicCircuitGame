/*Representa os atributos de um botão
*de atalho*/
export class ShortcutButton{
    x; //posição horizontal
    y; //posição vertical
    w; //largura
    h; //altura

    //atribui os valores do botão
    setVals(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}