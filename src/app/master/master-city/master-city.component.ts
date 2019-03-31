import { Component, OnInit, ViewChild } from '@angular/core';
import { City } from '../../model/City';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { CityService } from '../../services/city.service';
import { CityDialog } from './create-city.component';
import { DeleteCityConfirmBoxDialog } from './master-delete-confirm-box.component';

@Component({
  selector: 'app-master-city',
  templateUrl: './master-city.component.html',
  styleUrls: ['./master-city.component.scss']
})
export class MasterCityComponent implements OnInit {

  constructor(private cityService : CityService,
    public dialog: MatDialog) { }

  cityList : City[];
  cityData : City;
  loading : boolean=false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  cityDataSource: any;

  displayedColumns = ['id', 'city','actions'];

  ngOnInit() {
    this.loading = true;
    this.cityService.getAllCities().subscribe(
      res => {  
        this.cityList = res.result;
        this.loading = false;
        this.cityDataSource = new MatTableDataSource();  
        this.cityDataSource.data = res.result;
        this.cityDataSource.paginator = this.paginator;
        this.cityDataSource.sort = this.sort;
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);  
        this.loading = false;
      }
    );

  }

  openDialog(): void {
    this.cityData = new City();
    const dialogRef = this.dialog.open(CityDialog, {
      width: '400px',
      data : this.cityData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editCityDetails(cityId : any) {

    console.log('City Id:'+cityId);

    this.cityService.getCityById(cityId).subscribe(res => {  
      console.log("Result:"+res);
      this.cityData =  res.result;
      const dialogRef = this.dialog.open(CityDialog, {
        width: '350px',
        data : this.cityData
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

    },  
    error => {  
      console.log('There was an error while retrieving Albums !!!' + error);  
    });
  }

  openConfirmDeleteDialog(cityId : any): void {
    const confirmDeleteCityDialog = this.dialog.open(DeleteCityConfirmBoxDialog, {
      width: '400px',
      data : cityId
    });

    confirmDeleteCityDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
