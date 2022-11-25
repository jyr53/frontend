export default async function (context) {
    if (context.$auth.ctx.query.code) {
        context.$auth.$storage.setUniversal("code", context.$auth.ctx.query.code);  // stoke la donnée en memoire 
        
    }
    else {
        console.log("je suis en attente de google");
    }
    if (context.$auth.$storage.getUniversal("code") && context.$auth.loggedIn && !context.$auth.$storage.getUniversal("api_token")) {
        let collect =
        {
            username: "",
            password: ""
        }
        collect.password = context.$auth.$storage.getUniversal("code");//recuperation du code
        collect.username = context.$auth.user.email;//recuperation du mail
        let TokenAPI = await fetch('http://localhost:8765/api/tcia/users/login', {//envoi de la requete
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: 'application/json'
            },
            responseType: 'json',
            body: new URLSearchParams(collect) //encodage de la demande 
        })
        TokenAPI = await TokenAPI.json()
        context.$auth.$storage.setState("api_token", TokenAPI.token);  //stokage du token api pour les appelles  
    }
    else {
        console.log('authentification impossible reessayer');
    }
}

