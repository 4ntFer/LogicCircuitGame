
export class Node{
    Linput;
    Rinput;
    port;

    Node(Linput, Rinput, port){
        this.Linput = Linput;
        this.Rinput = Rinput;
        port.setInputs(Linput.getResult(), Rinput.getResult());
        this.port = port;
    }
}