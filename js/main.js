import { FilterTag } from './Factories/FilterTag.js'
import { ReceiptsProvider } from './provider/provider.js'

import { Card } from './Factories/Card.js'
import { Recipe } from './models/Recipe.js'

class Index {
	constructor() {
		this.receiptsProvider = new ReceiptsProvider('../data/recipes.json')
		this.containerRecipeCards = document.querySelector('.wrapperCards')
		this.recherche = ''
		this.eventResearchBar = document.getElementById('inputResearch')
	}
	/**
		 * Recherche via TITRE, INGREDIENTS, DESCRIPTION avec la searchBar
		 * @param {*String} term 
		 * @param {*Array} recipeData 
		 * @returns
		 */
	filterData(term, recipeData) {
		const filteredReceipes = recipeData.filter(recipe => recipe.name.toLowerCase().includes(term) ||
			recipe.description.toLowerCase().includes(term) ||
			recipe.ingredients.some(ingredient => ingredient.ingredient.includes(term)))
		return filteredReceipes
	}

	/**
	 * Affiche les cartes de recettes selon les data reçu
	 * @param {*Array} datasRecipe 
	 * @param {*String} recherche 
	 */
	displayReceips(datasRecipe, recherche) {
		this.containerRecipeCards.innerHTML = ''

		if (recherche === '') {
			datasRecipe
				.map(recipe => new Recipe(recipe))
				.forEach(recipe => {
					const Factories = new Card(recipe)
					this.containerRecipeCards.appendChild(
						Factories.createRecipeCard()
					)
				})
		} else {
			this.filterData(recherche, datasRecipe)
			var filtreArray = this.filterData(recherche, datasRecipe)
			filtreArray.map(recipe => new Recipe(recipe))
				.forEach(recipe => {
					const Factories = new Card(recipe)
					this.containerRecipeCards.appendChild(
						Factories.createRecipeCard()
					)
				})
		}
	}

	async main() {
		const recipeData = await this.receiptsProvider.getDataReceipts()
		
		/** on creer nos tags de recherche */
		const ClassTagFilter = new FilterTag(recipeData)
		ClassTagFilter.createIngredientsArray()
		ClassTagFilter.createApplianceArray()
		ClassTagFilter.createUstensilsArray()
		
        ClassTagFilter.createList('.dropdown-content-ingredient', ClassTagFilter.ingredientsArray, 'ingredients')
		ClassTagFilter.createList('.dropdown-content-appareils', ClassTagFilter.appliancesArray, 'appareils')
		ClassTagFilter.createList('.dropdown-content-ustensils', ClassTagFilter.ustensilsArray, 'ustensils')
		ClassTagFilter.createTag(ClassTagFilter.ingredientsArray, 'ingredients')
		ClassTagFilter.createTag(ClassTagFilter.appliancesArray, 'appareils')
		ClassTagFilter.createTag(ClassTagFilter.ustensilsArray, 'ustensils')
		
		ClassTagFilter.eventTag()
		this.displayReceips(recipeData, this.recherche)
		
		// j'ecoute l'evenement dans mon input pour la recherche de recette
		this.eventResearchBar.addEventListener('input', e => {
			var valueInput = e.target.value
			if (valueInput.length > 2) {
				this.displayReceips(recipeData, valueInput)
			}
		})

	}
}

const index = new Index()

index.main()