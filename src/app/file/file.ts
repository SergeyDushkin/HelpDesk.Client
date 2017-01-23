export class File {
    public id : string;
    public name : string;
    public contentType : string;
    public fileType : string;
    public size : number;
    public icon : string;
    public fileImg : string;

    public constructor(data:any = {}) {
        this.id = data.id || "";
        this.name = data.name || "";
        this.contentType = data.contentType || "";
        this.fileType = data.fileType || "";
        this.size = data.size || 0;
        this.icon = data.icon || "";
        this.fileImg = data.fileImg || "";
    }
}
