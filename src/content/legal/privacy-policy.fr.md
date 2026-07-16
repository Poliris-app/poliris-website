# Politique de confidentialité

**Dernière mise à jour : 15 juillet 2026**

La présente Politique de confidentialité explique comment **FCFD**, société à responsabilité limitée (SARL) de droit français au capital de 100 €, immatriculée au Registre du Commerce et des Sociétés (RCS) de Sarreguemines sous le numéro 940 441 876, dont le siège social est situé 12 rue Saint-Blaise, 57460 Behren-lès-Forbach, France (« **Poliris** », « **nous** »), collecte et traite des données personnelles lorsque vous :

- visitez notre site **poliris.io** (le « Site ») ;
- utilisez la plateforme Poliris à l'adresse **app.poliris.io** (le « Service ») ;
- installez et utilisez le **plugin WordPress Poliris** (le « Plugin »).

FCFD exploite le Service sous la marque **Poliris**. FCFD est responsable du traitement des données décrit dans la présente politique, sauf mention contraire à la Section 4.

**Contact vie privée :** florian.michel@poliris.io

---

## 1. Données que nous collectons

### 1.1 Lorsque vous visitez le Site

- Données techniques : adresse IP, type et version du navigateur, type d'appareil, pages consultées, référent, et données de journalisation similaires, collectées à des fins de sécurité et pour assurer le fonctionnement du Site.
- Données que vous soumettez volontairement : nom, adresse e-mail, nom de l'entreprise, et contenu du message lorsque vous remplissez un formulaire de contact ou de demande de démonstration.

### 1.2 Lorsque vous créez et utilisez un compte Poliris

- Données de compte : nom, adresse e-mail professionnelle, mot de passe (stocké haché), nom de l'entreprise, et coordonnées de facturation.
- Données d'utilisation : actions effectuées au sein du Service, projets et sites configurés, et communications avec le support.
- Données de contenu : les domaines, URL, mots-clés, prompts, et le contenu de sites web publiquement accessible que vous demandez à Poliris d'auditer et d'analyser. Les audits de sites sont réalisés en explorant les pages publiquement accessibles des sites que vous configurez ; cette exploration fonctionne indépendamment du Plugin.

### 1.3 Lorsque vous utilisez le Plugin WordPress

Le Plugin est un connecteur léger entre votre site WordPress et votre compte Poliris. Lorsque vous connectez (« appairez ») un site WordPress, le Plugin nous transmet, via HTTPS :

- un **mot de passe d'application WordPress** (un identifiant d'accès natif et révocable de WordPress, créé pour le compte administrateur effectuant l'appairage) ;
- le code d'appairage ;
- l'URL du site ;
- le nom d'utilisateur WordPress de l'administrateur effectuant l'appairage ;
- la version de WordPress et la version du Plugin ;
- le nom du plugin SEO actif (par exemple Yoast SEO, Rank Math), le cas échéant.

Une fois un site appairé :

- lorsque vous approuvez une modification dans le tableau de bord Poliris, nous transmettons le contenu de cette modification à votre site via l'API REST de WordPress (par exemple un titre mis à jour, une meta description, du contenu de page, un texte alternatif d'image, ou un nouvel article de blog créé en brouillon) ;
- lors des visites régulières des pages du site, le Plugin récupère auprès de Poliris la liste des correctifs actuellement approuvés pour votre site et envoie des signaux légers de statut de connexion (« heartbeat »). Il s'agit de **requêtes serveur à serveur identifiées uniquement par un identifiant opaque propre au site et un horodatage**.

### 1.4 Ce que nous NE collectons PAS

- Le Plugin ne collecte ni ne transmet **aucune** donnée personnelle des visiteurs de votre site web : ni adresses IP, ni cookies, ni données analytiques, ni comportement de navigation, ni données clients ou de commerce électronique.
- Le Plugin ne dépose aucun cookie sur votre site et n'envoie aucune télémétrie d'usage.
- Nous ne vendons pas les données personnelles et ne les utilisons pas à des fins publicitaires.

## 2. Finalités et bases légales (RGPD)

| Traitement | Finalité | Base légale |
|---|---|---|
| Compte, facturation, et fonctionnement du Service | Fournir le Service auquel vous avez souscrit | Exécution d'un contrat (Art. 6(1)(b) RGPD) |
| Flux de données du Plugin décrits en 1.3 | Appliquer à votre site les correctifs SEO/GEO et le contenu que vous approuvez | Exécution d'un contrat (Art. 6(1)(b) RGPD) |
| Journaux et sécurité du Site | Sécuriser et maintenir le Site et le Service | Intérêt légitime (Art. 6(1)(f) RGPD) |
| Demandes de contact et de démonstration | Répondre à votre demande | Mesures précontractuelles (Art. 6(1)(b) RGPD) |
| Obligations légales et comptables | Respecter le droit fiscal et commercial français | Obligation légale (Art. 6(1)(c) RGPD) |

