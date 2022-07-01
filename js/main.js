import { ReceiptsProvider } from './provider/provider.js'

import { Card } from './Factories/Card.js'
import { Recipe } from './models/Recipe.js'
import { researchBar, researchTag } from './utils/filterFunction.js'
import { openDropDown } from './utils/itemsFunction.js'

class Index {
	constructor() {
		this.receiptsProvider = new ReceiptsProvider('../data/recipes.json')
		this.containerRecipeCards = document.querySelector('.wrapperCards')
		this.eventResearchBar = document.getElementById('inputResearch')
		this.wrapperTag = document.getElementById('wrapperTag')

		this.recipeData = []
		this.arrayFilterRecherche = []
		this.arrayFilterRechercheItems = []
		this.arrayFilterItemsIngredient = []
		this.arrayFilterItemsAppareils = []
		this.arrayFilterItemsUstensils = []
		this.objetTagRecherche = new Object()
	}
	// au lancement du script j''initialise les objet dont j'aurai besoin
	initObjectForResearch = () => {
		this.arrayFilterRecherche = this.recipeData
		// Je gere mon objet pour les Tags / La recherche dans la barre / les tags
		this.objetTagRecherche.bar = ''
		this.objetTagRecherche.tags = []
		// j'initialise mar barre de rcherche a zéro au rechargememtn de ma page
		this.eventResearchBar.value = ''
	}
	
	/**
	 * filtre les recettes selon le choix de l'utilisateur
	 */
	displayReceips() {
		// on initialise le html du container
		this.containerRecipeCards.innerHTML = ''
		// on creer un tableau vide
		var datasDisplay = researchBar(datasDisplay, this.arrayFilterRecherche, this.objetTagRecherche.bar)
		var datasDisplay = researchTag(datasDisplay, this.objetTagRecherche.tags)


		// j'hydrate le tableau pour les items  par rapport au filtre
		this.arrayFilterRechercheItems = datasDisplay


		// j'affiche le result de la recherche
		if (datasDisplay.leng === 0) {
			this.containerRecipeCards.innerHTML = 'Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.'

		} else if (datasDisplay.length > 0) {
			datasDisplay
				.map(recipe => new Recipe(recipe))
				.forEach(recipe => {
					const Factories = new Card(recipe)
					this.containerRecipeCards.appendChild(
						Factories.createRecipeCard()
					)
				})
		}
		openDropDown(this.arrayFilterRechercheItems, this.objetTagRecherche.tags)
	}


	async main() {
		// Je recuperer les datas provenant de la BDD
		this.recipeData = await this.receiptsProvider.getDataReceipts()
		this.initObjectForResearch()
		// on lance le premier affichage de toute les recettes
		this.displayReceips()

		this.eventResearchBar.addEventListener('input', e => {
			var valueInput = e.target.value
			if (valueInput.length > 2) {
				this.objetTagRecherche.bar = e.target.value
			}
			this.displayReceips()
		})
	}
}

const index = new Index()

index.main()