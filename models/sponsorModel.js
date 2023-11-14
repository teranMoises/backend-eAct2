class SponsorModel {
    constructor() {
        this.sponsors = {
            Diamante: [],
            Oro: [],
            Plata: [],
            Bronce: [],
        };
    }

    addSponsor(cathegory, Sponsor) {
        this.sponsors[cathegory].push(Sponsor);
    }

    getSponsors(cathegory) {
        return this.sponsors[cathegory];
    }

    getAllSponsors() {
        return this.sponsors;
    }
}




module.exports.SponsorModel = new SponsorModel;
