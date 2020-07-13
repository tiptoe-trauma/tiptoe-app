export function get_figure_text(q_id: number){
    // Basic
    if(q_id==129){
        return 'Percent of organizations that are part of or have a medical school';
    } else if(q_id==161){
        return 'Percent of organizations that are teaching hospitals';
    } else if(q_id==1){
        return 'Percent of intitutions with a trauma program';
    } else if(q_id==124){
        return 'Trauma Center level';
    } else if(q_id==12){
        return 'Percent of programs with a trauma medical director';
    } else if(q_id==25){
        return 'Percent of institutions with a trauma program manager';
    } else if(q_id==33){
        return 'Percent of institutions with a trauma registrar';
    } else if(q_id==10){
        return 'Percent of programs with a Trauma Program Operational Review Committee';
    } else if(q_id==11){
        return 'Percent of programs with Trauma Peer Review Committee meetings';
    } else if(q_id==133){
        return 'Percent of programs with members involved in prehospital training';
    } else if(q_id==134){
        return 'Percent of programs with a representative participating in prehospital protocol development';
    } else
    // Trauma Program
    if(q_id==100){
        return 'Percent of programs with an EMS liasion';
    } else if(q_id==147){
        return 'Members of Trauma Program Leadership';
    }  else if(q_id==9){
        return 'Percent of programs with leadership with the authority to develop, oversee, and improve the care of the injured within the facility';
    }  else if(q_id==74){
        return 'Involvement of physical therapists, occupational therapists, and rehabilitation specialists';
    }  else if(q_id==37){
        return 'Official Physician Liasisons';
    } else
    // Regional Trauma Infrastructure
    if(q_id==148){
        return 'Percent of organizations that are part of a trauma system';
    } else if(q_id==149){
        return 'Percent of trauma programs with trauma systems in service area';
    } else if(q_id==150){
        return 'Percentile ranks for number of level 1 trauma centers in service area';
    } else if(q_id==151){
        return 'Percentile ranks for number of level 2 trauma centers in service area';
    } else if(q_id==7){
        return 'Percent of centers with government efforts to create a trauma system in service area';
    } else if(q_id==8){
        return 'Percent of programs with hospital staff participating in government planning and development of a trauma system';
    } else if(q_id==132){
        return 'Percent of institutions which provide medical direction for EMS operations';
    } else
    // Emergency Medicine
    if(q_id==102){
        return 'Percent of emergency medical liaisons with verifable 18 hours of trauma-specific education every three years';
    } else if(q_id==103){
        return 'Percent of emergency medical liaisons with documented 50% attendance of Trauma Peer Review Committee meetings';
    } else if(q_id==158){
        return 'Percent of emergency medicial liaisons with documented 50% attendance of trauma QI meetings';
    } else if(q_id==121){
        return 'Percent of programs with an emergency department designated nursing liaison';
    } else if(q_id==101){
        return 'Percent of programs with a designated emergency physician available to TMD for QI issues in the ED”';
    } else if(q_id==135){
        return 'Percent of programs with an emergency department representative participating in the QI program';
    } else if(q_id==141){
        return 'Percentile ranks for number of emergency physicians in program';
    } else if(q_id==106){
        return 'Percentile ranks for number of emergency physicians current in ATLS';
    } else if(q_id==107){
        return 'Percentile ranks for number of emergency physicians who are board-certified in emergency medicine';
    } else if(q_id==153){
        return 'Percentile ranks for number of emergency physicians who are board-eligible in emergency medicine';
    } else if(q_id==108){
        return 'Percentile ranks for number of physicisnas that are both board-certified in emergence medicine and current in ATLS';
    } else if(q_id==109){
        return 'Percentage of organizations with presence of a board certified emergency physician at all times';
    } else if(q_id==111){
        return 'Percentage of institutions with emergency physician roles approved by tauma medical director';
    } else if(q_id==110){
        return 'Percentage of institutions with an emergency medicine residency program';
    } else
    // Trauma Medical Director
    if (q_id==137){
        return 'TMD Medical Specialty';
    } else if(q_id==13){
        return 'TMD Status';
    } else if(q_id==155){
        return 'Percent of TMDs who comply with state licensure requirements';
    } else if(q_id==20){
        return 'Trauma Organization Membership';
    } else if(q_id==21){
        return 'Percent of TMDs who comply with the 18-hour trauma specific CME';
    } else if(q_id==138){
        return 'TMD reports to...';
    } else if(q_id==14){
        return 'Percent of TMDs who participate in trauma calls';
    } else if(q_id==15){
        return 'Percent of TMDs who lead trauma QI and patient safety program';
    } else if(q_id==19){
        return 'Percent of TMDs with authority to contribute to TPM performance evaluation';
    } else if(q_id==22){
        return 'Percent of TMDs with authority to set qualifications for trauma panel members';
    } else if(q_id==24){
        return 'Percent of TMDs with authority to appoint members to the trauma panel';
    } else if(q_id==140){
        return 'Percent of TMDs with authority to remove members from the trauma panel';
    } else
    // Trauma Program Manager
    if(q_id==16){
        return 'TPM education level';
    } else if(q_id==26){
        return 'Percent of TPMs responsible for evaluating nursing care for trauma patients';
    } else if(q_id==156){
        return 'Percent of TPMs responsible for trauna quality improvement and patient safety program coordination';
    } else if(q_id==27){
        return 'Percent of TPMs with documented participation in continuing trauma education';
    } else if(q_id==28){
        return 'TPM ATNC and TNCC status';
    } else if(q_id==30){
        return 'Percent of facilities with full time TPM position';
    } else if(q_id==31){
        return 'TPM reports to';
    } else
    // Trauma Registrar
    if(q_id==34){
        return 'Percent of trauma registrars with job description';
    } else if(q_id==36){
        return 'Percent of registrars who have attended abbreviated injury scale training course';
    } else if(q_id==35){
        return 'Percent of facilities with full time trauma registrar position';
    } else
    // General Surgery
    if(q_id==41){
        return 'Percent of facilities with 24/7 general surgical coverage';
    } else if(q_id==45){
        return 'Percentile ranks for number of general surgeons on trauma panel with completed ATLS course';
    } else if(q_id==46){
        return 'Percentile ranks for number of general surgeons current in ATLS';
    } else if(q_id==70){
        return 'Present Capabilities';
    } else
    // Trauma Surgery
    if(q_id==43){
        return 'Percentile ranks for number of trauma surgeons with privileges in general surgery';
    } else if(q_id==159){
        return 'Percent of institutions with trauma surgeon roles being approved by TMD';
    } else if(q_id==42){
        return 'Percentile ranks for number of trauma surgeons on trauma panel';
    } else if(q_id==47){
        return 'Percentile ranks for number of trauma surgeons on trauma panel with documented 18 hours of trauma-specific CME';
    }  else if(q_id==48){
        return 'Percentile ranks for number of trauma surgeons on trauma panel who have participated in an internal education process';
    }  else if(q_id==44){
        return 'Percentile ranks for number of trauma surgeons on trauma panel who are board-eligible';
    }  else if(q_id==152){
        return 'Percentile ranks for number of trauma surgeons on trauma panel who are board-certified';
    }  else if(q_id==54){
        return 'Percentile ranks for number of trauma surgeons who, when on call, take call exclusively for your trauma center';
    }  else if(q_id==56){
        return 'Percentile ranks for number of trauma surgeons who provide care for non-trauma emergencies when on call';
    }  else if(q_id==57){
        return 'Percent of facilities with a trauma surgeon backup call schedule';
    }  else if(q_id==213){
        return 'Percent of facilities with TMD-approved back-up plans';
    }  else if(q_id==58){
        return 'Percentile ranks for number of trauma surgeons on trauma panel with added certifications';
    }  else if(q_id==59){
        return 'Percentile ranks for number of trauma fellowship-trained surgeons on trauma panel';
    } else
    // Orthopedic Surgery
    if(q_id==60){
        return 'Percent of facilities with 24/7 orthopedic coverage';
    } else if(q_id==68){
        return 'Percent of facilities with orthopedic surgery backup plan';
    } else if(q_id==69){
        return 'Percent of facilities with TMD-approved orthopedic surgery backup plan';
    } else if(q_id==61){
        return 'Percent of programs with designated orthopedic surgeon liasion';
    } else if(q_id==63){
        return 'Percent of orthopedic surgeon liasions with 50% participation in Trauma Peer Review Committee meetings';
    }  else if(q_id==64){
        return 'Percentile ranks for number of orthopedic surgeons on trauma panel';
    }  else if(q_id==62){
        return 'Percentile ranks for number of orthopedic surgeons on trauma panel with documented 18 hours of trauma-specific CME';
    }  else if(q_id==65){
        return 'Percentile ranks for number of orthopedic surgeons on trauma panel who are board-eligible';
    }  else if(q_id==145){
        return 'Percentile ranks for number of orthopedic surgeons on trauma panel who are board-certified';
    }  else if(q_id==67){
        return 'Percentile ranks for number of orthopedic surgeons who, when on-call, take call exclusively for your trauma center';
    }  else if(q_id==72){
        return 'Percent of facilities with an orthopedic surgery residency program';
    }  else if(q_id==73){
        return 'Percent of facilities with an orthopedic trauma fellowship';
    }  else
    // Neurosurgery
    if(q_id==75){
        return 'Percent of facilities with 24/7 neurosurgical coverage';
    } else if(q_id==82){
        return 'Percent of facilities with neurosurgical backup plan';
    } else if(q_id==83){
        return 'Percent of facilities with TMD-approved neurosurgical backup plan';
    } else if(q_id==86){
        return 'Percent of facilities with a trauma-director approved plan to determine which types and severity of neurological injury patients should remain at facility with no coverage';
    }  else if(q_id==76){
        return 'Percent of programs with designated neurosurgeon liasion';
    }  else if(q_id==80){
        return 'Percent of neurosurgeon liasions with 50% participation in Trauma Peer Review Committee meetings';
    }  else if(q_id==77){
        return 'Percentile ranks for number of neurosurgeons on trauma panel';
    }  else if(q_id==214){
        return 'Percentile ranks for number of neurosurgeons on trauma panel who are board-eligible';
    }  else if(q_id==215){
        return 'Percentile ranks for number of neurosurgeons on trauma panel who are board-certified';
    }  else if(q_id==79){
        return 'Percentile ranks for number of neurosurgeons on trauma panel with 18 hours of trauma-specific CME';
    }  else if(q_id==81){
        return 'Percentile ranks for number of neurosurgeons who, when on call, take call exclusively';
    } else if(q_id==84){
        return 'Percent of facilities with neurosurgery residency program';
    } else
    // Anesthesiology
    if(q_id==87){
        return 'Percent of facilities with 24/7 neurosurgical coverage';
    } else if(q_id==92){
        return 'Percent of facilities with anesthesia availability documented by trauma QI program';
    } else if(q_id==91){
        return 'Percent of programs with designated anesthesiologist liasions';
    } else if(q_id==93){
        return 'Percentile ranks for number of anesthesiologists on trauma panel';
    } else if(q_id==216){
        return 'Percentile ranks for number of board-certified anesthesiologists on trauma panel';
    }  else if(q_id==94){
        return 'Percentile ranks for number of anesthesiologists taking call who have successfully completed an anesthesiology residency';
    }  else if(q_id==98){
        return 'Percentile ranks for number of CRNAs';
    } else 
    // Additional Specialties
    if(q_id==115){
        return 'Available Medical Specialties';
    } else if (q_id==116){
        return 'Available Surgical Specialties';
    }
    else {
        return null;
    }
}

