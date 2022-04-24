import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable()
export class LoaderService {
  public isLoading = new BehaviorSubject(false);
  constructor() {}
}
