import {AndPort} from "./AndPort.js";
import {OrPort} from "./OrPort.js";
import { TruePort } from "./TruePort.js";
import {FalsePort} from "./FalsePort.js"

export class Node{
    Linput;
    Rinput;
    port;

    constructor(Linput, Rinput, port){
        this.Linput = Linput;
        this.Rinput = Rinput;

        if(port.Linput != null && port.Linput != null){
            port.setInput(Linput.getOutput(), Rinput.getOutput());
        }
        this.port = port;
        console.log(typeof(port));
    }

    getOutput(){
        return this.port.result();
    }
}