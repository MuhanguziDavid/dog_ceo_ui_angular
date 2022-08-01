import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.css']
})
export class BreedComponent implements OnInit, OnDestroy {
  breed = 'Dog';
  dogPictures: Array<any> = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.breed = !params['subBreed']
        ? params['breed']
        : `${params['breed']}-${params['subBreed']}`;
      this.dataService
        .getDogBreed(params['breed'], params['subBreed'])
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.dogPictures = data.message;
        });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
