import { ItemMessage } from './itemMessage';
export class QBot {
    name: string;
    messages: any;
    added: boolean;
    commands: string[];
    messageFail: ItemMessage;

    constructor(message: any) {
        this.name = "Bot";
        this.messages = message;
        this.added = false;

        this.commands = [];
        this.commands.push("kick");
        this.commands.push("add");
        this.commands.push("help");
        this.commands.push("statut");
        this.commands.push("remove");
        this.commands.push("ban");

        let mFail = "La commande est inconnue essayez : ";

        for (let i = 0; i < this.commands.length; i++) {
            mFail += this.commands[i] + (i == this.commands.length - 1 ? "" : ", ");
        }
        this.messageFail = new ItemMessage(this.name, mFail, -1);
    }

    sayHi() {
        return "Salut je suis le bot " + this.name + " je suis ajouté à votre discusion";
    }

    getLastMessage() {
        return this.messages[this.messages.length - 1].content;
    }

    getCommand() {
        let message = this.getLastMessage();
        let command = "";
        for (let i = 5; i < message.length - 1; i++) {
            command += message.charAt(i);
        }
        return command;
    }

    lastMessageIsForBot() {
        if (this.getLastMessage().startsWith('/bot')) {
            return true;
        } else {
            return false;
        }
    }

    isCommandKnow(command: string) {
        for (let i = 0; i < this.commands.length; i++) {

            if (command == this.commands[i]) {
                return true;
            }
        }

        return false;
    }

    isCommandAdd(command) {
        return command == "add" ? true : false;
    }

    commandAdd() {
        this.added = true;

        let me = "Je suis ajouté à cette discution";
        let m = new ItemMessage(this.name, me, -1);
        this.messages.push(m.get());

    }
    commandRemove() {
        let me = "";
        if (this.added == true) {

            this.added = false;
            me = "Je suis supprimé de cette discution";
        } else {
            me = "Je ne suis pas encore ajouté à cette discution, je ne peux donc pas être supprimé";
        }

        let m = new ItemMessage(this.name, me, -1);
        this.messages.push(m.get());
    }

    commandStatut() {
        let me = this.added == true ? "Je suis ajouté à cette discution" : "Je ne suis pas ajouté à cette discution";
        let m = new ItemMessage(this.name, me, -1);
        this.messages.push(m.get());
    }
    execute() {

        if (this.lastMessageIsForBot()) {

            let command = this.getCommand();
            if (this.isCommandKnow(command)) {
                    switch (command) {
                        case "remove":
                            this.commandRemove();
                            break;
                        case "statut":
                            this.commandStatut();
                            break;
                        case "add":
                            this.commandAdd();
                            break;

                    }



                
            }
            //Sinon commmand non reconnu
            else {
                this.messages.push(this.messageFail.get());
            }
        }
    }

}