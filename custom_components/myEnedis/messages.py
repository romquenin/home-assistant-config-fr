listeMessages = \
{
    "ERR_001" : "",
    "token_refresh_401" : "Erreur de token - Merci de renouveller vos consentements.",
    "no_data_found" : "Donnees non disponible",
    "client_not_found": "Client inconnu",
    "Invalid_request": "Erreur requete",
    "Internal Server error": "Erreur Interne Enedis",
    "result_500": "Erreur interne Enedis(500)",
    "UNKERROR_001": "Erreur interne Enedis(001)",
    "UNKERROR_002": "Erreur timeout",
    "UNKERROR_003": "Client inconnu, veuillez valider vos consentements avant d'utiliser nos services",
}

def getMessage( codeMessage ):
    if ( codeMessage in listeMessages.keys()):
        return listeMessages[ codeMessage ]
    else:
        return codeMessage