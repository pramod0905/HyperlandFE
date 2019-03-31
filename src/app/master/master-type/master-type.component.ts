import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { PropertytypeService } from '../../services/propertytype.service';
import { PropertyType } from '../../model/PropertyType';
import { DeletePropertyTypeConfirmBoxDialog } from './master-delete-confirm-box.component';

@Component({
  selector: 'dialog-overview-block-dialog',
  templateUrl: './create-type.component.html',
  styleUrls: [ './create-type.component.scss']
})
export class DialogOverviewTypeDialog implements OnInit {
  propertyTypeForm : FormGroup;
  propertyType : PropertyType;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewTypeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,private propertytypeService : PropertytypeService,
    private snackBar : MatSnackBar) {
      this.propertyTypeForm= this.fb.group({
        'type': [null , Validators.required ]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closePopup() : void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if(this.data!=null || this.data!==undefined)
    {
      this.propertyType = new PropertyType();
      this.propertyType = this.data;
    }
    else{
      this.propertyType = new PropertyType();
    }
    
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
    if(this.propertyType.id==undefined || this.propertyType.id==null) {
      // create new firm
      this.propertytypeService.createPropertyType(this.propertyType).subscribe(  
        res => {  
          console.log(res);
          this.openSnackBar('Property Type Created Successfully','');
          this.closePopup();
        },  
        error => {  
          console.log('There was an error while retrieving Albums !!!' + error);
          this.openSnackBar('Error while creating firm, Please contact your adminstrator','');
        });
    }
    else {
      this.propertytypeService.updatePropertyType(this.propertyType).subscribe(  
        res => {  
          console.log(res);
          this.openSnackBar('Property Type Updated Successfully','');
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
  selector: 'app-master-type',
  templateUrl: './master-type.component.html',
  styleUrls: ['./master-type.component.scss']
})
export class MasterTypeComponent implements OnInit {

  constructor(public dialog: MatDialog,private propertyTypeService : PropertytypeService) { }

  propertyTypeDataSource : any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  propertyData : PropertyType;

  propertyList : PropertyType[];

  loading : boolean =false;

  displayedColumns = ['propertytype','actions'];

  openDialog(): void {
    this.propertyData = new PropertyType();
    const dialogRef = this.dialog.open(DialogOverviewTypeDialog, {
      width: '350px',
      data : this.propertyData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.loading = true;
    this.propertyTypeDataSource = new MatTableDataSource();  
    //this.firmService.get();

    console.log("Getting all firms");
    this.propertyTypeService.getAllProperties().subscribe(  
      res => {  
        this.loading = false;
        this.propertyList = res.result;
        this.propertyTypeDataSource.data = this.propertyList;
        this.propertyTypeDataSource.paginator = this.paginator;
        this.propertyTypeDataSource.sort = this.sort;
      },  
      error => {  
        this.loading = true;
        console.log('There was an error while retrieving !!!' + error);  
      });
  }

  editPropertyTypeDetails(propertyTypeId : any) {

    console.log('Property Type Id:'+propertyTypeId);

    this.propertyTypeService.getPropertyTypeById(propertyTypeId).subscribe(res => {  
      console.log("Result:"+res);
      this.propertyData =  res.result;
      const dialogRef = this.dialog.open(DialogOverviewTypeDialog, {
        width: '350px',
        data : this.propertyData
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
    const confirmDeleteFirmDialog = this.dialog.open(DeletePropertyTypeConfirmBoxDialog, {
      width: '400px',
      data : firmId
    });

    confirmDeleteFirmDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
