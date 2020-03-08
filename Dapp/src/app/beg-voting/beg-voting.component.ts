import { Component, OnInit } from '@angular/core';

interface Candidate {
  val: string;
  name: string;
}

@Component({
  selector: 'app-beg-voting',
  templateUrl: './beg-voting.component.html',
  styleUrls: ['./beg-voting.component.css']
})
export class BegVotingComponent implements OnInit {

  success: any;

  candidates: Candidate[] = [
    {val: 'bjp-0', name: 'BJP'},
    {val: 'congress-1', name: 'Congress'},
    {val: 'bsp-2', name: 'BSP'}
  ];

  voting_passwd: string='';
  voted_cdt: string ='';
  constructor() { }

  ngOnInit() {
    this.success = false;
  }

  vote() {
    this.success=true;
    console.log(this.voted_cdt);
    console.log(this.voting_passwd)
  }
}
