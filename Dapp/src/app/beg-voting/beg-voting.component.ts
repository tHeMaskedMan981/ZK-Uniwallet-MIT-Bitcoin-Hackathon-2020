import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

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
  verified=false;
  voting_passwd: string='';
  voted_cdt: string ='';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.success = false;
    this.verified = true;
  }

  vote() {
    this.success=true;
    console.log(this.voted_cdt);
    console.log(this.voting_passwd)
  }
  vA() {
    let url = "http://localhost:8080/age/proof";
    this.http.get(url).subscribe(
      res => {
        console.log(res);
        let url2 = "http://192.168.10.130:3000/age/verify?ageproof=" + JSON.stringify(res);
        this.http.get(url2).subscribe(
          res2 => {
            console.log(res2)
            this.verified = !res2;
          },
          error => {

          }
        )
      },
      error => {
        console.log(error.error.text);

      }
    );
  }
}
