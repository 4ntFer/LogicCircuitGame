import {AndPort} from "./AndPort.js";
import {OrPort} from "./OrPort.js";
import { TruePort } from "./TruePort.js";
import {FalsePort} from "./FalsePort.js"

export class Node{
    x = 0;
    y = 0;
    Linput;
    Rinput;
    port;
    mod = false
    vet = [];
    portIndex = 0;

    constructor(Linput, Rinput, port){
        this.Linput = Linput;
        this.Rinput = Rinput;

        if(Linput != null && Linput != null){
            port.setInput(Linput.getOutput(), Rinput.getOutput());
        
        }
        this.port = port;
    }

    getOutput(){
        return this.port.result();
    }

    setMod(vet){
        this.mod = true;
        vet.push(this.port);
        this.vet = vet;
        this.portIndex = vet.length - 1;

        for(let i = 0; i<vet.length -1; i++){
            let port = vet[i];

            port.setInput(this.Linput.getOutput(), this.Rinput.getOutput());
        }
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