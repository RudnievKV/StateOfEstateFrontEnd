export class TranslationDto {
    SourceLanguageCodeAndValue!: LanguageCodeAndValue;
    TargetLanguageCodeAndValues!: Array<LanguageCodeAndValue>;
}
export class LanguageCodeAndValue {
    LanguageCode!: string;
    Value!: Array<string>;

    constructor(languageCode: string, value: Array<string>) {
        this.LanguageCode = languageCode;
        this.Value = value;
    }
}