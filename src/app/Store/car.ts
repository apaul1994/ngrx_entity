export class Car {
    ownerName:string;
    carNumber:string;
    id!: number;

    constructor(ownerName?:string, carNumber?:string){
        this.carNumber=carNumber||'';
        this.ownerName=ownerName||'';
    }

}
