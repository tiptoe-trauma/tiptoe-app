import {Component, OnInit} from '@angular/core';
import { OrganogramService } from '../services/organogram.service';
import { UserService } from '../services/user.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'data-feedback',
    templateUrl: 'data-feedback.html',
    styleUrls: ['data-feedback.css']
})

export class DataFeedbackComponent implements OnInit{
    public results: Object;
    public showingQueries = false;

    constructor(private _organogramService: OrganogramService,
                private _userService: UserService) { }

    ngOnInit(){
    }

    onSubmit(query: string){
        console.log('hi')
        let token = this._userService.token;
        this._organogramService.runQuery(token, query).subscribe(
            results => this.parseResponse(results)
        );
        console.log(this.results)
    }

    parseResponse(results: Object){
        this.results = results;
        let data = [];
        let headers: string[];
        headers = results['head']['vars'];
        // console.log(headers);
        let bindings = results['results']['bindings'];
        for(let i=0; i < bindings.length; i++){
            let row = new Object();
            for(let header of headers){
                row[header.toString()] = bindings[i][header]["value"];
            }
            data.push(row);
        }
        // console.log(data);
        let display = this.createTable(data);
        document.getElementById('data-table').innerHTML = display;
    }

    createTable(data){
        let tableHTML = "";
        let headers = Object.getOwnPropertyNames(data[0]);
        if (headers){
            tableHTML += "<tr>\n"
        }
        for (let header of headers) {
            tableHTML += "<th scope='col'>" + header + "</th>\n"
        }
        if (headers){
            tableHTML += "</tr>\n"
        }
        for (let row of data){
            tableHTML += "<tr>\n"
            for (let header of headers){
                if (headers.indexOf(header) == 0) {
                    tableHTML += "<td scope='row'>" + row[header] + "</td>\n"
                }
                else{
                    tableHTML += "<td>" + row[header] + "</td>\n"
                }
            }
            tableHTML += "</tr>\n"
        }

        return tableHTML;
    }

    public showQueries(){
        let show_button = document.getElementById("show-queries-button")
        if (!this.showingQueries){
            $("#prewritten").slideDown()
            show_button.innerHTML = "Hide pre-written queries";
            this.showingQueries = true;
        }
        else {
            $("#prewritten").slideUp()
            show_button.innerHTML = "View pre-written queries";
            this.showingQueries = false;
        }
    }

    public hideQueries(){
        let query_box = document.getElementById("prewritten");
        query_box.style.display = 'none';
    }

    public selectPrewrittenQuery(index: number){
        let query_field = document.getElementById("query");
        let query_cell = <HTMLElement>document.getElementsByClassName("select_button")[index]
                            .parentNode.parentElement.firstElementChild
        let query = query_cell.innerText;
        let prefixes = "PREFIX obo: <http://purl.obolibrary.org/obo/>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX oostt: <http://purl.obolibrary.org/obo/OOSTT_>\n\n";
        query_field.innerHTML = prefixes + query;

        this.showQueries();
        window.scrollTo(0,0);
        // let token = this._userService.token;
        // this._organogramService.runQuery(token, query).subscribe(
        //     results => this.parseResponse(results)
        // );
    }

    public saveFile(){
        console.log('x')
        console.log(this.results);
        let data = new Blob([JSON.stringify(this.results)], {type: "application/json"});
        saveAs(data, 'cafe-response.json');
    }

}