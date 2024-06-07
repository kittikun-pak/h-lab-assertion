export class ProductDescription {
    private _th: string
    private _en: string
    private _cn: string
    private _jp: string
    private _fr: string

    constructor(
        th: string,
        en: string,
        cn: string,
        jp: string,
        fr: string
    ) {
        this._th = th
        this._en = en
        this._cn = cn
        this._jp = jp
        this._fr = fr
    }

    public getTh(): string {
        return this._th
    }

    public setTh(th: string): ProductDescription {
        return new ProductDescription(
            th,
            this.getEn(),
            this.getCn(),
            this.getJp(),
            this.getFr()
        )
    }
    
    public getEn(): string {
        return this._en
    }

    public setEn(en: string): ProductDescription {
        return new ProductDescription(
            this.getTh(),
            en,
            this.getCn(),
            this.getJp(),
            this.getFr()
        )
    }

    public getCn(): string {
        return this._cn
    }

    public setCn(cn: string): ProductDescription {
        return new ProductDescription(
            this.getTh(),
            this.getEn(),
            cn,
            this.getJp(),
            this.getFr()
        )
    }

    public getJp(): string {
        return this._jp
    }

    public setJp(jp: string): ProductDescription {
        return new ProductDescription(
            this.getTh(),
            this.getEn(),
            this.getCn(),
            jp,
            this.getFr()
        )
    }

    public getFr(): string {
        return this._fr
    }

    public setFr(fr: string): ProductDescription {
        return new ProductDescription(
            this.getTh(),
            this.getEn(),
            this.getCn(),
            this.getJp(),
            fr
        )
    }
}