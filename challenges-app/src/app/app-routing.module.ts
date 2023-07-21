import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinChallengeComponent } from './pages/join-challenge/join-challenge.component';
import { MagicLoginComponent } from './pages/magic-login/magic-login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'magic-login/:challengeId', component: MagicLoginComponent },
  { path: 'join-challenge/:challengeId', component: JoinChallengeComponent },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
