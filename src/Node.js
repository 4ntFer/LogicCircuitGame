import {AndPort} from "./AndPort.js";
import {OrPort} from "./OrPort.js";
import { TruePort } from "./TruePort.js";
import {FalsePort} from "./FalsePort.js"

export class Node{
    Linput;
    Rinput;
    port;
    mod = false
    vet = [];
    index = 0;

    constructor(Linput, Rinput, port){
        this.Linput = Linput;
        this.Rinput = Rinput;

        if(Linput != null && Linput != null){
            port.setInput(Linput.getOutput(), Rinput.getOutput());
        
        }
        this.port = port;
        console.log(typeof(port));
    }

    getOutput(){
        return this.port.result();
        
    }

    setMod(vet){
        mod = true;
        vet.push(this.port);
        this.vet = vet;
    }

    modify(){
        if(index < this.vet.size){
            index++;
        }else{
            index = 0;
        }
        
        port = vet[index];
    }
}