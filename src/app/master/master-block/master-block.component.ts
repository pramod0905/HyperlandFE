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

  blockList : Block[];
  blockDataSource: any;
  loading : boolean = false; 
  constructor(public dialog: MatDialog,public blockService : BlockService) { }

  displayedColumns = ['firmName','propertyName','propertyType','block','actions']; 

  openDialog(): void {
    console.log(this.blockList);
    const dialogRef = this.dialog.open(DialogOverviewBlockDialog, {
      width: '350px',
      data: this.blockList
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.loading = true;
    this.blockService.getAllBlocks().subscribe(  
      res => {  
        this.loading = false;
        this.blockList = res.result;
        console.log(this.blockList);
        this.blockDataSource = new MatTableDataSource();  
        this.blockDataSource.data = res.result;
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);  
        this.loading = false;
      });  
    }
  }

