import {AndPort} from "./AndPort.js";
import {OrPort} from "./OrPort.js";
import { TruePort } from "./TruePort.js";
import {FalsePort} from "./FalsePort.js"

export class Node{
    x = 0;
    y = 0;
    Linput = null;
    Rinput = null;
    port; //a porta atual do nó
    mod = false //define se o nó pode ou não se modificado
    vet = []; /* caso mod == true, define quais portas o atributo
        port pode assumir*/
    portIndex = 0; //define o elemento em vet

    bifurcation = 0;    /*O peso que mede a quantide de nós
        em que seus filhos não são folhas,
        é utilizado para definir o espaçamento 
        horizontal e vertical entre o nó pai e o nó filho*/

    constructor(){

    }

    //retorna a saída da porta
    getOutput(){
        return this.port.result(this.Linput, this.Rinput);
    }

    //define o nó como modificavel
    setMod(vet){
        this.mod = true;
        this.vet = vet;
        this.portIndex = vet.length - 1;
        this.port = vet[this.portIndex];
    }

    //muda a porta do nó
    modify(){
        //Por que - 1? Sem está dando problema de overflow, mas não sei porque
        if(this.portIndex < this.vet.length - 1){
            this.portIndex++;
        }else{
            this.portIndex = 0;
        }

        
        this.port = this.vet[this.portIndex];
    }
}