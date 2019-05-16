import { Guid } from "guid-typescript";
export class Category {
    constructor(public Id:Guid,public Name:string,public Active:boolean){}
}
