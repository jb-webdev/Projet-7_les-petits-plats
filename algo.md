si this.objetTagRecherche.bar === '' && this.objetTagRecherche.tags.length <= 0
    alors tu filtre toutes le srecette et tu affiche toutes les recettes

sinon si this.objetTagRecherche.bar != '' && this.objetTagRecherche.tags.length <= 0
    alors tu filtre les recettes par rapport au resultat de recherche

sinon si this.objetTagRecherche.bar === '' && this.objetTagRecherche.tags.length > 0
    alors tu filtre les recettes par rapport tableau de tag 
sinon si this.objetTagRecherche.bar != '' && this.objetTagRecherche.tags.length > 0
    alors tu creer un tableau tu tri le recette par rapport a la barre de recherche
    en suite tu tri le bleau reçu par rapport au critère de tag