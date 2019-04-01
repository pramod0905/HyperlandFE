import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Firm } from "../../model/Firm";
import { FirmService } from "../../services/firm.service";
import { LocationService } from "../../services/location.service";

@Component({
    selector: 'dialog-delete-location',
    templateUrl: './delete-location.component.html'
  })
  export class DeleteLocationConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteLocationConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private locationService: LocationService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.locationService.deleteLocation(this.data).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('Location Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }