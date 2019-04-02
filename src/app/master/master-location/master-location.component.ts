import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Location } from '../../model/Location';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { CityService } from '../../services/city.service';
import { City } from '../../model/City';
import { DeleteLocationConfirmBoxDialog } from './master-delete-confirm-box.component';

export class Option {
  name: string;
  value: any;
}

@Component({
  selector: 'dialog-overview-location-dialog',
  templateUrl: './create-location.component.html',
  styleUrls: [ './create-location.component.scss']
})
export class DialogOverviewLocationDialog  implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewLocationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private locationService: LocationService,
    private snackBar : MatSnackBar) {

      this.locationForm= this.fb.group({
        'location': [null , Validators.required ],
        //'cityName' : [null ,Validators.required ]
      });
    }
    
    locationForm: FormGroup;

    location : Location;

    cityList : Option[]=[];
    option : Option;
    selectedCity : Option;

    ngOnInit() {

      if(this.data!=null || this.data!==undefined)
      {
        this.location = new Location();
        this.location = this.data.locationData;
        //this.locationForm.get('cityName').patchValue(this.location.cityId);

        this.selectedCity = new Option();

        this.selectedCity.name = this.data.locationData.cityName;
        this.selectedCity.value = this.data.locationData.cityId;

        console.log("selected city:",this.selectedCity);

        console.log("this.data.cityList:",this.data.cityList);
        for(var i=0;i<this.data.cityList.length;i++) {
            this.option = new Option();
            this.option.value = this.data.cityList[i].id;
            this.option.name = this.data.cityList[i].city;
            this.cityList.push(this.option);
        }
      }
      else{
        this.location = new Location();
        for(var i=0;i<this.data.cityList.length;i++) {
            this.option = new Option();
            this.option.value = this.data.cityList[i].id;
            this.option.name = this.data.cityList[i].city;
            this.cityList.push(this.option);
        }
      }
      
    }

    setCity(city : any) : void {
      console.log("City:",city);
      this.location.cityName = city.name;
      this.location.cityId = city.value; 
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
      if(this.location.id==undefined || this.location.id==null) {
        // create new firm
        this.locationService.createLocation(this.location).subscribe(  
          res => {  
            console.log(res);
            this.openSnackBar('Location Created Successfully','');
            this.closePopup();
          },  
          error => {  
            console.log('There was an error while retrieving Albums !!!' + error);
            this.openSnackBar('Error while creating firm, Please contact your adminstrator','');
          });
      }
      else {
        this.locationService.updateLocation(this.location).subscribe(  
          res => {  
            console.log(res);
            this.openSnackBar('Location Updated Successfully','');
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
  selector: 'app-master-location',
  templateUrl: './master-location.component.html',
  styleUrls: ['./master-location.component.scss']
})
export class MasterLocationComponent implements OnInit {

  constructor(public dialog: MatDialog,public locationService : LocationService,private cityService : CityService) {}

  locationList : Location[];
  cityList : City[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  locationDataSource: any;

  locationData : Location; 

  displayedColumns = ['id', 'cityName','location','actions'];

  loading : boolean =false;

  openDialog(): void {
    this.locationData = new Location();
    const dialogRef = this.dialog.open(DialogOverviewLocationDialog, {
      width: '400px',
      data : {
        'locationData': this.locationData,
        'cityList': this.cityList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {

    this.locationDataSource = new MatTableDataSource();  
    //this.firmService.get();
    this.loading = true;
    console.log("Getting all location");
    this.locationService.getAllLocations().subscribe(  
      res => {  
        this.locationList = res.result;
        this.locationDataSource.data = this.locationList;
        this.locationDataSource.paginator = this.paginator;
        this.locationDataSource.sort = this.sort;
        this.loading = false;
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);  
        this.loading = false;
      });

      this.cityService.getAllCities().subscribe(  
        res => {  
          this.cityList = res.result;
          console.log("City List:",this.cityList);
        },  
        error => {  
          console.log('There was an error while retrieving !!!' + error);  
      });
  }

  editLocationDetails(locationId : any) {

    console.log('location Id:'+locationId);

    this.locationService.getLocationById(locationId).subscribe(res => {  
      console.log("Result:"+res);
      this.locationData =  res.result;
      const dialogRef = this.dialog.open(DialogOverviewLocationDialog, {
        width: '350px',
        data : {
          'locationData': this.locationData,
          'cityList': this.cityList
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

    },  
    error => {  
      console.log('There was an error while retrieving Albums !!!' + error);  
    });
  }

  openConfirmDeleteDialog(locationId : any): void {
    const confirmDeleteFirmDialog = this.dialog.open(DeleteLocationConfirmBoxDialog, {
      width: '400px',
      data : locationId
    });

    confirmDeleteFirmDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
