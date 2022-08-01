import { Component, OnInit, OnDestroy } from '@angular/core';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router'

import { DataService } from '../data.service';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.css']
})
export class BreedComponent implements OnInit, OnDestroy {
  breed:string = "Dog";
  dogPictures: Array<any> = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log("params", params);
      this.breed = !params['subBreed'] ? params['breed'] : `${params['breed']}-${params['subBreed']}`
      this.dataService.getDogBreed(params['breed'], params['subBreed']).pipe(takeUntil(this.destroy$)).subscribe((data: any)=>{
        console.log(data);
        this.dogPictures = data.message;
      })
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
