export class TranslationDto {
  SourceLanguageCodeAndValue!: LanguageCodeAndValue;
  TargetLanguageCodeAndValues!: Array<LanguageCodeAndValue>;
  constructor(SourceLanguageCodeAndValue: LanguageCodeAndValue, TargetLanguageCodeAndValues: Array<LanguageCodeAndValue>) {
    this.SourceLanguageCodeAndValue = SourceLanguageCodeAndValue;
    this.TargetLanguageCodeAndValues = TargetLanguageCodeAndValues;
  }
}
export class LanguageCodeAndValue {
  LanguageCode!: string;
  Value!: Array<string>;

  constructor(languageCode: string, value: Array<string>) {
    this.LanguageCode = languageCode;
    this.Value = value;
  }
}
