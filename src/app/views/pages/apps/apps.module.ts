import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { NgbDropdownModule, NgbTooltipModule, NgbNavModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppsComponent } from './apps.component';
import { ticketComponent } from './ticket/ticket.component';
import { EmailComponent } from './email/email.component';
import { InboxComponent } from './email/inbox/inbox.component';
import { ReadComponent } from './email/read/read.component';
import { ComposeComponent } from './email/compose/compose.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

// ngx-quill
import { QuillModule } from 'ngx-quill';
import { BloodBagComponent } from './blood-bag/blood-bag.component';
import { UsersComponent } from './users/users.component';
import { HospitalComponent } from './hospital/hospital.component';
import { EmergencyComponent } from './emergency/emergency.component';
import { CreateEmergencyComponent } from './emergency/create-emergency/create-emergency.component';
import { AllEmergencyComponent } from './emergency/All-emergency/all-emergency.component';


const routes: Routes = [
  {
    path: '',
    component: AppsComponent,
    children: [
      {
        path: '',
        redirectTo: 'ticket',
        pathMatch: 'full',
      },
      {
        path: 'email',
        component: EmailComponent,
        children: [
          {
            path: '',
            redirectTo: 'inbox',
            pathMatch: 'full'
          },
          {
            path: 'inbox',
            component: InboxComponent
          },
          {
            path: 'read',
            component: ReadComponent
          },
          {
            path: 'compose',
            component: ComposeComponent
          }
        ]
      },
      {
        path: 'ticket',
        component: ticketComponent
      },
      {
        path: 'emergency',
        component: EmergencyComponent,
        children: [
          {
            path: '',
            redirectTo: 'new-emergency',
            pathMatch: 'full'
          },
          {
            path: 'new-emergency',
            component: CreateEmergencyComponent
          },
          {
            path: 'All-emergency',
            component: AllEmergencyComponent
          }
        ]
      },
      {
        path: 'blood-bag',
        component: BloodBagComponent
      },
      {
        path: 'Users',
        component: UsersComponent
      },
      {
        path: 'hospital',
        component: HospitalComponent
      }
    ]
  }
]

@NgModule({
  declarations: [EmailComponent,UsersComponent, HospitalComponent ,ticketComponent,EmergencyComponent,CreateEmergencyComponent,AllEmergencyComponent, AppsComponent, InboxComponent, ReadComponent, ComposeComponent, BloodBagComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FullCalendarModule, // import the FullCalendar module! will make the FullCalendar component available
    PerfectScrollbarModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    NgbCollapseModule,
    NgSelectModule,
    ReactiveFormsModule,
    QuillModule.forRoot(), // ngx-quill

  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AppsModule { }
