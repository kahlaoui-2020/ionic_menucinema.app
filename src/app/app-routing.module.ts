import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'cinema',
    loadChildren: () => import('./pages/cinema/cinema.module').then(m => m.CinemaPageModule)
  },
  {
    path: 'maison',
    loadChildren: () => import('./pages/maison/maison.module').then(m => m.MaisonPageModule)
  },
  {
    path: 'film',
    loadChildren: () => import('./modals/film/film.module').then(m => m.FilmPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/listes/listes.module').then(m => m.ListPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'add-movie-modal',
    loadChildren: () => import('./modals/add-movie-modal/add-movie-modal.module').then(m => m.AddMovieModalPageModule)
  },
  {
    path: 'remove-movie-modal',
    loadChildren: () => import('./modals/remove-movie-modal/remove-movie-modal.module').then(m => m.RemoveMovieModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
