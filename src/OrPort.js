import { AndPort } from "./AndPort.js";

export class OrPort{
    id = "OR";
    val1;
    val2;

    /*setInput(val1, val2){
        this.val1 = val1;
        this.val2 = val2;
    }

    result(){
        if(this.val1 || this.val2){
            return true;
        }else{
            return false;
        }
    }*/

    result(Linput, Rinput){
        if(Linput.getOutput() || Rinput.getOutput()){
            return true;
        }else{
            return false;
        }
    }
}