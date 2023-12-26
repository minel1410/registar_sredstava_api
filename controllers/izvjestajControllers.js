const databaseControllers = require('./databaseControllers');


module.exports.izvjestaj_get = async (req, res) =>{
    res.render('index', {rez: [], message: ""});
}
module.exports.izvjestaj_post = async (req, res) =>{

    const datum = {
        datumOd: req.body.datumOd,
        datumDo: req.body.datumDo
    }
    console.log(datum.datumOd);
    if(!datum.datumOd || !datum.datumDo){
        res.render('index', {rez: [], message: "Popunite sva polja"});
        return;
    }
    const upit = `CALL izvrsi_obracun(?, ?);`;
    await databaseControllers.poveziSeNaBazu();
    await databaseControllers.izvrsiUpit(upit, [datum.datumOd, datum.datumDo]);
    const upit2 = `select rs.naziv_stalnog_sredstva, so.iznos_obracuna, so.greska
                    from registar_sredstava rs
                    join stavke_obracuna so
                    on rs.inventurni_broj = so.sredstvo_id
                    join zaglavlje_obracuna zo
                    on zo.zaglavlje_id = so.zaglavlje_id
                    where zo.datum_od = ? and zo.datum_do = ?;`
    const rez2 = await databaseControllers.izvrsiUpit(upit2, [datum.datumOd, datum.datumDo]);
    if(rez2){
        res.render('index', {rez: rez2, message: ""})
    }

}