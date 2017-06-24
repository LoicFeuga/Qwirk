export class ItemMessage {
    author: string;
    message: any;
    id: number;
    type:number;

    constructor(author: string, message: any, id: number,type:number) {
        this.author = author;
        this.message = message;
        this.id = id;
        this.type = type;
        if (message.length != null) {

           // this.checkIfUrl(this.message);
        }

    }

    checkIfUrl(message) {
        if (message.indexOf('http') > -1) {
            let url = "";
            let stop = false;
            for (let i = message.indexOf('http'); i < message.length && !stop; i++) {
                if (message.charAt(i) == ' ' || message.charAt(i) == '\n') {
                    alert(this.ValidURL(url));
                    stop = true;
                } else {
                    url += message.charAt(i);
                }
            }
        }
    }

    ValidURL(str) {
        var pattern = new RegExp('^(https?:\/\/)?' + // protocol
            '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|' + // domain name
            '((\d{1,3}\.){3}\d{1,3}))' + // OR ip (v4) address
            '(\:\d+)?(\/[-a-z\d%_.~+]*)*' + // port and path
            '(\?[;&a-z\d%_.~+=-]*)?' + // query string
            '(\#[-a-z\d_]*)?$', 'i'); // fragment locater
        if (!pattern.test(str)) {
            alert("Please enter a valid URL.");
            return false;
        } else {
            return true;
        }
    }

    get() {
        console.log({ author: this.author, content: this.message, id: this.id,type:this.type });
        return { author: this.author, content: this.message, id: this.id,type:this.type };
    }
}