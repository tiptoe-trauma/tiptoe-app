import {Pipe, PipeTransform} from '@angular/core';
import {DefinitionService} from './definition.service';
import {Definition} from './question';

@Pipe({
    name: 'define',
    pure: false
})

export class DefinitionPipe implements PipeTransform {
    public definitions: Definition[];
    public errored: boolean = false;
    private _regex: RegExp = /<([^>]+)\|([^>]+)>/g;

    constructor(private _definitionService: DefinitionService){
        _definitionService.getDefinitions()
                .subscribe(defs => this.definitions = <Definition[]> defs,
                           error => this.errored = true);

    }

    getDefinition(word: string){
        for(let i = 0; i < this.definitions.length; i++){
            if(this.definitions[i].word === word){
                return this.definitions[i].definition;
            }
        }
        return "Missing definition: " + word;
    }

    transform(value: string, args:string[]):any {
        if(!this.errored && this.definitions){
            let matches = this._regex.exec(value);
            while(matches){
                value = value.replace(matches[0], this.wrapWord(matches[1], this.getDefinition(matches[2])));
                matches = this._regex.exec(value);
            }
            return value;
        } else {
            return value;
        }
    }

    // Wrap DIV around the word
    wrapWord(word: string, definition: string){
        return `<span style="font-weight:bold"
                      data-container="body"
                      data-toggle="popover"
                      data-trigger="hover"
                      data-placement="top"
                      data-content="${definition}">${word}</span>`;
    }
}