## 3. Où vos données sont hébergées et nos sous-traitants

Notre infrastructure est hébergée dans l'**Union européenne**. Nous faisons appel aux catégories de sous-traitants suivantes :

| Sous-traitant | Rôle | Lieu de traitement |
|---|---|---|
| Fly.io, Inc. | Hébergement applicatif | Union européenne (région UE) |
| Vercel Inc. | Hébergement du site et du front-end | Union européenne (région UE) |
| Supabase, Inc. | Hébergement de base de données | Union européenne (région UE) |
| OpenAI, L.L.C. | Analyse IA et génération de contenu | États-Unis |
| Anthropic, PBC | Analyse IA et génération de contenu | États-Unis |
| Google LLC (API Gemini) | Analyse IA et génération de contenu | États-Unis |
| [Prestataire de paiement — Stripe, Inc.] | Paiements d'abonnement | États-Unis / UE |

## 4. Transferts internationaux

Lorsque des données sont transférées hors de l'Espace économique européen (notamment vers les fournisseurs d'IA mentionnés ci-dessus), nous nous appuyons sur le **Data Privacy Framework UE–États-Unis** lorsque le destinataire y est certifié, et sur les **clauses contractuelles types (CCT)** de la Commission européenne, accompagnées de mesures supplémentaires appropriées le cas échéant.

Lorsque nous traitons du contenu de site web, des identifiants, ou d'autres données pour le compte de nos clients professionnels en lien avec leurs propres sites web, nous agissons en tant que **sous-traitant** et le client agit en tant que responsable du traitement. Un accord de traitement des données (Data Processing Agreement, DPA) régissant ce traitement est disponible sur demande à l'adresse florian.michel@poliris.io.

## 5. Conservation des données

- Données de compte et du Service : conservées pendant la durée de votre contrat, puis supprimées dans les **90 jours** suivant la résiliation. Les sauvegardes sont purgées dans les **30 jours** supplémentaires.
- **Mots de passe d'application WordPress : supprimés immédiatement** lorsque vous déconnectez le site du tableau de bord Poliris, révoquez le mot de passe d'application dans WordPress, ou désactivez le Plugin.
- Registres de facturation : conservés pendant **10 ans**, conformément au droit commercial et fiscal français.
- Demandes via le formulaire de contact n'aboutissant pas à un contrat : supprimées dans les **24 mois**.

## 6. Sécurité

Toutes les données en transit sont chiffrées via HTTPS/TLS. Les mots de passe d'application WordPress sont stockés **chiffrés au repos**. L'accès aux systèmes de production est restreint au personnel autorisé, selon le principe du besoin d'en connaître.

## 7. Vos droits

Si vous résidez dans l'EEE ou au Royaume-Uni, vous disposez du droit d'accéder à vos données personnelles, de les rectifier, de les effacer, et de les porter, ainsi que du droit de limiter ou de vous opposer à leur traitement, et de retirer votre consentement lorsque le traitement repose sur celui-ci. Vous pouvez également introduire une réclamation auprès de votre autorité de contrôle ; en France, il s'agit de la **CNIL** (www.cnil.fr).

Si vous résidez en Californie, vous disposez de droits équivalents en vertu du CCPA/CPRA, y compris le droit de savoir, de supprimer, et de corriger vos informations personnelles, ainsi que le droit à la non-discrimination. Nous ne vendons ni ne partageons d'informations personnelles au sens du CCPA.

Pour exercer l'un de ces droits, contactez **florian.michel@poliris.io**. Nous répondons dans un délai d'un mois (RGPD) ou de 45 jours (CCPA).

Vous pouvez retirer au Plugin l'accès à votre site WordPress à tout moment, sans nous contacter, en révoquant le mot de passe d'application « Poliris Connector » dans votre profil utilisateur WordPress, en déconnectant le site dans le tableau de bord Poliris, ou en désactivant le Plugin.

## 8. Cookies

Le Site utilise uniquement des cookies strictement nécessaires à son fonctionnement (par exemple des cookies de session et de sécurité). Si nous introduisons à l'avenir des cookies analytiques ou publicitaires, nous solliciterons votre consentement préalable via une bannière de consentement et mettrons à jour la présente politique. **Le plugin WordPress ne dépose aucun cookie sur votre site.**

## 9. Mineurs

Le Service est un outil professionnel et ne s'adresse à aucune personne de moins de 18 ans. Nous ne collectons pas sciemment de données auprès de mineurs.

## 10. Modifications de la présente politique

Nous pouvons mettre à jour cette politique de temps à autre. La date de « Dernière mise à jour » en haut de page reflète la version la plus récente. Les titulaires de compte seront informés des modifications substantielles par e-mail ou via le Service.

## 11. Contact

**FCFD (Poliris)**\
12 rue Saint-Blaise, 57460 Behren-lès-Forbach, France\
Confidentialité : florian.michel@poliris.io\
Juridique : florian.michel@fcfd.fr
