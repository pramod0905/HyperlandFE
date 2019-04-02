import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Firm } from "../../model/Firm";
import { FirmService } from "../../services/firm.service";
import { LocationService } from "../../services/location.service";
import { BlockService } from "../../services/block.service";
import { PLCService } from "../../services/plc.service";

@Component({
    selector: 'dialog-delete-plc',
    templateUrl: './delete-plc.component.html'
  })
  export class DeletePLCConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeletePLCConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private plcService : PLCService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        this.plcService.deletePLC(id).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('PLC Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }