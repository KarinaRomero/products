export class Product {
    nid:number;
    title:string;
    created:string;
    body:string;
    field_image_1:string;
    constructor(nid:number, title:string, created:string, body:string,field_image_1:string){
        this.nid = nid;
        this.title = title;
        this.created = created;
        this.body = body;
        this.field_image_1 = field_image_1;
    }
}
