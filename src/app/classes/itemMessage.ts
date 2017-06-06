export class ItemMessage {
    author: string;
    message: any;
    id:number;

    constructor(author:string, message: any,id :number) {
        this.author = author;
        this.message = message;
        this.id = id;
    }

    get(){
        return { author: this.author, content: this.message, id: this.id }
    }
}