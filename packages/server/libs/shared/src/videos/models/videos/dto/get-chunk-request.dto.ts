import { IsNumber, IsUUID } from "class-validator";

export class GetChunkRequest {
    @IsUUID()
    id: string;

    @IsNumber()
    start: number;

    constructor(id: string, start: number) {
        this.id = id;
        this.start = start;
    }
}
