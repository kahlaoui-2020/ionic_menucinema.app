import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AlertController, IonSlides} from '@ionic/angular';
import {MovieDataService} from '../../services/movieData/movie-data.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    latestMovies: any;
    isAuth: boolean;
    @ViewChild('mySlider') slider: IonSlides;
    slideOpts = {
        initialSlide: 1,
        speed: 20,
        autoplay: true
    };

    constructor(private dataMovieService: MovieDataService,
                private router: Router,
                private alertController: AlertController,
                private fire: AngularFireAuth) {
    }

    ngOnInit() {
        this.verifierUser();
        this.getMovies().then().catch();
    }

    async getMovies() {
        this.latestMovies = await this.dataMovieService.getMoviesCinema().then().catch();
    }

    openMaison() {
        if (this.isAuth) {
            this.router.navigate(['/folder/maison']);
        } else {
            this.displayAlert().then();
        }

    }

    openCinema() {
        if (this.isAuth) {
            this.router.navigate(['/folder/cinema']);
        } else {
            this.displayAlert();
        }

    }

    async displayAlert() {
        const alert = await this.alertController.create({
            header: ' Connexion requise',
            message: 'Veillez vous connecter pour faire des modifications',
            buttons: ['OK']
        });
        await alert.present();
    }

    verifierUser() {
        this.fire.onAuthStateChanged(
            (user) => {
                if (user != null) {
                    this.isAuth = true;
                } else {
                    this.isAuth = false;
                }
            }
        );
    }


}
