import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { FirmService } from '../../services/firm.service';
import { Firm } from '../../model/Firm';
import { Project } from '../../model/Project';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { City } from '../../model/City';
import { CityService } from '../../services/city.service';
import { LocationService } from '../../services/location.service';
import { ProjectService } from '../../services/project.service';
import { DeleteProjectConfirmBoxDialog } from './master-delete-confirm-box.component';

@Component({
  selector: 'dialog-overview-project-dialog',
  templateUrl: './create-project.component.html',
  styleUrls: [ './create-project.component.scss']
})
export class DialogOverviewEProjectDialog implements OnInit{
  firmList : any;
  cityList : any;
  locationList : any;
  project : Project;
  projectForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewEProjectDialog>,private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar : MatSnackBar,
    private locationService : LocationService,
    private projectService : ProjectService) {

      this.firmList = data.firmList;
      this.cityList = data.cityList;
      //this.locationList = data.locationList;
      console.log("Firm List:",this.firmList);
      console.log("City List:",this.cityList);
      this.projectForm= this.fb.group({
        'firmName': [null , Validators.required ],
        'address' : [null ,Validators.required ],
        'projectName': [null ,Validators.required ],
        'cityName' : [null, Validators.required ],
        'location' : [null, Validators.required ],
        'businessValue' : [null, Validators.required ]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setFirmId(firm : any) : void {
    console.log("Firm:",firm);
    this.project.firmId = firm.id; 
  }

  setCity(city : any) : void {
    console.log("City:",city);
    this.project.cityId = city.id;
    this.locationList = [];
    this.locationService.getAllLocationByCity(city.id).subscribe(
      res => {  
        console.log(res);
        this.locationList = res.result;
      },  
      error => {  
        
      });
  }

  setLocation(location : any)  : void {
    console.log("Location:",location);
    this.project.locationId = location.id; 
  }

  ngOnInit() {
    this.project = new Project();
  }
  
  onFormSubmit(form: NgForm)  
  {  
    console.log(form);  
  }

  closePopup() : void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  submitForm() {
    if(this.project.id==undefined || this.project.id==null) {
      // create new firm
      this.projectService.createProject(this.project).subscribe(  
        res => {  
          console.log(res);
          this.openSnackBar('Project Created Successfully','');
          this.closePopup();
        },  
        error => {  
          console.log('There was an error while retrieving Albums !!!' + error);
          this.openSnackBar('Error while creating project, Please contact your adminstrator','');
        });
    }
    else {
      this.projectService.updateProject(this.project).subscribe(  
        res => {  
          console.log(res);
          this.openSnackBar('Project Updated Successfully','');
          this.closePopup();
        },  
        error => {  
          console.log('There was an error while retrieving Albums !!!' + error);  
          this.openSnackBar('Error while updating project, Please contact your adminstrator','');
        });
    }
  }

}

@Component({
  selector: 'app-master-project',
  templateUrl: './master-project.component.html',
  styleUrls: ['./master-project.component.scss']
})
export class MasterProjectComponent implements OnInit {

  firmList : Firm[];
  cityList : City[];
  locationList : Location[];
  projectList : Project[];
  projectDataSource: any;
  loading : boolean =false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public dialog: MatDialog,public firmService : FirmService,
    public cityService : CityService,public locationService : LocationService,
    public projectService : ProjectService) { }

  displayedColumns = ['firmName','projectName','PropertyType','cityName','location','address','businessValue','actions']; 

  openDialog(): void {
    console.log(this.firmList);
    const dialogRef = this.dialog.open(DialogOverviewEProjectDialog, {
      width: '450px',
      data: {
       "firmList": this.firmList,
       "locationList": this.locationList,
       "cityList": this.cityList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.loading = true;
    this.projectService.getAllProjects().subscribe(
      res => {  
        this.loading = false;
        this.projectList = res.result;
        console.log(this.projectList);
        this.projectDataSource = new MatTableDataSource();  
        this.projectDataSource.data = res.result;
      },  
      error => {  
        this.loading =false;
        console.log('There was an error while retrieving !!!' + error);
    });

    this.firmService.getAllFirms().subscribe(
      res => {  
        this.firmList = res.result;
        console.log("firmList List:",this.firmList);
      },  
      error => {  
        console.log('There was an error while retrieving !!!' + error);  
    });
      
    this.locationService.getAllLocations().subscribe(  
      res => {  
        this.locationList = res.result;
        console.log("Location List:",this.locationList);
      },  
      error => {  
        console.log('There was an error while retrieving !!!' + error);  
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

  openConfirmDeleteDialog(projectId : any): void {
    console.log("ProjectId:",projectId);
    const confirmDeleteProjectDialog = this.dialog.open(DeleteProjectConfirmBoxDialog, {
      width: '400px',
      data : projectId
    });

    confirmDeleteProjectDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
