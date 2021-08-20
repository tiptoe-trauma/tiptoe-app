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
        // let proxy_url = 'https://cors-anywhere.herokuapp.com/'
        let grant_number = 'R01+GM111324\[Grant+Number\]'
        // let grant_number = 'R01GM111324[Full+Text]'
        
        // let id_list = []
        // let id_request = new XMLHttpRequest();
        // let id_url = proxy_url + base_endpoint + 'esearch.fcgi?db=pubmed&retmode=json&term=' + grant_number
        let id_url = base_endpoint + 'esearch.fcgi?db=pubmed&retmode=json&term=' + grant_number

        let pubfill = this.fillPubs
        fetch(id_url)
            .then(
                function(res) {
                    if (res.status !== 200) {
                        console.log("Error accessing PubMed: " + res.status);
                        return;
                    }

                    res.json().then(function(resData) {
                        let id_list = resData["esearchresult"]["idlist"];

                        // This publication does not seem to be configured properly to be pulled by API query
                        if (id_list.indexOf('32789188') === -1) {
                            id_list.push('32789188')
                        }

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
        let uids = results["result"]["uids"];
        let citation_block = "";

        // Get dates from publications
        let dates = new Array;
        for (let uid of uids){
            dates.push([uid, results["result"][uid].pubdate.substring(0,4)])
        }

        // Order the publications by pub date
        dates.sort(function(first, second) {
            return second[1] - first[1];
        });

        for (let entry of dates){
            let uid = entry[0];
            let citation = "";
            let result = results["result"][uid];

            for (let name of result.authors){
                if (result.authors.indexOf(name)>0){
                    citation += ", ";
                }
                citation += name.name;
            }

            citation += ". <a href='https://pubmed.ncbi.nlm.nih.gov/" + result.uid + "' target='_blank'>" +result.title;
            if (!result.title.endsWith('.')){
                citation += ".";
            }
            citation += "</a>"

            citation += " " + result.source + ". ";

            citation += result.pubdate.substring(0, 4);

            if (result.volume){
                citation += "; " + result.volume;
                if (result.issue){
                    citation += "(" + result.issue + ")"
                }
            }

            if (result.pages){
                if (result.volume){
                    citation += ", " + result.pages;
                }
                else {
                    citation += "; " + result.pages;
                }
            }
            citation += ".";
            citation_block += '<div _ngcontent-c1 class ="citation"><span>' + citation + '</span></div>'
        }

        document.getElementById("pubs").innerHTML = citation_block;

    }

    fillError() {
        document.getElementById("pubs").innerHTML = "<p>Error retrieving publications.</p>";

    }
}