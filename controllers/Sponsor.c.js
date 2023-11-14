class SponsorController{
    getSponsors(){
        return sponModl.SponsorModel.getAllSponsors(); 
    }
    addSponsor(category, sponsor){
       sponModl.SponsorModel.addSponsor(category,sponsor);
    }
    byCategory(category){
        return sponModl.SponsorModel.getSponsors(category)
    }
}
var sponModl = require('../models/sponsorModel')
module.exports = new SponsorController();