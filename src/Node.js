import {AndPort} from "./AndPort.js";
import {OrPort} from "./OrPort.js";
import { TruePort } from "./TruePort.js";
import {FalsePort} from "./FalsePort.js"

export class Node{
    x = 0;
    y = 0;
    Linput = null;
    Rinput = null;
    port;
    mod = false
    vet = [];
    portIndex = 0;

    /*constructor(Linput, Rinput, port){
        this.Linput = Linput;
        this.Rinput = Rinput;

        if(Linput != null && Linput != null){
            port.setInput(Linput.getOutput(), Rinput.getOutput());
        
        }
        this.port = port;
    }*/

    constructor(){

    }

    getOutput(){
        return this.port.result(this.Linput, this.Rinput);
    }

    setMod(vet){
        this.mod = true;
        this.vet = vet;
        this.portIndex = vet.length - 1;
        this.port = vet[this.portIndex];
    }

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