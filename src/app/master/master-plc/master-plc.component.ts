import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource } from '@angular/material';
import { Firm } from '../../model/Firm';
import { FirmService } from '../../services/firm.service';





@Component({
  selector: 'dialog-overview-block-dialog',
  templateUrl: './create-plc.component.html',
  styleUrls: [ './create-plc.component.scss']
})
export class DialogOverviewPlcDialog {
  firmList : any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewPlcDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.firmList = data;
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

  firmList : Firm[];
  firmDataSource: any;

  constructor(public dialog: MatDialog,public firmService : FirmService) { }

  displayedColumns = ['firmName','projectName','plcName','plcCharges','chargingType'];

  openDialog(): void {
    console.log(this.firmList);
    const dialogRef = this.dialog.open(DialogOverviewPlcDialog, {
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
