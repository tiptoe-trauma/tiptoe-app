import {Component, OnInit, Input, ViewChild} from '@angular/core';

@Component({
    selector: 'data-feedback',
    templateUrl: 'data-feedback.html',
    styleUrls: ['data-feedback.css']
})

export class DataFeedbackComponent implements OnInit{
    @Input() query: String;
    @ViewChild('query') que;

    ngOnInit(){
    }

    onSubmit(query){
        var output = 'this is the result';
        document.getElementById('output').innerHTML=output;
    }
}