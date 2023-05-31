
import { FalsePort } from "./FalsePort.js";
import {Node} from "./Node.js";
import { TruePort } from "./TruePort.js";
import { AndPort } from "./AndPort.js"; 
import { OrPort } from "./OrPort.js"; 

export class Main{
    start(){
        let G = []; // vetor de node
        G.push(new Node(new FalsePort(), new FalsePort, new OrPort()));
        console.log(G[0].getOutput());
    }
}