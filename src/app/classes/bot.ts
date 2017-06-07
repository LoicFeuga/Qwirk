import { ItemMessage } from './itemMessage';
export class QBot {
    name: string;
    messages: any;
    added: boolean;
    commands: string[];
    kickable: boolean = false;
    banable: boolean = false;
    messageFail: ItemMessage;
    wordKick: string[] = [""];
    wordBan: string[] = ["Abruti",
        "Ahuri",
        "Aigrefin",
        "Anachorète",
        "Analphabète",
        "Andouille",
        "Anus",
        "Arsouille",
        "Aspirateur",
        "Assisté",
        "Asticot",
        "Attardé",
        "Avorton",
        "Babache",
        "Bachibouzouk",
        "Balai",
        "Baltringue",
        "Banane",
        "Bandit",
        "Barjot",
        "Batârd",
        "Betterave",
        "Bigleux",
        "Blaireau",
        "Boloss",
        "Bordel",
        "Bordel",
        "Boudin",
        "Bouffon",
        "Bougre",
        "Bougre",
        "Bougre",
        "Bougre",
        "Boule",
        "Boulet",
        "Bouricot",
        "Bourique",
        "Bourrin",
        "Boursemolle",
        "Boursouflure",
        "Bouseux",
        "Boutonneux",
        "Branleur",
        "Branlotin",
        "Branque",
        "Branquignole",
        "Brigand",
        "Brêle",
        "Brosse",
        "Bubon",
        "Burne",
        "Butor",
        "Bécasse",
        "Bégueule",
        "Bélitre",
        "Béotien",
        "Bête",
        "Cageot",
        "Cagole",
        "Calice",
        "Canaille",
        "Canaillou",
        "Cancrelat",
        "Caprinophile",
        "Carburateur",
        "Caribou",
        "Casse",
        "Cassos",
        "Catin",
        "Cave",
        "Cervelle",
        "Chacal",
        "Chacal",
        "Chafouin",
        "Chameau",
        "Chancreux",
        "Chancre",
        "Chaoui",
        "Charogne",
        "Chenapan",
        "Chiassard",
        "Chiasse",
        "Chieur",
        "Chiure",
        "Cinglé",
        "Clampin",
        "Cloaque",
        "Cloche",
        "Clodo",
        "Cloporte",
        "Clown",
        "Cochon",
        "Cocu",
        "Con",
        "Conard",
        "Conchieur",
        "Concombre",
        "Connard",
        "Connasse",
        "Conne",
        "Coprolithe",
        "Coprophage",
        "Cornard",
        "Cornegidouille",
        "Corniaud",
        "Cornichon",
        "Couard",
        "Couille",
        "Couille",
        "Couillon",
        "Crapaud",
        "Crapule",
        "Crassard",
        "Crasseuse",
        "Crasspouillard",
        "Crevard",
        "Crevure",
        "Crotte",
        "Cryptorchide",
        "Crâne",
        "Crétin",
        "Crétin",
        "Crétin",
        "Crétin",
        "Cuistre",
        "Cul",
        "Cul",
        "Dégueulasse",
        "Don",
        "Ducon",
        "Dugenou",
        "Dugland",
        "Dypterosodomite",
        "Débile",
        "Décamerde",
        "Décérébré",
        "Dégueulis",
        "Dégénéré",
        "Dégénéré",
        "Dépravé",
        "Détritus",
        "Ecervelé",
        "Ectoplasme",
        "Emmerdeur",
        "Empaffé",
        "Emplâtre",
        "Empoté",
        "Enculeur",
        "Enculé",
        "Enflure",
        "Enfoiré",
        "Erreur",
        "Eunuque",
        "Face",
        "Face",
        "Face",
        "Faquin",
        "Faraud",
        "Faux",
        "Fesse",
        "Fesse",
        "Fesses",
        "Fiente",
        "Filou",
        "Fini",
        "Fion",
        "Fiote",
        "Flaque",
        "Foireux",
        "Foldingue",
        "Fonctionnaire",
        "Fouille",
        "Four",
        "Fourbe",
        "Foutriquet",
        "Frapadingue",
        "Frappe",
        "Freluquet",
        "Fricoteur",
        "Frigide",
        "Fripouille",
        "Frippon",
        "Frustré",
        "Fumier",
        "Fumiste",
        "Furoncle",
        "Félon",
        "Ganache",
        "Gangrène",
        "Garage",
        "Gibier",
        "Gland",
        "Glandeur",
        "Glandus",
        "Globicéphale",
        "Gnome",
        "Godiche",
        "Gogol",
        "Goinfre",
        "Gommeux",
        "Gougnafier",
        "Goujat",
        "Goulu",
        "Gourdasse",
        "Gourgandin",
        "Grand",
        "Grand",
        "Gras",
        "Graveleux",
        "Gredin",
        "Grenouille",
        "Gringalet",
        "Grognasse",
        "Gros",
        "Gros",
        "Gros",
        "Grosse",
        "Grosse",
        "Grue",
        "Gueulard",
        "Gueule",
        "Gueule",
        "Gueux",
        "Gugus",
        "Guignol",
        "Has",
        "Hérétique",
        "Histrion",
        "Homoncule",
        "Hostie",
        "Hurluberlu",
        "Hérétique",
        "Iconoclaste",
        "Idiot",
        "Ignare",
        "Illettré",
        "Imbibé",
        "Imbécile",
        "Impuissant",
        "Infâme",
        "Ironie",
        "Ivrogne",
        "Jaune",
        "Jean",
        "Jobard",
        "Jobastre",
        "Judas",
        "Kroumir",
        "Kéké",
        "Laideron",
        "Larve",
        "Lavedu",
        "Lépreux",
        "Loboto",
        "Loutre",
        "Lèche",
        "Malandrin",
        "Malotru",
        "Malpropre",
        "Manant",
        "Manche",
        "Mange",
        "Maquereau",
        "Maquerelle",
        "Maraud",
        "Marchand",
        "Margoulin",
        "Merdaillon",
        "Merdasse",
        "Merde",
        "Merde",
        "Merdophile",
        "Merlan",
        "Microcéphale",
        "Minable",
        "Minus",
        "Miteux",
        "Moins",
        "Molasson",
        "Mongol",
        "Mononeuronal",
        "Mont",
        "Morbleu",
        "Morfale",
        "Morille",
        "Morpion",
        "Mortecouille",
        "Morue",
        "Morveux",
        "Motherfucker",
        "Mou",
        "Mou",
        "Mou",
        "Moudlabite",
        "Moule",
        "Mouton",
        "Méchant",
        "Mécréant",
        "Mérule",
        "Nabot",
        "Nain",
        "Nanar",
        "Naze",
        "Nazillon",
        "Necropédophile",
        "Neuneu",
        "Nez",
        "Niais",
        "Nigaud",
        "Niguedouille",
        "Noob",
        "Nounouille",
        "Nécrophile",
        "Obsédé",
        "Oiseau",
        "Olibrius",
        "Ordure",
        "Outre",
        "Outrecuidant",
        "Pachyderme",
        "Paltoquet",
        "Panaris",
        "Parasite",
        "Parbleu",
        "Parvenu",
        "Patate",
        "Paumé",
        "Pauvre",
        "Paysan",
        "Peau",
        "Peau",
        "Pecore",
        "Peigne",
        "Peine",
        "Peine",
        "Pendard",
        "Pervers",
        "Pet",
        "Petite",
        "Petzouille",
        "Phlegmon",
        "Pigeon",
        "Pignolo",
        "Pignouf",
        "Pimbêche",
        "Pinailleur",
        "Pine",
        "Pine",
        "Pintade",
        "Pipistrelle",
        "Piqueniquedouille",
        "Pisse",
        "Pisse",
        "Pisseuse",
        "Pissure",
        "Piètre",
        "Planqué",
        "Playboy",
        "Pleutre",
        "Plouc",
        "Poire",
        "Poireau",
        "Poivrot",
        "Polisson",
        "Poltron",
        "Pompe",
        "Porc",
        "Pot",
        "Pouacre",
        "Pouffe",
        "Pouffiasse",
        "Poufieux",
        "Pouilleux",
        "Pourceau",
        "Pourriture",
        "Pousse",
        "Punaise",
        "Putassière",
        "Pute",
        "Pute",
        "Putréfaction",
        "Pygocéphale",
        "Pécore",
        "Pédale",
        "Péquenot",
        "Pétasse",
        "Pétassoïde",
        "Pétochard",
        "Quadrizomique",
        "Queutard",
        "Quiche",
        "Raclure",
        "Raclure",
        "Radasse",
        "Radin",
        "Ramassis",
        "Rambo",
        "Rastaquouère",
        "Renégat",
        "Roquet",
        "Roublard",
        "Rouge",
        "Roulure",
        "Résidu",
        "Résidus",
        "Sabraque",
        "Sac",
        "Sac",
        "Sac",
        "Sac",
        "Sac",
        "Sac",
        "Sacrebleu",
        "Sacrement",
        "Sacripan",
        "Sagouin",
        "Salaud",
        "Saleté",
        "Saligaud",
        "Salopard",
        "Salope",
        "Saloperie",
        "Salopiaud",
        "Saltinbanque",
        "Saperlipopette",
        "Saperlotte",
        "Sauvage",
        "Scaphandrier",
        "Scatophile",
        "Scelerat",
        "Schnock",
        "Schpountz",
        "Serpillière",
        "Sinistrose",
        "Sinoque",
        "Sodomite",
        "Sombre",
        "Sombre",
        "Sot",
        "Souillon",
        "Sous",
        "Spermatozoide",
        "Spermiducte",
        "Suintance",
        "Sybarite",
        "Syphonné",
        "Tabarnak",
        "Tabernacle",
        "Tâcheron",
        "Tafiole",
        "Tanche",
        "Tartignole",
        "Taré",
        "Tas",
        "Tasse",
        "Thon",
        "Tire",
        "Tocard",
        "Tonnerre",
        "Toqué",
        "Trainé",
        "Traîne",
        "Tricard",
        "Triple",
        "Tromblon",
        "Tronche",
        "Trou",
        "Trou",
        "Troubignole",
        "Truand",
        "Trumeaux",
        "Tuberculeux",
        "Tudieu",
        "Tétârd",
        "Usurpateur",
        "Va",
        "Va",
        "Vandale",
        "Vaurien",
        "Vautour",
        "Ventrebleu",
        "Vermine",
        "Veule",
        "Vicelard",
        "Vieille",
        "Vieille",
        "Vieille",
        "Vioque",
        "Vipère",
        "Voleur",
        "Vorace",
        "Voyou",
        "Vérole",
        "Wisigoth",
        "Yéti",
        "Zigomar",
        "Zigoto",
        "Zonard",
        "Zouave",
        "Zoulou"];

