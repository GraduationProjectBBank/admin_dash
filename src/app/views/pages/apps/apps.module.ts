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

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CarouselModule } from 'ngx-owl-carousel-o';


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
import { BlogComponent } from './blog/blog.component';
import { InsightComponent } from './insight/insight.component';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { AllBlogComponent } from './blog/all-blog/all-blog.component';


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
        path: 'ticket',
        component: ticketComponent
      },
      {
        path: 'blog',
        component: BlogComponent,
        children: [
          {
            path: '',
            redirectTo: 'new-blog',
            pathMatch: 'full'
          },
          {
            path: 'new-blog',
            component: CreateBlogComponent
          },
          {
            path: 'all-blog',
            component: AllBlogComponent
          }
        ]
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
  declarations: [UsersComponent, HospitalComponent ,ticketComponent,EmergencyComponent,CreateEmergencyComponent,AllEmergencyComponent, AppsComponent, BloodBagComponent, BlogComponent, InsightComponent, CreateBlogComponent, AllBlogComponent],
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
    CarouselModule,
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
