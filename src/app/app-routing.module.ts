import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { MentorComponent } from './mentor/mentor.component';
import { ProfileComponent } from './mentor/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterMentorComponent } from './register/mentor/mentor.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'user/:id',
        component: UserComponent
    },
    {
        path: 'mentor/:id',
        component: MentorComponent
    },
    {
        path: 'mentor/view/:username',
        component: ProfileComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: RegisterComponent
    },
    {
        path: 'signup/mentor',
        component: RegisterMentorComponent
    },
    {
        path: 'training/propose/:userid/:mentorid/:skillid',
        component: TrainingComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
