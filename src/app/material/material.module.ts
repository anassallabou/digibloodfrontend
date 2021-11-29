import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressBarModule} from '@angular/material/progress-bar';


const materialModule = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatGridListModule,
  MatExpansionModule,
  MatCardModule,
  MatTabsModule,
  MatStepperModule,
  MatTabsModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatTableModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatIconModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatBadgeModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatExpansionModule
];


@NgModule({
  imports: [materialModule],
  exports: [materialModule]
})
export class MaterialModule {
}
