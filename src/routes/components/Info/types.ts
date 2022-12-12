export type CategoryInfoData = {
    time:string;
    info:InfoData
    items:ItemInfoData[]
}

export type InfoData = {
    name:string;
    code:string;
}

export type ItemInfoData = {
    info:InfoData;
    price:number;
    ratio:number;
}