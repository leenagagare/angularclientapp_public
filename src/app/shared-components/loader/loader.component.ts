import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { Subject, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  subscription: Subscription;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: boolean = false;
  constructor(
    private loaderService: LoaderService,
    private spinner: NgxSpinnerService
  ) {
    this.subscription = this.loaderService.isLoading.subscribe((v) => {
      this.isLoading = v;
      if (this.isLoading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
  ngOnInit() {}
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
