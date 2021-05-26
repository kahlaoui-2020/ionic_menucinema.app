import { Film } from './Film';

export class ListeDeFilme {
  constructor(private nomListe: string, public films?: Film[]) {
  }
}
