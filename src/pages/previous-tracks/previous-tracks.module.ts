import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviousTracksPage } from './previous-tracks';

@NgModule({
  declarations: [
    PreviousTracksPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviousTracksPage),
  ],
})
export class PreviousTracksPageModule {}
