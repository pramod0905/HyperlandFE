import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FirmService } from '../../services/firm.service';
import { Firm } from '../../model/Firm';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { DeleteMasterConfirmBoxDialog } from './master-delete-confirm-box.component';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './create-firm.component.html',
  styleUrls: [ './create-firm.component.scss']
})
export class DialogOverviewExampleDialog  implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Firm,
    private fb: FormBuilder,
    private firmService: FirmService,
    private snackBar : MatSnackBar) {

      this.firmForm= this.fb.group({
        'firmName': [null , Validators.required ],
        //'address' : [null ,Validators.required ]
      });
    }
    
    firmForm: FormGroup;

    firm : Firm;

    loading : boolean = false;

    ngOnInit() {
      if(this.data!=null || this.data!==undefined)
      {
        this.firm = new Firm();
        this.firm = this.data;
      }
      else{
        this.firm = new Firm();
      }
      
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    closePopup() : void {
      this.dialogRef.close();
    }

    onFormSubmit(form: NgForm)  
    {  
      console.log(form);  
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

    submitForm() {
      if(this.firm.id==undefined || this.firm.id==null) {
        // create new firm
        this.loading = true;
        this.firmService.createFirm(this.firm).subscribe(  
          res => {  
            console.log(res);
            this.loading = false;
            this.openSnackBar('Firm Created Successfully','');
            this.closePopup();
          },  
          error => {  
            console.log('There was an error while retrieving Albums !!!' + error);
            this.openSnackBar('Error while creating firm, Please contact your adminstrator','');
            this.loading = false;
          });
      }
      else {
        this.firmService.updateFirm(this.firm).subscribe(  
          res => {  
            console.log(res);
            this.openSnackBar('Firm Updated Successfully','');
            this.closePopup();
          },  
          error => {  
            console.log('There was an error while retrieving Albums !!!' + error);  
            this.openSnackBar('Error while updating firm, Please contact your adminstrator','');
          });
      }
    }
}


@Component({
  selector: 'app-master-firm',
  templateUrl: './master-firm.component.html',
  styleUrls: ['./master-firm.component.scss']
})
export class MasterFirmComponent implements OnInit {
  constructor(public dialog: MatDialog,public firmService : FirmService) {}
  
  firmList : Firm[];
  loading : boolean=false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  firmDataSource: any;

  firmData : Firm; 

  displayedColumns = ['id', 'firmName','actions']; 

  openDialog(): void {
    this.firmData = new Firm();
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data : this.firmData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.loading = true;
    this.firmDataSource = new MatTableDataSource();  
    //this.firmService.get();

    console.log("Getting all firms");
    this.firmService.getAllFirms().subscribe(  
      res => {  
        this.firmList = res.result;
        this.firmDataSource.data = this.firmList;
        this.firmDataSource.paginator = this.paginator;
        this.firmDataSource.sort = this.sort;
        this.loading = false;
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);  
        this.loading= false;
      });
  }

  editFirmDetails(firmId : any) {

    console.log('Firm Id:'+firmId);

    this.firmService.getFirmById(firmId).subscribe(res => {  
      console.log("Result:"+res);
      this.firmData =  res.result;
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '350px',
        data : this.firmData
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

    },  
    error => {  
      console.log('There was an error while retrieving Albums !!!' + error);  
    });
  }

  openConfirmDeleteDialog(firmId : any): void {
    const confirmDeleteFirmDialog = this.dialog.open(DeleteMasterConfirmBoxDialog, {
      width: '400px',
      data : firmId
    });

    confirmDeleteFirmDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
