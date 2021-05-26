export class Client {
    constructor(public id: string,
                public nom?: string,
                public prenom?: string,
                public photo?: string,
                public email?: string,
                public tel?: string,
                public adresse?: string,
                public point?: number) {
    }
}