    constructor(message: any) {
        this.name = "Qwibot";
        this.messages = message;
        this.added = false;

        this.commands = [];
        this.commands.push("kick");
        this.commands.push("add");
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

        if (this.messages.length > 0) {

            return this.messages[this.messages.length - 1].content;
        } else return -1;
    }

    getCommand() {
        let message = this.getLastMessage();
        if (message == -1) {
            return "";
        }
        let command = "";
        for (let i = 5; i < message.length - 1; i++) {
            command += message.charAt(i);
        }
        return command;
    }

    lastMessageIsForBot() {
        let messages = this.getLastMessage();
        if (messages == -1) { return false; }
        if (messages.startsWith('/bot')) {
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

    commandBan() {
        if (this.added) {
            this.banable = !this.banable;
            let me = this.banable == true ? "Je suis maintenant capable de bannir" : "Je ne suis plus capable de bannir";
            let m = new ItemMessage(this.name, me, -1);
            this.messages.push(m.get());

        } else {
            let me = "Je ne suis pas ajouté à cette discution, je ne peux pas prendre en considération votre requête";
            let m = new ItemMessage(this.name, me, -1);
            this.messages.push(m.get());
        }
    }

    commandKick() {
        if (this.added) {
            this.kickable = !this.kickable;
            let me = this.kickable == true ? "Je suis maintenant capable de kicker" : "Je ne suis plus capable de kicker";
            let m = new ItemMessage(this.name, me, -1);
            this.messages.push(m.get());

        } else {
            let me = "Je ne suis pas ajouté à cette discution, je ne peux pas prendre en considération votre requête";
            let m = new ItemMessage(this.name, me, -1);
            this.messages.push(m.get());
        }
    }
    commandStatut() {
        let me = this.added == true ? "Je suis ajouté à cette discution" : "Je ne suis pas ajouté à cette discution";
        let m = new ItemMessage(this.name, me, -1);
        this.messages.push(m.get());
    }

    kickOrBan(){    
        let message = this.getLastMessage();
        if(message == -1) return;

        if(this.kickable) this.kick(message);

        if(this.banable) this.ban(message);

    }

    kick(message :string){
        console.log(message);
    }

    ban(message:string){

    }
    execute() {

        if (this.lastMessageIsForBot()) {
            this.kickOrBan();
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
                    case "ban":
                        this.commandBan();

                        break;
                    case "kick":

                        this.commandKick();
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