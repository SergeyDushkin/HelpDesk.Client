export class SmtpSettings {
    public server : string;
    public port: string;
    
    public constructor(data:any = {}) {
        this.server = data.server || "";
        this.port = data.port || ""; 
    }
}


