import { IsDefined, IsString, IsNotEmpty, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateProductInput } from 'src/domain/product'

class SupportedLanguageValidator {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public th: string

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public en: string

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public cn: string

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public jp: string

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public fr: string
}

export class CreateProductValidator {
    @IsDefined()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => SupportedLanguageValidator)
    public name: SupportedLanguageValidator

    @IsDefined()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => SupportedLanguageValidator)
    public description: SupportedLanguageValidator

    public getSchema(): CreateProductInput {
        return {
            name: this.name,
            description: this.description
        }
    }
}