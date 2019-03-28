import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Firm } from "../../model/Firm";
import { FirmService } from "../../services/firm.service";

@Component({
    selector: 'dialog-delete-firm',
    templateUrl: './delete-firm.component.html',
    //styleUrls: [ './create-firm.component.scss']
  })
  export class DeleteMasterConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteMasterConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private firmService: FirmService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.firmService.deleteFirm(this.data).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('Firm Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }