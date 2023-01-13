import { LanguageCodeAndValue } from "./TranslationDto";

export class TranslationInputDto {
    SourceLanguageCodeAndValue!: LanguageCodeAndValue;
    TargetLanguageCodeAndValues!: Array<string>;
}