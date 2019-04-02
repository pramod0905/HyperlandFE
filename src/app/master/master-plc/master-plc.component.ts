import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource } from '@angular/material';
import { Firm } from '../../model/Firm';
import { FirmService } from '../../services/firm.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PLCService } from '../../services/plc.service';
import { PLC } from '../../model/PLC';
import { DeletePLCConfirmBoxDialog } from './master-delete-confirm-box.component';

@Component({
  selector: 'dialog-overview-block-dialog',
  templateUrl: './create-plc.component.html',
  styleUrls: [ './create-plc.component.scss']
})
export class DialogOverviewPlcDialog {
  firmList : any;
  plcForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewPlcDialog>,
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.firmList = data;

      this.plcForm= this.fb.group({
        //'firmName': [null , Validators.required ],
        //'address' : [null ,Validators.required ]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-master-plc',
  templateUrl: './master-plc.component.html',
  styleUrls: ['./master-plc.component.scss']
})
export class MasterPlcComponent implements OnInit {

  plcList : PLC[];
  plcDataSource: any;

  constructor(public dialog: MatDialog,public plcService : PLCService) { }

  displayedColumns = ['firmName','propertyName','plcName','plcCharge','chargeType','actions'];

  loading : boolean = false;
  openDialog(): void {
    console.log(this.plcList);
    const dialogRef = this.dialog.open(DialogOverviewPlcDialog, {
      width: '350px',
      data: this.plcList
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit() {

    this.loading = true;
    this.plcService.getAllPLC().subscribe(  
      res => {  
        this.plcList = res.result;
        console.log(this.plcList);
        this.plcDataSource = new MatTableDataSource();  
        this.plcDataSource.data = res.result;
        this.loading = false;
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);  
        this.loading = false;
      });
  }

  openConfirmDeleteDialog(id : any): void {
    const confirmDeletePLCDialog = this.dialog.open(DeletePLCConfirmBoxDialog, {
      width: '400px',
      data : id
    });

    confirmDeletePLCDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
