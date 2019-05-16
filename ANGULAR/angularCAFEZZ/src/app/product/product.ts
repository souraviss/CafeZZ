import { Guid } from "guid-typescript";
import { StockStatus } from "./stock";
export class Product
{
    Id:Guid;
    Name:string;
    CategoryId:Guid;
    Description:string;
    stock:StockStatus;
}