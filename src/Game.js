import { FalsePort } from "./FalsePort.js";
import {Node} from "./Node.js";
import { TruePort } from "./TruePort.js";
import { AndPort } from "./AndPort.js"; 
import { OrPort } from "./OrPort.js"; 

export class Game{
    G = [];
    ports = [];
    TruePortNode = new Node();
    FalsePortNode = new Node();
    

    constructor(){
        this.ports[0] =(new OrPort());
        this.ports.push(new AndPort());

        this.TruePortNode.port = new TruePort();
        this.FalsePortNode.port = new FalsePort()

        this.G[0] = new Node();
    }

    /*nNode é o numero total de nós que a arvore
    do jogo deve ter, enqquanto nMod é o numero 
    de nós modificaveis que a arvore de jogo deve ter.

    obs.: nós folas não inclusos*/
    init(nNode, nMod){
        this.genRandomTree(this.G[0], nNode)
        this.initTree(nNode, nMod);
    }

    /*Método que percorre toda a arvore
    criando novos nós. i é o contador de nós criados,
    enquanto maxNodes é o número máximo de nós*/
    genRandomTree(node, maxNodes){
        //console.log(this.G.length, "<=", maxNodes);

        let n = this.getRandomIntInclusive(0,2);

        if(n == 1){
            if(this.G.length + 1 <= maxNodes){
        
                node.Linput = new Node();
                this.G.push(node.Linput);
                this.genRandomTree(node.Linput, maxNodes);
    
            }
    
            if(this.G.length + 1 <= maxNodes){
               
                node.Rinput = new Node();
                this.G.push(node.Rinput);
                this.genRandomTree(node.Linput, maxNodes);
    
            }
        }else if(n == 2){
            if(this.G.length + 1 <= maxNodes){
           
                node.Rinput = new Node();
                this.G.push(node.Rinput);
                this.genRandomTree(node.Rinput, maxNodes);
    
            }

            if(this.G.length + 1 <= maxNodes){
        
                node.Linput = new Node();
                this.G.push(node.Linput);
                this.genRandomTree(node.Linput, maxNodes);
    
            }
        }else{
            if(this.G.length < 3){
                this.genRandomTree(node,maxNodes);
            }
        }

        
    }

    initTree(nNode, nMod){
        this.initLeaf(this.G[0]);

        /*caso todos os nós possan ser modificados*/
        if(nNode == nMod){
            for(let i = 0 ; i < this.G.length ; i++){
                //console.log("a",this.G[i]);
                this.G[i].setMod(this.ports);
                //console.log("d",this.G[i]);
                
            }
        }

        /*caso nMod<nNode*/
        else{
            let modCount = 0;
            let index;

            /*Escolhe aleatoriamente os nós modificaveis*/
            while(modCount < nMod){
                index = this.getRandomIntInclusive(0, this.G.length - 1);

                if(this.G[index].mod == false){
                    this.G[index].setMod(this.ports);
                    modCount++;
                }
            }

            /*define a porta dos nós não modificaveis*/
            for(let i = 0 ; i<nNode ; i++){
                if(this.G[i].mod == false){
                    this.G[i].port = this.getRandomPort();
                }
            }
        }

    }

    initLeaf(node){
        if(node.Linput == null){
            node.Linput = this.getRandomBooleanPortNode();
        }else{
            this.initLeaf(node.Linput);
        }

        if(node.Rinput == null){
            node.Rinput = this.getRandomBooleanPortNode();
        }else{
            this.initLeaf(node.Rinput);
        }
    }

    /*Gera um numero aleatório no intervalo [min, max]*/
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*retorna uma porta aleatoria*/
    getRandomPort(){
        let n = this.getRandomIntInclusive(0,1);

        return this.ports[n];
    }

    /*retorna uma porta booleana aleatoria*/
    getRandomBooleanPortNode(){
        let n = this.getRandomIntInclusive(0,1);

        

        if(n == 0){
            return this.TruePortNode;
        }
        
        else if(n == 1){
            return this.FalsePortNode;
        }
    }
}