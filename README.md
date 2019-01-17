<h1 align="center">
  🏠<br/>Configuration de Home Assistant en français!<br/> <sup><sub>par <a href="https://www.facebook.com/roman.quenin">Roman Quenin</a> 🇨🇵</sub></sup>
</h1>

[![Price][img-price]][link-license]
[![License][img-license]][link-license]
[![Home Assistant version][img-ha-version]][link-ha-version]
[![Hass.io][img-hassio]][link-hassio]
[![GitHub Release][img-release]]
[![Build Status][img-travis-ci]]
[![Tweet][img-twitter]]

Configuration de [Home Assistant](https://home-assistant.io/) sous [Hass.io](https://home-assistant.io/hassio/) sur une [Raspberry Pi](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) pour un T3, offrant des automatisations pour la lumière, le climat, la sécurité et les appareils électroniques grâce à des commandes vocales et une interface intuitive.

<div align="center">
    <p><strong>N'hésite pas a <a href="#" title="star">⭐️</a> mon repo si tu le trouves utile! 😃</strong></p>
    <figure>
        <div>
            <img src="www/images/gif/uilovelace.gif" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Interface utilisateur Lovelace <a href="ui-lovelace.yaml">
 <code>Lovelace.yaml</code></a>.</strong></strong></p>
        </figcaption>
    </figure>
</div>

<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/01b.png" alt="Security group (Dark theme)" title="Security (Dark theme)" width="200">
            <img src="www/images/capture/02b.png" alt="Weather group" title="Weather" width="200">
            <img src="www/images/capture/03b.png" alt="Battery Levels group (Dark theme)" title="Battery Levels (Dark theme)" width="200">          
            <img src="www/images/capture/04b.png" alt="Climate Control group" title="Climate Control" width="200">
            <img src="www/images/capture/05b.png" alt="Ceiling group" title="Ceiling" width="200">
            <img src="www/images/capture/06b.png" alt="Atmospheric Safety group" title="Atmospheric Safety" width="200">
            <img src="www/images/capture/07b.png" alt="Actions group" title="Actions" width="200">            
            <img src="www/images/capture/08b.png" alt="Public Transit group" title="Public Transit schedules" width="200">
        </div>
        <figcaption>
            <p><strong>Sensor <a href="sensors.yaml"><code>sensors.yaml</code></a>.</strong></p>
        </figcaption>
    </figure>
</div>

## Table des matieres 📑

1. **[Bonjour](#bonjour-)**
2. **[Vue d'ensemble](#vue-densemble-)**\
    [Objectifs](#objectifs-) | [Smart Homme](#smart-homme-)
3. **[Principales caractéristiques](#principales-caractéristiques-)**\
    [Contrôle et surveillance climatique](#contrôle-et-surveillance-climatique-) | [Prévisions météo](#prévisions-météo-) | [Contrôle lumières](#contrôle-lumières-) | [Alarme et détection de présence](#alarme-et-détection-de-présence-) | [Scènes](#scènes-) | [Google Assistant commandes vocales](#google-assistant-commandes-vocales-) | [Informations](#informations-)
4. **[Setup](#setup-)**\
    [Matériel et technologies](#matériel-et-technologies-) | [Configuration](#configuration-) | [Système et bridges](#système-et-bridges-) | [Service de notifications](#service-de-notifications-) | [Appareils](#appareils-) | [Logiciels](#logiciels-) | [Usage](#usage-)
5. **[Licence](#licence-)**
6. **[Remerciements](#remerciements-)**

## Bonjour 🏃

Tu trouveras sur mon repo une configuration de Home Assistant complète et documentée, avec des captures d'écran, des astuces et commentaires. [Consulte le code](#) pour en savoir plus! 👀

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

## Vue d'ensemble 🌅

### Objectifs ⚽

- **Discret**: J'aime beaucoup la technologie, mais comme tout bon maître d'hôtel, il devrait rester à l'abri des regards tout en restant disponible dès qu'on le sollicite.
- **Modulaire**: Le code et les périphériques doivent être facilement remplaçables.
- **Pas de surcharge d'information:** Fournissez juste assez d'informations pour avoir une idée de ce qui se passe.
- **Accessible de multiples façons:** Ordinateurs, tablette, commande vocale, smartphones, boutons sans fil, télécommandes.
- **Interfaces utilisateur intuitives:** Un simple coup d'œil sur un groupe de capteurs / switchs devrait suffire à tout le monde pour comprendre les états actuels et savoir comment utiliser l'interface. 💡
- **Contrôles redondants:** Plusieurs interfaces doivent pouvoir contrôler les périphériques sans interférence. Les changements d’état des interventions manuelles ou des applications dédiées doivent être suivis autant que possible.
- **Google Assistant:** Google Home a su se rendre essentiel dans nos routines quotidiennes. C'est un outil particulièrement puissant pour gérer un intérieur connecté et des petites tâches de la vie de tous les jours qui auraient eu besoin de plusieurs appareils ou d'un smartphone. L'essayer c'est l'adopter.
<div align="center">
    <figure>
        <div>
            <a href="https://i.imgflip.com/203r6j.jpg" title="Wiretap meme"><img src="https://i.imgflip.com/203r6j.jpg" alt="Wiretap meme" width="400"></a>
        </div>
        <figcaption>
            <p><strong>🙈🙉🙊</strong></p>
        </figcaption>
    </figure>
</div>

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Smart Homme 🖖

- **En tant que résident** Je recherche une plate-forme domotique fiable pour gérer mes appareils connectés, qui puisse être facilement contrôlée de la manières la plus intuitives qu'il soit.
- **En tant qu'habitant** Je souhaite disposer d’une installation discrète et non permanente qui occupe le moins d’espace possible.
- **En tant que développeur** Je souhaite utiliser une plate-forme open source riche en fonctionnalités, accessible, flexible et activement maintenue a jour.
- **En tant que consommateur** Je veux choisir les appareils que je souhaite acquérir sans être nécessairement enfermé dans un écosystème fermé.
- **En tant que couple** nous voulons pouvoir unifier simplement nos appareils connectés sur la même interface, ainsi qu'obtenir un aperçu rapide des prévisions météorologiques et de la qualité de l'air dans l'appartement grâce à des interfaces simples à utiliser.



<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/01.png" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Page d'acceuil<a href="ui-lovelace.yaml">
        </figcaption>
    </figure>
</div>

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

## Principales caractéristiques ✅

### Contrôle et surveillance climatique 🌡

- **Surveillance température** des pieces salon, chambre, cuisine et salle de bain.
- **Surveillance humidité** des pieces salon, chambre, cuisine et salle de bain.
- **Surveillance co2** et qualité de l'air du salon.
- **Controle climatique de la chaleur avec Tado°**, le système d'automatisation Tado° étant tellement performant, tous mes réglages sont fait sur l'application mobile officielle. Le changement de température de la chaudière principale et de chaque radiateurs reste toutefois possible depuis l'UI. 



<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/04.png" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Contrôle du climat et suivi des températures.</strong></p>
        </figcaption>
    </figure>
</div>

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Prévisions météo ⛅

- **Statut et prévisions faciles à lire** avec [Custom animated weather card for Lovelace](https://community.home-assistant.io/t/custom-animated-weather-card-for-lovelace/58338) présentation des données réellement importantes.
- **Surveillance de la qualité de l'air extérieur** avec des niveaux numériques et une classification conviviale pour l'ozone, le monoxyde de carbone, le dioxyde d'azote, le dioxyde de soufre, les particules de 2,5 µm et la lumière ultraviolette.


<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/05.png" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Météo du jour et rapport sur la qualité de l'air.</strong></p>
        </figcaption>
    </figure>
</div>

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Contrôle lumières 💡

- **Philips Hue**:
    - Sélection manuelle de la couleur et luminosité.
    - Changer automatiquement les thèmes en fonction de l'heure et du jour.
- **Xiaomi Gateway**:
    - Sélection manuelle de la couleur et luminosité.
    - Veilleuse.
- **Veilleuses basées sur le mouvement**, lorsqu'un mouvement est détecté la nuit, par exemple, lorsque quelqu'un se réveille pour aller aux toilettes.
- Voir [`/lights/`](lights) et [`/automations/`](automations).



<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/09.png" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Contrôle des lumières.</strong></p>
        </figcaption>
    </figure>
</div>

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Alarme et détection de présence 👮

- **Détection de téléphone portable**, pour vérifier qui est actuellement à la maison ou ailleurs.
- **Détection de présence**, être alerté d'une présence en cas d'absence ou simplement automatiser l'allumage et l'extenction des lumières de l'entrée, de la cuisine et de la veilleuse du couloir pendant la nuit.
- **Détection de fumée**, être capable de réagir rapidement en cas de grosse chaleur.
- **Détection de porte ouverte**, savoir si la porte d'entrée vient de s'ouvrir.
- **Activation de l'alarme** l'alarme activée, si un malandrain venait à ouvrir votre porte d'entrée la détection de son ouverture vous permettra de déclencher une serie d'automatisation son et lumières qui lui feront regretter d'être passé.


<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/13.png" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Clavier de l'alarme, détecteurs et réglages.</strong></p>
        </figcaption>
    </figure>
</div>

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Scènes 🌈

- **Scènes globales intelligentes** pour créer des automatisations:
    - **Printemps/Boréale/Détente...** effectuer des fondus enchaînés, sélectionner des effets et modifier les couleurs pour créer une ambiance parfaite en toutes circonstances.
- **Scènes Harmony Hub** associer scènes et activités.
- **Scènes Emulated Roku/Harmony Hub** basé sur [`/custom_components/`](emulated_roku) pour créer des automatisations:
    - **Movie scene** en appuyant sur le seul bouton play de la telecommande Harmony cela demarre le contenu video, active l'éclairage d'ambiance et atténue les lumières intelligentes, puis revient aux réglages predefinis lors d'une pause / d'un arrêt.
    
<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/scene.PNG" alt="Actions group" title="Actions" width="325">
        </div>
        <figcaption>
            <p><strong>Scènes.</strong></p>
        </figcaption>
    </figure>
</div>

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Google Assistant commandes vocales 📣

- Ce majordome à portée de main, ou plutôt de voix, facilite notre quotidien de bien des façons : accès facile aux bulletins d'info, lecture de musique en multiroom, météo... mais il peut faire bien plus grace à Home Assistant et en conjugant tout ca avec IFTTT et Harmony Hub vous aller pouvoir prendre le controle de tous vos equipements.
- **[IFTTT](https://ifttt.com/)**, avec ce composant vous pouvez déclencher vos "applets" via le service «Webhooks» et ainsi activer les scripts et scènes de Home Assistant.

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Informations 🛎

- **[Summary](https://community.home-assistant.io/t/summary-card-and-badges-for-people-devices-and-status-with-python-script-and-custom-card/35210)** Résumez une liste donnée de groupes (personnes, périphériques utilisés, périphériques hors ligne, etc.) et affichez le nombre, les noms et l'état modifiés en dernier.
- **[upcoming-media-card](https://github.com/custom-cards/upcoming-media-card)** Composant Home Assistant pour connaitre les prochains episodes disponible sur Sonarr.
- **Surveillance de la consomation électrique des appareils** pour la consommation actuelle, quotidiènne et hebdomadaire.
- **Surveillance de l'état des téléchargements Sabnzbd** pour le statut, l'upspeed, le downspeed, la file de téléchargement et l'espace libre du disque.
- **Surveillance de l'état du nas Synology** pour la charge cpu, l'utilisation de la mémoire, l'upspeed, le downspeed et l'utilisation du disque.
- **Surveillance du statut de Home Assistant** pour la charge cpu, l'utilisation de la RAM, l'utilisation du disque, la version, la durée d'execution du systeme, l'heure actuelle... 🤓


<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/14.png" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Informations pértinentes.</strong></p>
        </figcaption>
    </figure>
</div>

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Panel Custom 🌡

- **Ajouter de nouvelles fonctionnalités**, panel_custom vous permet d’ajouter des panneaux à votre interface Home Assistant. Les panneaux sont répertoriés dans la barre latérale si vous le souhaitez et peuvent être hautement personnalisés.

<div align="center">
    <figure>
        <div>
            <img src="www/images/gif/panel.gif" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Informations pértinentes.</strong></p>
        </figcaption>
    </figure>
</div>


- **Floorplan** est une extension pour Home Assistant qui simplifie le contrôle de votre maison. Plutôt que de contrôler votre installation via les contrôles de Home Assistant, vous pouvez utiliser un plan de votre maison et interagir avec celui-ci.


<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/floorplan.png" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Informations pértinentes.</strong></p>
        </figcaption>
    </figure>
</div>

- **Hass Custom Alarm**. Les systèmes d’alarme domotique permettent un pilotage centralisé des équipements. Ils disposent d’une interface web et d’une application smartphone qui rendent les différentes fonctionnalités de votre installation accessibles n’importe où et n’importe quand.


<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/d.png" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Informations pértinentes.</strong></p>
        </figcaption>
    </figure>
</div>

- **TasmoAdmin** (anciennement SonWEB) est une interface Web d’administration permettant de gérer de manière centralisée tous vos périphériques flashés Sonoff-Tasmota. Quelques unes de ses caractéristiques:


<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/k.png" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Informations pértinentes.</strong></p>
        </figcaption>
    </figure>
</div>

- **Grafana** des pieces salon, chambre, cuisine et salle de bain.


<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/h.png" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Informations pértinentes.</strong></p>
        </figcaption>
    </figure>
</div>

- **Cloud9 IDE**, ce module complémentaire est une version intégrée de l'EDI Cloud9, conçu pour être utilisé avec Home Assistant. Il est conçu pour vous permettre de configurer et d'éditer la configuration de votre Home Assistant directement à partir de l'interface Web à l'aide d'un éditeur utile, joli et complet.


<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/j.png" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Informations pértinentes.</strong></p>
        </figcaption>
    </figure>
</div>

- **Hass.io Addons**, Les modules complémentaires de Hass.io permettent à l'utilisateur d'étendre la fonctionnalité autour de Home Assistant. Il peut s’agir d’exécuter une application que Home Assistant peut intégrer (comme un courtier MQTT) ou de partager la configuration via Samba pour une édition facile à partir d’autres ordinateurs. Les modules complémentaires peuvent être configurés via le panneau Hass.io dans Home Assistant.


<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/i.png" alt="Lovelace animation" title="Vues">
        </div>
        <figcaption>
            <p><strong>Informations pértinentes.</strong></p>
        </figcaption>
    </figure>
</div>

<p align="right"><a href="#top" title="Back to top">🔝</a></p>



## Setup 🔩

<div align="center">
    <figure>
        <div>
            <img src="www/images/capture/diagram.png" alt="Home Assistant technology diagram">
        </div>
        <figcaption>
            <p><strong>Diagramme de configuration(<a href="www/images/capture/diagram.png"><code>PNG</code></a>, <a href="www/images/capture/diagram.svg"><code>SVG</code></a>). Réalisé avec <a href="https://drive.google.com/file/d/1CCU4UMo60FiKnO6CYuxzbSaJUKzDQTIl/view?usp=sharing">Draw.io.</strong></p>
        </figcaption>
    </figure>
</div>

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Matériel et technologies 🧱

- **Asuswrt-Merlin** pour obtenir un équipement réseau professionnel fiable, facile et solide. Et parce qu'entendre une plainte de moins (signal WiFi perdu) de ma petite amie ça n'a pas de prix 🤕
- **Onduleur** pour ne pas craindre les pannes de courant intempestives.
- **WiFi** pour son faible coût, son omniprésence et son ouverture.
- **Z-Wave** pour une fiabilité et une interopérabilité garanties entre fournisseurs (contrairement à Zigbee…)

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Configuration ⚙

- **VLAN dédié avec pare-feu** (Virtual LAN) pour séparer tous les périphériques IoT des autres équipements.
- **IP statiques locales** pour tous les appareils afin de minimiser les pertes de connexions aléatoires.
- **Documentation abondante**, pour moi plus tard et pour aider les autres.
- **Code partageable** avec tous les identificateurs conservés dans un fichier _secrets_ non engagé.

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Système et bridges 🌉

- **[Raspberry Pi 3 Model B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/)** fait tourner Hass.io.
- **[Aeotec Z-Stick Gen5](https://aeotec.com/z-wave-usb-stick)** dongle USB Z-Wave.
- **[Philips Hue](https://www.home-assistant.io/components/hue/)** pour contrôler vos éclairages Philips Hue.
- **[Xiaomi Gateway](https://www.home-assistant.io/components/xiaomi_aqara/)** pour contrôler des appareils Xiaomi Aqara.
- **[Logitech Harmony](https://www.home-assistant.io/components/remote.harmony/)** pour contrôler vocalement tous les appareils IR.
- **[Netatmo Station Météo°](https://www.home-assistant.io/components/tado/)** pour surveiller le climat et la qualité de l'air.
- **[Tado°](https://www.home-assistant.io/components/tado/)** pour contrôler le thermostat et les radiateurs.

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Service de notifications 📲

- **[Pushbullet](https://www.pushbullet.com/)** La plate-forme de notification pushbullet envoie des messages à Pushbullet, un service gratuit permettant d'envoyer des informations entre vos téléphones, navigateurs et amis! 😍

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Appareils 🔨

#### Lumières 💡

- **[Hue E27 White and Color Ambiance](https://www2.meethue.com/fr-fr/p/hue-white-and-color-ambiance-pack-de-2-e27/8718696729052)** salon (x2), cuisine (x2), chambre (1), entrée (x1).
- **[Hue Lightstrip Plus](https://www2.meethue.com/fr-fr/p/hue-white-and-color-ambiance-white-and-color-ambiance-lightstrip-plus/7190155PH)** salon (x2), chambre (x1).
- **[Hue GU10 White and Color](https://www2.meethue.com/fr-fr/p/hue-white-and-color-ambiance-ampoule-individuelle-gu10/8718696485880)**  entrée (x2).
- **[Hue Living Color](https://www.amazon.fr/Philips-LivingColors-D%C3%A9coration-Lampes-datmosph%C3%A8re/dp/B009567QO8)** salon (x1).
- **[Hue Play](https://www2.meethue.com/fr-fr/p/hue-white-and-color-ambiance-hue-play-pack-x2/7820230P7)** salon (x2).
- **[Hue Bloom](https://www2.meethue.com/fr-fr/p/hue-white-and-color-ambiance-lampe-a-poser-bloom/7299760PH)** salon (x1).
- **[Hue Signe](https://www2.meethue.com/fr-fr/p/hue-white-and-color-ambiance-eclairage-au-sol-signe/4080248P7)** salon (x1).
- **[Xiaomi Gateway](https://www.home-assistant.io/components/light.xiaomi_aqara/)** cuisine (x1).
- **[Osram SMART+ Plug](https://smartplus.ledvance.fr/produits/index.jsp)** <sup>[WiFi]</sup> pour contrôler l'alimentation de certain appareills (x2).

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

#### Sensors 📡

- **[Xiaomi Aqara Capteur de Porte-Fenêtre](https://fr.gearbest.com/access-control/pp_626703.html?wid=1433363&currency=EUR&vip=14484435&gclid=EAIaIQobChMIwcSr5sTP3wIVTud3Ch1rpgBAEAQYASABEgIZ1fD_BwE)** <sup>[WiFi]</sup> détection d'ouverture de la porte d'entrée.
- **[Xiaomi Capteur Intelligent de Corps Humain](https://fr.gearbest.com/smart-light-bulb/pp_257678.html?wid=1433363&currency=EUR&vip=4386417&gclid=EAIaIQobChMIwcSr5sTP3wIVTud3Ch1rpgBAEAQYBSABEgK5MfD_BwE)** <sup>[WiFi]</sup> détection de la présence dans le couloir.
- **[Fibaro Motion Sensor](https://www.fibaro.com/fr/products/motion-sensor/)** <sup>[Z-Wave]</sup> détection de la température/humidité/présence dans la cuisine.
- **[Aeotec MultiSensor 6](https://aeotec.com/z-wave-sensor)** <sup>[Z-Wave]</sup> détection de la température/humidité/présence dans l'entrée.
- **[Aeotec Range Extender 6](https://aeotec.com/z-wave-repeater)** <sup>[Z-Wave]</sup> pour étendre le réseau Z-Wave.

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

#### Ventilateur 🌀

- **[Dyson Pure Cool Link](https://www.dyson.fr/ventilateurs-et-chauffages/purificateurs/dyson-pure-cool/caracteristiques.aspx)** <sup>[WiFi]</sup> pour nous rafraichir et purifier l'air.

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

#### Camera 📽️

- **[Xiaomi Yi Dome](https://www.yicamera.fr/camera-surveillance/21-yi-dome-camera-720p-camera-dome-connecte-6970171171097.html)** <sup>[WiFi]</sup> pour surveiller le chat en notre absence.

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

#### Switches 🔌

- **[TP-Link HS110](https://www.tp-link.com/fr/products/details/cat-5258_HS110.html)** <sup>[WiFi]</sup> pour contrôler et relever la consomation de mes appareils électroniques (x2).
- **[Sonoff Basic](https://sonoff.itead.cc/en/products/sonoff/sonoff-basic)** <sup>[mqtt]</sup> pour contrôler l'alimentation de certain appareills (x5).
- **[Wake on Lan](https://www.home-assistant.io/components/wake_on_lan/)** <sup>[WiFi]</sup> pour allumer mon PC.

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

#### Media Players et autres appareils 📺

- **[Google Home](https://store.google.com/fr/product/google_home)** <sup>[WiFi]</sup> pour jouer de la musique et tout contrôler dans la maison.
- **[Google Home Mini](https://store.google.com/fr/product/google_home_mini)** <sup>[WiFi]</sup> pour jouer de la musique a bas volume et tout contrôler dans la maison.
- **[Yamaha RX-A3060](https://fr.yamaha.com/fr/products/audio_visual/av_receivers_amps/rx-a3060/index.html)** <sup>[ethernet]</sup> pour le contrôle vocal (on, off , mute, input1, audio2...).
- **[Samsung Qled](https://www.samsung.com/ch_fr/tvs/qled-q7fn/QE75Q7FNATXZG/)** <sup>[ethernet]</sup> pour le contrôle vocal (on, off ,mute, hdmi 2, hdmi4...).
- **[Zappiti](http://www.zappiti.com/FR/zappiti-mini-4k-hdr.html)** <sup>[ethernet]</sup> pour le contrôle vocal (play, pause, stop, sous-titres...).

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

### Logiciels 💻

- **[Hass.io](https://home-assistant.io)** sur Raspberry Pi 3 Model B+.
- **[Fully Kiosk Browser](https://www.ozerov.de/fully-kiosk-browser/)** sur ma tablette.

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

#### Hass.io add-ons ➕

- **[Grafana](https://github.com/home-assistant/appdaemon)** permet la visualisation et la mise en forme de données métriques.
- **[InfluxDB](https://home-assistant.io/addons/mosquitto)** est un système de gestion de base de données.
- **[TasmoAdmin](https://github.com/reloxx13/TasmoAdmin)** TasmoAdmin est un site Web administratif pour les périphériques flashés avec Sonoff-Tasmota.
- **[Mosquitto MQTT broker](https://home-assistant.io/addons/mosquitto)** Mosquitto est un courtier de messages open source  MQTT léger.
- **[Bluetooth BCM43xx](https://www.home-assistant.io/addons/bluetooth_bcm43xx/)** active le suivi des appareils Bluetooth.
- **[Samba share](https://home-assistant.io/addons/samba)** pour le partage de fichiers de configuration.
- **[SSH server](https://home-assistant.io/addons/ssh)** pour un accès en ligne de commande.

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

#### Composants et widgets de la communauté 🏘️

- **[Lovelace](https://www.home-assistant.io/lovelace/)** la nouvelle interface utilisateur de Home Assistant. Rapide, personnalisable et puissant, que ce soit sur mobile ou sur ordinateur.
- **[floorplan](https://github.com/pkozul/ha-floorplan)** Intégration à Home Assistant sous forme de carte ou de panneau personnalisé.
- **[Hass-Custom-Alarm](https://github.com/gazoscalvertos/Hass-Custom-Alarm)** version personnalisée du panneau d'alarme dans l'espoir d'apporter de nombreuses nouvelles fonctionnalités
- **[Zanzito](https://community.home-assistant.io/t/zanzito-a-lightweight-bridge-between-your-android-device-and-your-mqtt-home-automation-system/20228)** est une application qui sert de pont entre votre téléphone Android et un serveur MQTT.
- **[Emulated Roku](https://community.home-assistant.io/t/emulated-roku-for-harmony/21491)** pour mapper tous les boutons de la télécommande Harmony sur les touches Roku, qui déclenchent des événements que vous pouvez utiliser dans les automatismes.
- **[Raspberry Pi power sensor](https://github.com/custom-components/sensor.rpi_power)** avertir en cas d'alimentation électrique insuffisante.
- **[Summary card](https://community.home-assistant.io/t/summary-card-and-badges-for-people-devices-and-status-with-python-script-and-custom-card/35210)** python script pour résumer une liste donnée de groupes (personnes, périphériques utilisés, périphériques hors ligne, etc.) et affichez le nombre, les noms et l'état modifiés en dernier

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

## Licence 📃

- Le code et la configuration sont autorisés sous la [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).
- La documentation est sous licence Creative Commons [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

## Remerciements 💕

Kudos pour:

- **L'[équipe de base](https://home-assistant.io/blog)** qui construit et gère Home Assistant. Ils travaillent vite et humblement.
- **La horde de développeurs volontaires** de tous les composants et add-ons.
- **La [communautée dynamique](https://community.home-assistant.io)**, toujours prête à aider et à partager des échantillons de code.
- **La chaine YouTube de [BRUH Automation](https://www.youtube.com/c/bruhautomation1)**, Les vidéos de Ben m'ont rendu accro à Home Assistant.
- **Le Github de [René-Marc Simmard](https://github.com/renemarc/home-assistant-config)**, que j'ai copié, traduit et adapté pour mon repo. Merci pour le partage René-Marc.

Merci pour votre dévouement, votre gentillesse et vos précieuses connaissances. À votre santé! 🍻😃

<p align="right"><a href="#top" title="Back to top">🔝</a></p>

<p align="center"><strong>N'oublie pas de <a href="#" title="star">⭐️</a> ce repo! 😃</strong></p>

[img-ha-version]:https://img.shields.io/badge/Home_Assistant-0.84.3-53c1f1.svg?logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIxLjgsMTNIMjBWMjFIMTNWMTcuNjdMMTUuNzksMTQuODhMMTYuNSwxNUMxNy42NiwxNSAxOC42LDE0LjA2IDE4LjYsMTIuOUMxOC42LDExLjc0IDE3LjY2LDEwLjggMTYuNSwxMC44QTIuMSwyLjEgMCAwLDAgMTQuNCwxMi45TDE0LjUsMTMuNjFMMTMsMTUuMTNWOS42NUMxMy42Niw5LjI5IDE0LjEsOC42IDE0LjEsNy44QTIuMSwyLjEgMCAwLDAgMTIsNS43QTIuMSwyLjEgMCAwLDAgOS45LDcuOEM5LjksOC42IDEwLjM0LDkuMjkgMTEsOS42NVYxNS4xM0w5LjUsMTMuNjFMOS42LDEyLjlBMi4xLDIuMSAwIDAsMCA3LjUsMTAuOEEyLjEsMi4xIDAgMCwwIDUuNCwxMi45QTIuMSwyLjEgMCAwLDAgNy41LDE1TDguMjEsMTQuODhMMTEsMTcuNjdWMjFINFYxM0gyLjI1QzEuODMsMTMgMS40MiwxMyAxLjQyLDEyLjc5QzEuNDMsMTIuNTcgMS44NSwxMi4xNSAyLjI4LDExLjcyTDExLDNDMTEuMzMsMi42NyAxMS42NywyLjMzIDEyLDIuMzNDMTIuMzMsMi4zMyAxMi42NywyLjY3IDEzLDNMMTcsN1Y2SDE5VjlMMjEuNzgsMTEuNzhDMjIuMTgsMTIuMTggMjIuNTksMTIuNTkgMjIuNiwxMi44QzIyLjYsMTMgMjIuMiwxMyAyMS44LDEzTTcuNSwxMkEwLjksMC45IDAgMCwxIDguNCwxMi45QTAuOSwwLjkgMCAwLDEgNy41LDEzLjhBMC45LDAuOSAwIDAsMSA2LjYsMTIuOUEwLjksMC45IDAgMCwxIDcuNSwxMk0xNi41LDEyQzE3LDEyIDE3LjQsMTIuNCAxNy40LDEyLjlDMTcuNCwxMy40IDE3LDEzLjggMTYuNSwxMy44QTAuOSwwLjkgMCAwLDEgMTUuNiwxMi45QTAuOSwwLjkgMCAwLDEgMTYuNSwxMk0xMiw2LjlDMTIuNSw2LjkgMTIuOSw3LjMgMTIuOSw3LjhDMTIuOSw4LjMgMTIuNSw4LjcgMTIsOC43QzExLjUsOC43IDExLjEsOC4zIDExLjEsNy44QzExLjEsNy4zIDExLjUsNi45IDEyLDYuOVoiIGZpbGw9IiNmZmZmZmYiIC8+PC9zdmc+Cg==&maxAge=21600
[img-hassio]:https://img.shields.io/badge/config_for-Hass.io-53c1f1.svg?logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyLDE1LjVBMy41LDMuNSAwIDAsMSA4LjUsMTJBMy41LDMuNSAwIDAsMSAxMiw4LjVBMy41LDMuNSAwIDAsMSAxNS41LDEyQTMuNSwzLjUgMCAwLDEgMTIsMTUuNU0xOS40MywxMi45N0MxOS40NywxMi42NSAxOS41LDEyLjMzIDE5LjUsMTJDMTkuNSwxMS42NyAxOS40NywxMS4zNCAxOS40MywxMUwyMS41NCw5LjM3QzIxLjczLDkuMjIgMjEuNzgsOC45NSAyMS42Niw4LjczTDE5LjY2LDUuMjdDMTkuNTQsNS4wNSAxOS4yNyw0Ljk2IDE5LjA1LDUuMDVMMTYuNTYsNi4wNUMxNi4wNCw1LjY2IDE1LjUsNS4zMiAxNC44Nyw1LjA3TDE0LjUsMi40MkMxNC40NiwyLjE4IDE0LjI1LDIgMTQsMkgxMEM5Ljc1LDIgOS41NCwyLjE4IDkuNSwyLjQyTDkuMTMsNS4wN0M4LjUsNS4zMiA3Ljk2LDUuNjYgNy40NCw2LjA1TDQuOTUsNS4wNUM0LjczLDQuOTYgNC40Niw1LjA1IDQuMzQsNS4yN0wyLjM0LDguNzNDMi4yMSw4Ljk1IDIuMjcsOS4yMiAyLjQ2LDkuMzdMNC41NywxMUM0LjUzLDExLjM0IDQuNSwxMS42NyA0LjUsMTJDNC41LDEyLjMzIDQuNTMsMTIuNjUgNC41NywxMi45N0wyLjQ2LDE0LjYzQzIuMjcsMTQuNzggMi4yMSwxNS4wNSAyLjM0LDE1LjI3TDQuMzQsMTguNzNDNC40NiwxOC45NSA0LjczLDE5LjAzIDQuOTUsMTguOTVMNy40NCwxNy45NEM3Ljk2LDE4LjM0IDguNSwxOC42OCA5LjEzLDE4LjkzTDkuNSwyMS41OEM5LjU0LDIxLjgyIDkuNzUsMjIgMTAsMjJIMTRDMTQuMjUsMjIgMTQuNDYsMjEuODIgMTQuNSwyMS41OEwxNC44NywxOC45M0MxNS41LDE4LjY3IDE2LjA0LDE4LjM0IDE2LjU2LDE3Ljk0TDE5LjA1LDE4Ljk1QzE5LjI3LDE5LjAzIDE5LjU0LDE4Ljk1IDE5LjY2LDE4LjczTDIxLjY2LDE1LjI3QzIxLjc4LDE1LjA1IDIxLjczLDE0Ljc4IDIxLjU0LDE0LjYzTDE5LjQzLDEyLjk3WiIgZmlsbD0iI2ZmZmZmZiIgLz48L3N2Zz4K&maxAge=86400
[img-license]:https://img.shields.io/github/license/renemarc/home-assistant-config.svg?logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE3LjgsMjBDMTcuNCwyMS4yIDE2LjMsMjIgMTUsMjJINUMzLjMsMjIgMiwyMC43IDIsMTlWMThINUwxNC4yLDE4QzE0LjYsMTkuMiAxNS43LDIwIDE3LDIwSDE3LjhNMTksMkMyMC43LDIgMjIsMy4zIDIyLDVWNkgyMFY1QzIwLDQuNCAxOS42LDQgMTksNEMxOC40LDQgMTgsNC40IDE4LDVWMThIMTdDMTYuNCwxOCAxNiwxNy42IDE2LDE3VjE2SDVWNUM1LDMuMyA2LjMsMiA4LDJIMTlNOCw2VjhIMTVWNkg4TTgsMTBWMTJIMTRWMTBIOFoiIGZpbGw9IiNmZmZmZmYiIC8+PC9zdmc+Cg==&maxAge=86400
[img-price]:https://img.shields.io/badge/price-FREE-53c1f1.svg?logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTcsMTVIOUM5LDE2LjA4IDEwLjM3LDE3IDEyLDE3QzEzLjYzLDE3IDE1LDE2LjA4IDE1LDE1QzE1LDEzLjkgMTMuOTYsMTMuNSAxMS43NiwxMi45N0M5LjY0LDEyLjQ0IDcsMTEuNzggNyw5QzcsNy4yMSA4LjQ3LDUuNjkgMTAuNSw1LjE4VjNIMTMuNVY1LjE4QzE1LjUzLDUuNjkgMTcsNy4yMSAxNyw5SDE1QzE1LDcuOTIgMTMuNjMsNyAxMiw3QzEwLjM3LDcgOSw3LjkyIDksOUM5LDEwLjEgMTAuMDQsMTAuNSAxMi4yNCwxMS4wM0MxNC4zNiwxMS41NiAxNywxMi4yMiAxNywxNUMxNywxNi43OSAxNS41MywxOC4zMSAxMy41LDE4LjgyVjIxSDEwLjVWMTguODJDOC40NywxOC4zMSA3LDE2Ljc5IDcsMTVaIiBmaWxsPSIjZmZmIiAvPjwvc3ZnPgo=&maxAge=86400
[img-release]:https://img.shields.io/github/release/renemarc/home-assistant-config/all.svg?logo=github&logoColor=white&maxAge=21600
[img-travis-ci]:https://img.shields.io/travis/renemarc/home-assistant-config.svg?branch=master&logo=travis
[img-twitter]:https://img.shields.io/twitter/url/http/shields.io.svg?style=social&maxAge=86400

[link-board]:https://github.com/renemarc/home-assistant-config/projects/1
[link-ha-version]:https://github.com/home-assistant/home-assistant/tree/0.84.3
[link-hassio]:https://home-assistant.io/hassio/
[link-issues]:https://github.com/renemarc/home-assistant-config/issues
[link-license]:LICENSE.txt
[link-release]:https://github.com/renemarc/home-assistant-config/releases
[link-travis-ci]:https://travis-ci.org/renemarc/home-assistant-config
[link-twitter]:https://twitter.com/intent/tweet?text=Automate%20your%20home%20into%20a%20smart-looking%20place!&url=https://github.com/renemarc/home-assistant-config&via=renemarc&hashtags=HomeAssistant,SmartHome,ConnectedHome,HomeAutomation,IoT
