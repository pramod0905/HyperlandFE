import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Firm } from "../../model/Firm";
import { FirmService } from "../../services/firm.service";
import { CityService } from "../../services/city.service";

@Component({
    selector: 'dialog-delete-city',
    templateUrl: './delete-city.component.html',
    //styleUrls: [ './create-firm.component.scss']
  })
  export class DeleteCityConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteCityConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private cityService: CityService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.cityService.deleteCity(this.data).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('City Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }