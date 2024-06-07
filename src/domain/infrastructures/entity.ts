import { cloneDeep } from 'lodash'

export class Entity {
    protected id: number
    protected origin: Entity | null
    protected createdDate: Date
    protected updatedDate: Date
    

    constructor() {
        this.createdDate = null
        this.updatedDate = null
        this.origin = null
        
    }

    public getId(): number {
        return this.id
    }

    public capture() {
        this.origin = cloneDeep(this)
    }

    public getCapture() {
        return this.origin
    }

    public getCreatedDate(): Date | null {
        return this.createdDate
    }

    public getUpdatedDate(): Date | null {
        return this.updatedDate
    }

}
