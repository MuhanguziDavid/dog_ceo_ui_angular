import { Component, OnInit, OnDestroy } from '@angular/core';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { DataService } from '../data.service';
import { DialogComponent } from '../dialog/dialog.component';

interface DogBreeds {
  breed: Array<string>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  dogPictures: Array<any> = [];
  dogBreeds: DogBreeds = {breed: []};
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService, private matDialog: MatDialog) { }

  openDialog(name:string, image:any) {
    this.matDialog.open(DialogComponent,
      {
        data: {
          name,
          image
        }
      });
  }

  ngOnInit() {
    this.dataService.getRandomDogBreeds().pipe(takeUntil(this.destroy$)).subscribe((data: any)=>{
      console.log(data);
      this.dogPictures = data.message;
    })
    this.dataService.getDogBreedsList().pipe(takeUntil(this.destroy$)).subscribe((data: any)=>{
      console.log(data);
      this.dogBreeds = data.message;
    })  
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
