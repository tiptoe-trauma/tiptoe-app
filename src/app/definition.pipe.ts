import {Pipe, PipeTransform} from '@angular/core';
import {DefinitionService} from './definition.service';
import {Definition} from './question';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'define',
    pure: false
})

export class DefinitionPipe implements PipeTransform {
    public definitions: Definition[];
    public errored: boolean = false;
    private _regex: RegExp = /\{([^>]+)\|([^>]+)\}/g;

    constructor(private _definitionService: DefinitionService,
                private _sanitizer: DomSanitizer){
        _definitionService.getDefinitions()
                .subscribe(defs => this.definitions = <Definition[]> defs,
                           error => this.errored = true);

    }

    getDefinition(word: string){
        if(this.errored || !this.definitions){
            return "Definitions not loaded";
        }
        for(let i = 0; i < this.definitions.length; i++){
            if(this.definitions[i].word === word){
                return this.definitions[i].definition;
            }
        }
        return "Missing definition: " + word;
    }

    transform(value: string, args:string[]):any {
        let matches = this._regex.exec(value);
        while(matches){
            value = value.replace(matches[0],
                                  this.wrapWord(matches[1],
                                      this.getDefinition(matches[2])));
            matches = this._regex.exec(value);
        }
        return this._sanitizer.bypassSecurityTrustHtml(value);
    }

    // Wrap DIV around the word
    wrapWord(word: string, definition: string){
        return `<div class="definition" style="font-weight:bold">${word}
                  <span class="definitiontext">${definition}</span>
                </div>`;
    }
}
