import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { PatientComponent } from './main/patient/patient.component';
import { PreviousComponent } from './main/previous/previous.component';
import { EpisodeComponent } from './main/episode/episode.component';
import { ViewMoreComponent } from './main/previous/view-more/view-more.component';
import { PrescriptionComponent } from './main/prescription/prescription.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { InteractionsComponent } from './main/prescription/interactions/interactions.component';
import { HistoryComponent } from './history/history.component';
import { PatientPrescriptionsComponent } from './patient-prescriptions/patient-prescriptions.component';


@NgModule({
    declarations: [DashboardComponent, MainComponent, PatientComponent, PreviousComponent, EpisodeComponent, ViewMoreComponent, PrescriptionComponent, InteractionsComponent, HistoryComponent, PatientPrescriptionsComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        MatSidenavModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatIconModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatDividerModule,
    ]
})
export class DashboardModule { }
