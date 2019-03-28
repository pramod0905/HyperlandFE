import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Firm } from '../../model/Firm';
import { FirmService } from '../../services/firm.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Block } from '../../model/Block';
import { BlockService } from '../../services/block.service';



@Component({
  selector: 'dialog-overview-block-dialog',
  templateUrl: './create-block.component.html',
  styleUrls: [ './create-block.component.scss']
})
export class DialogOverviewBlockDialog {
  firmList : any;
  blockForm: FormGroup;
  block : Block;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewBlockDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,
    private blockService: BlockService,
    private snackBar : MatSnackBar) {

      this.blockForm= this.fb.group({
        'firmName': [null , Validators.required ],
        //'address' : [null ,Validators.required ]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'app-master-block',
  templateUrl: './master-block.component.html',
  styleUrls: ['./master-block.component.scss']
})
export class MasterBlockComponent implements OnInit {

  firmList : Firm[];
  firmDataSource: any;

  constructor(public dialog: MatDialog,public firmService : FirmService) { }

  displayedColumns = ['firmName','projectName','type','blockName']; 

  openDialog(): void {
    console.log(this.firmList);
    const dialogRef = this.dialog.open(DialogOverviewBlockDialog, {
      width: '350px',
      data: this.firmList
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {

    this.firmService.getAllFirms().subscribe(  
      res => {  
        this.firmList = res.result;
        console.log(this.firmList);
        this.firmDataSource = new MatTableDataSource();  
        this.firmDataSource.data = res.result;
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);  
      });
      
  }


  }

