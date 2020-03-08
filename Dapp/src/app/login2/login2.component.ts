import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})

export class Login2Component implements OnInit {

  buttontext: string;
  uname: string = '';
  showwait: boolean;
  register: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {  
    this.showwait = false;
    this.register = false;

  }

  enterUname() {
    this.showwait = true;

    setTimeout(()=>{    
      this.register = true;
    }, 3000);
  }
  

}

