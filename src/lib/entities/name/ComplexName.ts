export class ComplexName{
    private nameParts: string[] = [];
    private tranliterations: string[] = [];
    private meanings: string[] = [];

    with(noun: string, transliteration: string, meaning: string) {
        this.nameParts.push(noun);
        this.tranliterations.push(transliteration);
        this.meanings.push(meaning);
        return this;
    }

    getName(){
        return this.nameParts.join("");
    }

    getTransliteration(){
        return this.tranliterations.join(" ");
    }

    getMeaning(){
        return `(${this.meanings.join(')(')})`;
    }
}