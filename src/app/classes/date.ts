export class QDate {
    date: Date;

    constructor() {
        this.date = new Date();
    }

    format() {
        return this.date;
    }

    /**
     * "yyyy-MM-dd'T'HH:mm:ss.SSSZ", 
     */
    now() {
        let now = new Date();
        let nowStr = "";
        let milli = now.getMilliseconds();
        let milliStr = milli < 10 ? "00" + milli : milli < 100 ? "0" + milli : milli;
        nowStr += now.getFullYear() + "-";
        nowStr += ( (now.getMonth()+1) < 10 ? "0"+(now.getMonth()+1):(now.getMonth()+1) ) + "-";
        nowStr += ( (now.getDate()) < 10 ? "0"+(now.getDate()):(now.getDate()) )+ "'T'";
        nowStr += ( (now.getHours()) < 10 ? "0"+(now.getHours()):(now.getHours()) )+ ":";
        nowStr += ( (now.getMinutes()) < 10 ? "0"+(now.getMinutes()):(now.getMinutes()) )+ ":";
        nowStr += ( (now.getSeconds()) < 10 ? "0"+(now.getSeconds()):(now.getSeconds()) )+ ".";
        nowStr += milliStr+ "Z";
        return nowStr;
    }


}