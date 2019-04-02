import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Firm } from '../../model/Firm';
import { FirmService } from '../../services/firm.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Block } from '../../model/Block';
import { BlockService } from '../../services/block.service';
import { DeleteBlockConfirmBoxDialog } from './master-delete-confirm-box.component';
import { Project } from '../../model/Project';
import { ProjectService } from '../../services/project.service';
import { PropertytypeService } from '../../services/propertytype.service';
import { PropertyType } from '../../model/PropertyType';



@Component({
  selector: 'dialog-overview-block-dialog',
  templateUrl: './create-block.component.html',
  styleUrls: [ './create-block.component.scss']
})
export class DialogOverviewBlockDialog implements OnInit {
  firmList : any;
  projectList : any;
  propertyTypeList : any;
  blockForm: FormGroup;
  block : Block;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewBlockDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,
    private snackBar : MatSnackBar) {

      this.blockForm= this.fb.group({
        'firmName': [null , Validators.required ],
        //'address' : [null ,Validators.required ]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.firmList = this.data.firmList;
    this.projectList = this.data.projectList;
    this.propertyTypeList = this.data.propertyTypeList;
  }
}


@Component({
  selector: 'app-master-block',
  templateUrl: './master-block.component.html',
  styleUrls: ['./master-block.component.scss']
})
export class MasterBlockComponent implements OnInit {

  blockList : Block[];
  firmList : Firm[];
  projectList : Project[];
  propertyTypeList : PropertyType[];
  blockDataSource: any;
  loading : boolean = false;
  blockData : Block;
  constructor(public dialog: MatDialog,public blockService : BlockService,public typeService: PropertytypeService,
    public firmService : FirmService,public projectService : ProjectService) { }

  displayedColumns = ['firmName','propertyName','propertyType','block','actions']; 

  openDialog(): void {
    console.log(this.blockList);
    const dialogRef = this.dialog.open(DialogOverviewBlockDialog, {
      width: '350px',
      data: {
        'blockData' : this.blockData,
        'firmList': this.firmList,
        'projectList':this.projectList,
        'propertyTypeList': this.propertyTypeList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.loading = true;
    this.blockData = new Block();
    this.blockService.getAllBlocks().subscribe(  
      res => {  
        this.loading = false;
        this.blockList = res.result;
        console.log(this.blockList);
        this.blockDataSource = new MatTableDataSource();  
        this.blockDataSource.data = res.result;
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);  
        this.loading = false;
      });
      
      this.firmService.getAllFirms().subscribe(  
        res => {  
          this.firmList = res.result;
        },  
        error => {  
          console.log('There was an error while retrieving Albums !!!' + error);  
        });

        this.projectService.getAllProjects().subscribe(  
          res => {  
            this.projectList = res.result;
          },  
          error => {  
            console.log('There was an error while retrieving Albums !!!' + error);  
          });

          this.typeService.getAllProperties().subscribe(  
            res => {  
              this.propertyTypeList = res.result;
            },  
            error => {  
              console.log('There was an error while retrieving Albums !!!' + error);  
            });
    }

    openConfirmDeleteDialog(blockId : any): void {
      console.log("blockId:",blockId);
      const confirmDeleteBlockDialog = this.dialog.open(DeleteBlockConfirmBoxDialog, {
        width: '400px',
        data : blockId
      });
  
      confirmDeleteBlockDialog.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    editBlockDetails(blockId) {
      console.log('block Id:'+blockId);

    this.blockService.getBlockById(blockId).subscribe(res => {  
      console.log("Result:"+res);
      this.blockData =  res.result;
      const dialogRef = this.dialog.open(DialogOverviewBlockDialog, {
        width: '350px',
        data : {
          'blockData' : this.blockData,
          'firmList': this.firmList,
          'projectList': this.projectList,
          'propertyTypeList': this.propertyTypeList
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
      if(this.blockData.id==undefined || this.blockData.id==null) {
        // create new firm
        this.blockService.createBlock(this.blockData).subscribe(  
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
  }

