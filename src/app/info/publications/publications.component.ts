import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'info-publications',
    templateUrl: 'publications.html',
    styleUrls: ['../info.css']
})

export class PublicationsComponent implements OnInit {
    ngOnInit() {
        this.getPubs();
    }

    getPubs(){
        let base_endpoint = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
        // let proxy_url = 'https://salty-castle-05953.herokuapp.com/'
        let proxy_url = 'https://cors-anywhere.herokuapp.com/'
        let grant_number = 'R01+GM111324\[Grant+Number\]'
        
        let id_list = []
        let id_request = new XMLHttpRequest();
        // let id_url = proxy_url + base_endpoint + 'esearch.fcgi?db=pubmed&retmode=json&term=' + grant_number
        let id_url = base_endpoint + 'esearch.fcgi?db=pubmed&retmode=json&term=' + grant_number

        let pubfill = this.fillPubs
        fetch(id_url)
            .then(
                function(res) {
                    if (res.status !== 200) {
                        console.log("It's busted: " + res.status);
                        return;
                    }

                    res.json().then(function(resData) {
                        console.log(resData);
                        let id_list = resData["esearchresult"]["idlist"];

                        if (id_list.length > 0) {
                            // let info_url = proxy_url + base_endpoint + 'esummary.fcgi?db=pubmed&retmode=json&id=' + String(id_list);
                            let info_url = base_endpoint + 'esummary.fcgi?db=pubmed&retmode=json&id=' + String(id_list);
                            fetch(info_url)
                                .then( function(rez) {
                                    if (rez.status !== 200){
                                        console.log("Now it's busted: " + rez.status);
                                        return;
                                    }

                                    rez.json().then(function(rezData) {
                                        console.log(rezData);
                                        console.log(this)
                                        pubfill(rezData)
                                        // this.fillPubs(rezData);
                                    })
                                })
                        }
                    });
                }
            )
            .catch( err=> {
                console.log(err);
                this.fillError();
            })

    }

    fillPubs(results) {
        console.log(results)
        let uids = results["result"]["uids"];
        let citation_block = "";
        for (let uid of uids){
            let citation = "";
            console.log(results["result"][uid])
            let result = results["result"][uid];

            for (let name of result.authors){
                if (result.authors.indexOf(name)>0){
                    citation += ", ";
                }
                citation += name.name;
            }

            citation += ". " + result.title;
            if (!result.title.endsWith('.')){
                citation += ".";
            }

            citation += " " + result.source + ". ";

            citation += result.pubdate.substring(0, 4);
            if (result.pages){
                citation += "; " + result.pages;
            }
            citation += ".";
            console.log(citation)
            citation_block += '<div _ngcontent-c1 class ="citation"><span>' + citation + '</span></div>'
        }

        document.getElementById("pubs").innerHTML = citation_block;

    }

    fillError() {
        document.getElementById("pubs").innerHTML = "<p>Error retrieving publications.</p>";

    }
}