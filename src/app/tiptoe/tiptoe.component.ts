import {User, Survey, Organization} from '../user';
import {Component, OnInit, OnChanges, ElementRef, Inject, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {ErrorService} from '../errors';
import { HttpClient, HttpHeaders } from '@angular/common/http';




declare var $:any;
@Component ({
  selector: 'my-tiptoe',
  templateUrl: './tiptoe.html',
  styleUrls: ['./tiptoe.css'],
})


export class TiptoeComponent implements OnInit, OnChanges {
  public user: User;
  public surveys: Survey[];
  public organizations: Organization[];
  public surveyDate: string;
  public new_srvy_name: string;
  public new_org_type: string;
  public new_email: string;
  public invite_message: string;
  public invite_to_org: number;
  public approval: { [id: number]: boolean};
  public approvalTqip: {[id: number]: boolean};
  public orgLoaded: boolean;
  public srvyLoaded: boolean;
  public orgForNewSrvy: Organization ;
  public orgForNewTqip: Organization ;
  public srvyForNewTqip: Survey;
  public orgId: string;
  public uploadFile;
  public location: Location;


  constructor(@Inject(DOCUMENT) document: Document,
              private _userService: UserService,
              private _errorService: ErrorService,
              private _router: Router,
              private elRef: ElementRef,
              private http: HttpClient){
  }



    ngOnInit(){
        this.srvyForNewTqip = null
        this.orgLoaded = false
        this.srvyLoaded = false
        this.approval = {};
        this.approvalTqip = {};
        if (!this._userService.haveUser()){
            console.log('no user, navigating to home');
            this._router.navigate(['/']);
        } else {
            this._userService.getUser().subscribe(
                user => this.user = user
            );
            this.organizations = [];
            this._userService.requestOrganizationList().subscribe(
                orgs => {this.organizations = orgs; 
                         this.orgLoaded = true;
                         this.updateApproval();
                        }
            );
            this.surveys = [];
            this._userService.requestSurveyList().subscribe(
                srvys => {this.surveys = srvys; 
                          this.srvyLoaded = true;
                          this.updateApproval();
                        }
            );
            this._userService.userChanged.subscribe(
                user => this.user = user
            )
            this.new_org_type = 'tiptoe'
            this.invite_to_org = null 
            this.invite_message = "You have been requested to complete the TIPTOE (Trauma Institutional Priorities and Teams for Outcome Efficacy) questionnaire for your trauma center.  Please use the link below to login and access the questionnaire."
        }

    }

    ngOnChanges(){
      this.updateApproval()
    }

    onChange(event) {
      this.uploadFile = event.target.files[0];
      this.loadAndDisplayColumns()
    }


    updateEmail(){
      this._userService.updateEmail(this.user.email).subscribe(
        user => this.user = user,
        error => this._errorService.announceError('Email update error',
                                                  error['error'], 3)
      );
    }

    updateApproval(){
      if(this.organizations.length > 0 && this.orgLoaded ==true && this.srvyLoaded == true) {
         for (var org of this.organizations) {
            if (org.org_type=='tiptoe'){
              var selectString = 'select' + org.id
              var inputElement = (<HTMLInputElement>document.getElementById(selectString))
              if (inputElement) {
                var surveyId = inputElement.value
                for (var survey of this.surveys) {
                  if (survey.id == Number(surveyId)) {
                    this.approval[org.id] = survey.approved
                    if (survey.tqip) {
                      this.approvalTqip[org.id] = true
                    } else {
                      this.approvalTqip[org.id] = false 
                    }
                  }
                }
              }
            }
         }
      }
    }


    compareFn( optionOne, optionTwo ) : boolean {
      return optionOne === optionTwo;
    }

    sendInvitation(){
        if(!this.invite_to_org || this.invite_to_org == null){
            this._errorService.announceError('Invitation error.', 'Must enter organization name.', 2);
            return;
        }
        if(!this.new_email === undefined || this.new_email == null){
            this._errorService.announceError('Invitation Error', 'Must enter email address.', 2);
            return;
        }
        this._userService.sendInvitation(this.new_email, this.invite_to_org, this.invite_message).subscribe(
          res => {console.log("Invite sent.");
                  this._errorService.announceError('Email Sent',
                                            '',
                                            0);
                  },
          error => {console.log("organization setting error");
                    this._errorService.announceError('Email update error',
                                                  error['error'], 3);
                    }
        );
    }

    newSurvey() {
        if (!this.surveyDate) {
          alert('Please enter a valid date.');
          return;
        }
        
        console.log(this.surveys);


        const isDuplicate = this.surveys.some(
          survey =>
            survey.organization === this.orgForNewSrvy.id && // Match organization
            survey.date === this.surveyDate              // Match date
        );

        if (isDuplicate) {
          alert('The date you entered already exists for this organization.');
          return;
        }

        this._userService.createSurvey(this.surveyDate, this.orgForNewSrvy).subscribe(
            res => {
              this.surveys.push(res);
              this._userService.setActiveSurvey(res).subscribe(
                  user => {
                      this.user = user;
                      this.navigateToActiveQuestionnaire();
                  },
                  error => console.log("survey setting error")
              );
            }
        );
    }

    deleteSurvey(srvy: Survey){
        if(confirm("Are you sure you want to delete: " + srvy.name) === true){
            this._userService.deleteSurvey(srvy).subscribe(
                res => {
                    this.surveys = this.surveys.filter(o => o != srvy);
                }
            );
        }
    }

    navigateToActiveQuestionnaire(){
        this._router.navigate(['/questionnaire/tiptoe']);
    }

    orgRowIsApproved(id: string){
        var selectString = 'select' + id
        var surveyId = (<HTMLInputElement>document.getElementById(selectString)).value

        for (var survey of this.surveys) {
          if (survey.id == Number (surveyId)) {
            return survey.approved
          }
        }
    }

    removeTagsFromXML(xmlString, tagsToRemove) {
      // Step 1: Parse XML string into an XML document
      console.log('1')
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      console.log('2')

      // Step 2: Remove the specified tags from the XML document
      tagsToRemove.forEach(tag => {
        const elementsToRemove = xmlDoc.getElementsByTagName(tag);
        for (let i = elementsToRemove.length - 1; i >= 0; i--) {
          const element = elementsToRemove[i];
          element.parentNode.removeChild(element);
        }
      });
      console.log('3')
      // Step 3: Serialize the modified XML document back into a string
      const serializer = new XMLSerializer();
      const modifiedXmlString = serializer.serializeToString(xmlDoc);
      console.log('4')

      return modifiedXmlString;
    }

    loadAndDisplayColumns() {
      var fileInfo
      var file = this.uploadFile 
      var fileName = this.uploadFile.name
      var textType = /text.*/;

      const autoRemoveDiv = document.getElementById('autoRemoveList');
      const showColumns = document.getElementById('showColumnsDiv');
      try {
        if (file.type.match(textType)) {
          console.log('match')
          var reader = new FileReader();
          const self = this;

          reader.onload = function (e) {
            fileInfo = reader.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(fileInfo, "text/xml");

            const tagsToRemove = ["LastModifiedDateTime", "FacilityId", "PatientId", "HomeZip", "HomeCountry", "HomeCity", "HomeState", "HomeCounty", "HomeResidences", "DateOfBirth", "Age", "AgeUnits", "IncidentDate", "IncidentTime", "PlaceOfInjuryCode", "InjuryZip", "IncidentCountry", "IncidentCity", "IncidentState", "IncidentCounty", "HospitalArrivalDate", "HospitalArrivalTime", "TraumaSurgeonArrivalDate", "TraumaSurgeonArrivalTime", "PatientUUID", "EdDischargeDate", "EdDischargeTime", "HospitalDischargeDate", "HospitalDischargeTime", "WithdrawalOfLifeSupportingTreatmentDate", "WithdrawalOfLifeSupportingTreatmentTime", "NationalProviderIdentifier" ]; // Replace with your desired tags

            // Extract unique element names from the XML
            const allElements = xmlDoc.getElementsByTagName('*');
            const uniqueElementNames = [...new Set(Array.from(allElements).map(el => el.nodeName))];

            // Create checkboxes for each unique element name
            const container = document.getElementById('columnsContainer');
            container.innerHTML = '';
            let removedColumns = []

            // List of names for which checkboxes should not be created
            const excludedNames = ['NtdsRecord', 'NtdsRecords',
                'ItdxRecord', 'ItdxRecords', 'item'];

            for (const name of uniqueElementNames) {
                if (excludedNames.includes(name)) {
                    continue;
                }
                const checkboxDiv = document.createElement('div'); // Create a new div for each checkbox-label pair
                checkboxDiv.classList.add('checkboxItem'); // Add a class for styling

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = name;
                checkbox.id = 'checkbox_' + name;
                if (tagsToRemove.some(item => item.toLowerCase() === name.toLowerCase())){
                  checkboxDiv.style.backgroundColor = 'yellow'
                  checkbox.checked = true
                  checkbox.disabled = true
                  removedColumns.push(name)
                }

                const label = document.createElement('label');
                label.htmlFor = 'checkbox_' + name;
                label.textContent = name;

                checkboxDiv.appendChild(checkbox);  // Append checkbox to the div
                checkboxDiv.appendChild(label);     // Append label to the div
                container.appendChild(checkboxDiv); // Append the div to the container
            }
            if (removedColumns.length > 0) {
              autoRemoveDiv.textContent = 'Automatically Selected Columns to be DELETED: ' + removedColumns.join(', ');
            } else {
              autoRemoveDiv.textContent = 'No PHI columns automatically detected.  The checkbox below can be used to check for and remove columns that contain PHI.'
            }
            autoRemoveDiv.style.display = 'block';  // Make it visible
            autoRemoveDiv.style.backgroundColor = '#e8ffe8'
            showColumns.style.display = 'block';

            //fileNameDisplay.textContent = ` (${fileInput.files[0].name})`;
          }

          reader.readAsText(file);
        } else {
          fileInfo = "File not supported!"
          autoRemoveDiv.textContent = 'Invalid file'
          autoRemoveDiv.style.display = 'block';  // Make it visible
          autoRemoveDiv.style.backgroundColor = '#FFFFCC'
        }
      } catch (error) {
        autoRemoveDiv.textContent = 'Invalid file'
        autoRemoveDiv.style.display = 'block';  // Make it visible
        autoRemoveDiv.style.backgroundColor = '#FFFFCC'
      }





    }
    
    toggleColumnsContainer() {
      var columnsContainer = document.getElementById("columnsContainer");
      var showColumnsCheckbox = document.getElementById("showColumnsCheckbox");
      console.log('here')
    
      if (showColumnsCheckbox instanceof HTMLInputElement && showColumnsCheckbox.checked) {
        console.log('yes')
        columnsContainer.style.display = "grid";
      } else {
        columnsContainer.style.display = "none";
      }
    }

    uploadTqip(){
        var fileInfo
        var selectString = 'select' + this.orgForNewTqip.id
        var inputElement = (<HTMLInputElement>document.getElementById(selectString))
        if (inputElement) {
          var surveyId = inputElement.value
          var selectedSurvey
          for (var survey of this.surveys) {
            if (survey.id == Number(surveyId)) {
              selectedSurvey = survey
            }

          }
          if (selectedSurvey) {
            var posturl = '/api/submit_tqip/' + selectedSurvey.id
            var file = this.uploadFile 
            var fileName = this.uploadFile.name
            var textType = /text.*/;

            if (file.type.match(textType)) {
              var reader = new FileReader();
              const self = this;

              reader.onload = function (e) {
                  fileInfo = reader.result;

                  const parser = new DOMParser();
                  const xmlDoc = parser.parseFromString(fileInfo, "text/xml");

                  //const tagsToRemove = ["PatientId", ]; // Replace with your desired tags
                  var tagsToRemove = ["LastModifiedDateTime", "FacilityId", "PatientId", "HomeZip", "HomeCountry", "HomeCity", "HomeState", "HomeCounty", "HomeResidences", "DateOfBirth", "Age", "AgeUnits", "IncidentDate", "IncidentTime", "PlaceOfInjuryCode", "InjuryZip", "IncidentCountry", "IncidentCity", "IncidentState", "IncidentCounty", "HospitalArrivalDate", "HospitalArrivalTime", "TraumaSurgeonArrivalDate", "TraumaSurgeonArrivalTime", "PatientUUID", "EdDischargeDate", "EdDischargeTime", "HospitalDischargeDate", "HospitalDischargeTime", "WithdrawalOfLifeSupportingTreatmentDate", "WithdrawalOfLifeSupportingTreatmentTime", "NationalProviderIdentifier" ]; // Replace with your desired tags

                  const checkboxes = document.querySelectorAll('[id^="checkbox"]');
                  checkboxes.forEach(checkbox => {
                    if (checkbox instanceof HTMLInputElement && checkbox.checked) {
                      const checkboxValue = checkbox.value;
                      if (!tagsToRemove.includes(checkboxValue)) {
                        tagsToRemove.push(checkboxValue);
                      }
                    }
                  });

                  var elements = xmlDoc.getElementsByTagName("*")
                  const elementsArray = Array.from(elements);
                  const matching_elements = elementsArray.filter(element => {
                    const elementTag = element.tagName.toLowerCase();
                    return tagsToRemove.some(tag => tag.toLowerCase() === elementTag);
                  });

                  //var matching_elements = [element for element in elements if element.tagName.lower() in [tag.lower() for tag in tagsToRemove]]
                  for (let i = matching_elements.length - 1; i >= 0; i--) {
                    const element = matching_elements[i];
                    element.parentNode.removeChild(element);
                  }

                  
                  //tagsToRemove.forEach(tagName => {
                  //  const elements = xmlDoc.getElementsByTagName(tagName);
                  //  for (let i = elements.length - 1; i >= 0; i--) {
                  //    const element = elements[i];
                  //    element.parentNode.removeChild(element);
                  //  }
                  //});
                  // Serialize the modified XML back to a string
                  const modifiedXmlString = new XMLSerializer().serializeToString(xmlDoc);

                  // Now you can use the modifiedXmlString as needed
                  const file = new Blob([modifiedXmlString], { type: 'text/xml' });

                  //TODO: pull old filename
                  const formData = new FormData();
                  formData.append('profile', file, fileName);
    
                  const headers = new HttpHeaders({
                    'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server (Django)
                  });
                  self.http.post(posturl, formData, { headers })
                    .subscribe(
                      res => {self.updateApproval();
                        self._userService.requestSurveyList().subscribe(
                            srvys => {self.surveys = srvys; 
                                      self.srvyLoaded = true;
                                      self.updateApproval();
                                      self._errorService.announceError('TQIP submitted successfully.', '', 0);
                                    }
                        );
                      },
                      error => self._errorService.announceError('TQIP submission error',
                                                        error['error'], 3)
                    );

              }

              reader.readAsText(file);
            } else {
              fileInfo = "File not supported!"
            }


    
          } else {
            console.log("error: survey not found")

          }
        }
        
    }

    setActiveSurvey(id: string){
        var selectString = 'select' + id
        var inputElement = (<HTMLInputElement>document.getElementById(selectString))
        if (inputElement) {
          var surveyId = inputElement.value
          var selectedSurvey
          for (var survey of this.surveys) {
            if (survey.id == Number(surveyId)) {
              selectedSurvey = survey
            }

          }
          if (selectedSurvey) {
            this._userService.setActiveSurvey(selectedSurvey).subscribe(
                user => {
                    this.user = user;
                    this.navigateToActiveQuestionnaire();
                },
                error => console.log("survey setting error")
            );
          } else {
            var selectButton = 'newSurvey' + id 
            document.getElementById(selectButton).click();

          }
        }
        
    }

    logout(){
      let conf = false;
      if(this.user.email){
        conf = confirm("Are you sure you want to logout?");
      } else {
        conf = confirm("Are you sure you want to logout, you have not saved an email address and there will be no way to return to this questionnaire.");
      }
      if(conf){
        this._userService.logout();
        this.user = null;
        this._router.navigate(['/']);
      }
    }

    handleClick(orgSelected: Organization){
      this.orgForNewTqip = orgSelected
      var selectString = 'select' + this.orgForNewTqip.id
      var inputElement = (<HTMLInputElement>document.getElementById(selectString))
      if (inputElement) {
        var surveyId = inputElement.value
        for (var survey of this.surveys) {
          if (survey.id == Number(surveyId)) {
            this.srvyForNewTqip = survey
          }

        }
      }

    }

    sortedSurveys(surveys: any[], orgId: number): any[] {
      return surveys
        .filter(survey => survey.organization === orgId) // Only include surveys for this organization
        .sort((a, b) => {
          // Handle null dates
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
          // Compare dates in descending order
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }

}
