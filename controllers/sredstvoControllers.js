const databaseControllers = require('./databaseControllers');

module.exports.sredstvo_get_get = async (req, res) => {
    res.render('sredstvo', {error: false, message: ""})
}
module.exports.sredstvo_get_post = async (req, res) => {
    let sredstvo = {
        naziv: req.body.naziv,
        nomenklatura: req.body.nomenklatura,
        datum: req.body.datum_nabavke,
        dobavljac: req.body.dobavljac,
        rashodovano: req.body.rashodovano,
        mjesto: req.body.mjesto_sredstva,
        org_jed: req.body.org_jed
    }

    if(!sredstvo.naziv || !sredstvo.nomenklatura || !sredstvo.dobavljac || !sredstvo.org_jed){
        res.render('sredstvo', {error: true, message: "Polja označena sa * su obavezna."})
        return;
    }
    if(!sredstvo.rashodovano)
        sredstvo.rashodovano = 'ne';
    if(sredstvo.datum === '')
        sredstvo.datum = null;
    if(sredstvo.mjesto === '')
        sredstvo.mjesto = null;
    console.log(sredstvo);
    await databaseControllers.poveziSeNaBazu();
    const upit = `INSERT INTO registar_sredstava VALUES(
                  UUID(), ?, ?, ?, ?, ?, ?, ?);`;
    const rez = await databaseControllers.izvrsiUpit(upit,
        [sredstvo.naziv, sredstvo.nomenklatura, sredstvo.datum,
                sredstvo.dobavljac, sredstvo.rashodovano, sredstvo.mjesto,
                sredstvo.org_jed]);
    if(rez){
        res.render('sredstvo', {error: false, message: "Uspjesno ste unijeli sredstvo."});
    }
}

module.exports.sredstvo_delete = async (req, res) =>{

    let sredstvo = {
        naziv: req.query.naziv
    }
    await databaseControllers.poveziSeNaBazu();
    const upit2 = `CALL obrisi_sredstvo(?)`;
    const upit = `SELECT * FROM registar_sredstava WHERE naziv_stalnog_sredstva = ?`
    const rez = await databaseControllers.izvrsiUpit(upit, [sredstvo.naziv]);
    if(rez.length !== 0 ){
        console.log("Nadjeno sredstvo");
        await databaseControllers.izvrsiUpit(upit2, [sredstvo.naziv])
        res.render('sredstvo', {error: false, message: "Uspjesno ste obrisali sredstvo."});
        return;
    }
    else{
        console.log("Ne postoji to sredstvo");
        res.render('sredstvo', {error: true, message: "Greska pri brisanju sredstva."});
    }
}

