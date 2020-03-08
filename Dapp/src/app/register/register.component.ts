import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() uname: string;
  showSpinner: boolean;
  voting_passwd: string = '';
  constructor() { }

  ngOnInit() {
    this.showSpinner=false;
  }

  async enterPasswd() {
    this.showSpinner = true;
    
    setTimeout(()=>{    
      this.showSpinner = false;
    }, 1000);
  }

} 
