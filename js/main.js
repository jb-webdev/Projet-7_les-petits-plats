import { FilterTag } from './Factories/FilterTag.js'
import { ReceiptsProvider } from './provider/provider.js'

import { Card } from './Factories/Card.js'
import { Recipe } from './models/Recipe.js'

class Index {
	constructor() {
		this.receiptsProvider = new ReceiptsProvider('../data/recipes.json')
		this.containerRecipeCards = document.querySelector('.wrapperCards')
		this.recipeData = []
		this.arrayFilterRecherche = []
		this.eventResearchBar = document.getElementById('inputResearch')
		this.objetTagRecherche = new Object()
	}

	/** Fonction pour l'affichage de la carte Error avec redirection */
	
	/**
	 * filtre les recettes selon le choix de l'utilisateur
	 * @param {*Array} datasRecipe
	 */
	displayReceips() {
		this.containerRecipeCards.innerHTML = ''
		this.arrayFilterRecherche
			.map(recipe => new Recipe(recipe))
			.forEach(recipe => {
				const Factories = new Card(recipe)
				this.containerRecipeCards.appendChild(
					Factories.createRecipeCard()
				)
			})
	}

	algoFilter() {
		if (this.objetTagRecherche.bar != '') {
			this.arrayFilterRecherche = this.arrayFilterRecherche.filter(recipe => recipe.name.toLowerCase().includes(this.objetTagRecherche.bar) ||
				recipe.description.toLowerCase().includes(this.objetTagRecherche.bar) ||
				recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(this.objetTagRecherche.bar)))
		}

		this.displayReceips()
	}


	async main() {
		this.recipeData = await this.receiptsProvider.getDataReceipts()
		this.arrayFilterRecherche = this.recipeData

		this.objetTagRecherche.bar = ''
		this.objetTagRecherche.tags = []

		const ClassTagFilter = new FilterTag(this.arrayFilterRecherche)
		// on initialise nos tags et nos item selon notre base de données fourni
		ClassTagFilter.initTagAndItem()

		// on lance le premier affichage de toute les recettes
		this.displayReceips()
		// j'ecoute l'evenement dans mon input pour la recherche de recette
		this.eventResearchBar.addEventListener('input', e => {
			var valueInput = e.target.value
			if (valueInput.length > 2) {
				this.objetTagRecherche.bar = e.target.value
				this.algoFilter()
			}
		})

		/** TODO List
		 * 	BUG sur le resultat de recherche à gerer en priorité
		 * 
		 * 		stocker le resultat dans this.arrayFilterRecherche
		 * 		voir comment gerer la recherche par tag
		 * 
		 * 		verifier les items si les liste ul mise en place fonctionne bien
		 * 		ecouter l'evenement pour l'ouverture des bouttons filtre tag
		 */


	}
}

const index = new Index()

index.main()