import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';       // keep if you use forms; otherwise remove
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  // Import the standalone component instead of declaring it
  imports: [
    CommonModule,
    FormsModule,            // optional
    IonicModule,
    HomePageRoutingModule,
    HomePage                // ✅ import standalone component here
  ],
  // No declarations when using a standalone component
  declarations: []
})
export class HomePageModule {}
