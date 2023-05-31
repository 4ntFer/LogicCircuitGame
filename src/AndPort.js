export class AndPort{
    val1;
    val2;

    setInput(val1, val2){
        this.val1 = val1;
        this.val2 = val2;
    }
    
    result(){
        if(this.val1 && this.val2){
            return true;
        }else{
            return false;
        }
    }
}