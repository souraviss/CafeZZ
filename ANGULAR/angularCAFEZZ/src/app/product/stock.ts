import { Guid } from "guid-typescript";
export class StockStatus{
    Id:Guid;
    Productid:Guid;
    InStock:number;
    Outstock:number;
}