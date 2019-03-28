import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Firm } from "../../model/Firm";
import { FirmService } from "../../services/firm.service";
import { PropertytypeService } from "../../services/propertytype.service";

@Component({
    selector: 'dialog-delete-propertytype',
    templateUrl: './delete-propertytype.component.html',
    //styleUrls: [ './create-firm.component.scss']
  })
  export class DeletePropertyTypeConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeletePropertyTypeConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private propertyTypeService: PropertytypeService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.propertyTypeService.deletePropertyType(this.data).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('Property Type Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }