# ecrire_etat_entite.py

#--------------------------------------------------------------------------------------------------
# Force l'écriture de l'état d'une entité (ses attributs ne sont pas modifiés)
#--------------------------------------------------------------------------------------------------
#Récupération de l'entité à écrire
inputEntity = data.get('entity_id')

#Récupératon de la valeur à écrire
inputState = data.get('state')

#Chargement de l'entité à son état actuel
inputStateObject = hass.states.get(inputEntity)

#On recopie les attributs
inputAttributesObject = inputStateObject.attributes.copy()

#Ecriture de la nouvelle valeur de l'entité avec conservation des attributs
hass.states.set(inputEntity, inputState, inputAttributesObject)