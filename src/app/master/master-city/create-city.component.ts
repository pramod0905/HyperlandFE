import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { City } from "../../model/City";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { CityService } from "../../services/city.service";

@Component({
    selector: 'city-dialog',
    templateUrl: './create-city.component.html',
    //styleUrls: [ './create-city.component.scss']
  })
  export class CityDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<CityDialog>,
      @Inject(MAT_DIALOG_DATA) public data: City,
      private fb: FormBuilder,
      private cityService: CityService,
      private snackBar : MatSnackBar) {
  
        this.cityForm= this.fb.group({
          'city': [null , Validators.required ],
          //'address' : [null ,Validators.required ]
        });
      }
      
      cityForm: FormGroup;
  
      city : City;
  
      ngOnInit() {
        if(this.data!=null || this.data!==undefined)
        {
          this.city = new City();
          this.city = this.data;
        }
        else{
          this.city = new City();
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
        if(this.city.id==undefined || this.city.id==null) {
          // create new city
          this.cityService.createCity(this.city).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('City Created Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while creating city !!!' + error);
              this.openSnackBar('Error while creating city, Please contact your adminstrator','');
            });
        }
        else {
          this.cityService.updateCity(this.city).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('City Updated Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while updating city !!!' + error);  
              this.openSnackBar('Error while updating city, Please contact your adminstrator','');
            });
        }
      }
  }