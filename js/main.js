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
		this.objetTagRecherche = new Object()
	}
	/**
	 * filtre les recettes selon le choix de l'utilisateur
	 * @param {*Array} datasRecipe
	 */
	displayReceips(datasRecipe) {
		this.containerRecipeCards.innerHTML = ''
		// quand la barre de recherche et que aucun tags n'est selectionner on affiche toutes les recettes
		if (this.objetTagRecherche.bar === '' && this.objetTagRecherche.tags.length === 0) {
			datasRecipe
				.map(recipe => new Recipe(recipe))
				.forEach(recipe => {
					const Factories = new Card(recipe)
					this.containerRecipeCards.appendChild(
						Factories.createRecipeCard()
					)
				})
		} else if (this.objetTagRecherche.bar != '' && this.objetTagRecherche.tags.length === 0){
		
			var filtreArray = datasRecipe.filter(recipe => recipe.name.toLowerCase().includes(this.objetTagRecherche.bar ) ||
			recipe.description.toLowerCase().includes(this.objetTagRecherche.bar) ||
			recipe.ingredients.some(ingredient => ingredient.ingredient.includes(this.objetTagRecherche.bar)))
			
			filtreArray.map(recipe => new Recipe(recipe))
				.forEach(recipe => {
					const Factories = new Card(recipe)
					this.containerRecipeCards.appendChild(
						Factories.createRecipeCard()
					)
				})
		} else if (this.objetTagRecherche.bar === '' && this.objetTagRecherche.tags.length > 0){
			var filterAllTags = datasRecipe
			for ( let elementArray of this.objetTagRecherche.tags){
				filterAllTags = filterAllTags.filter(recipe => recipe.name.toLowerCase().includes(elementArray) ||
				recipe.description.toLowerCase().includes(elementArray) ||
				recipe.ingredients.some(ingredient => ingredient.ingredient.includes(elementArray)))
			}
			filterAllTags
				.map(recipe => new Recipe(recipe))
				.forEach(recipe => {
					const Factories = new Card(recipe)
					this.containerRecipeCards.appendChild(
						Factories.createRecipeCard()
					)
				})
		} else if (this.objetTagRecherche.bar != '' && this.objetTagRecherche.tags.length > 0){

			var firstResearch = datasRecipe.filter(
				recipe => recipe.name.toLowerCase().includes(this.objetTagRecherche.bar ) ||
				recipe.description.toLowerCase().includes(this.objetTagRecherche.bar) ||
				recipe.ingredients.some(ingredient => ingredient.ingredient.includes(this.objetTagRecherche.bar))
				)

			var AllFilterResearch = firstResearch
			for ( let elementArray of this.objetTagRecherche.tags){
				AllFilterResearch = AllFilterResearch.filter(recipe => recipe.name.toLowerCase().includes(elementArray) ||
				recipe.description.toLowerCase().includes(elementArray) ||
				recipe.ingredients.some(ingredient => ingredient.ingredient.includes(elementArray)))
			}
			
			AllFilterResearch
				.map(recipe => new Recipe(recipe))
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
		// on gere notre objet de recherche
		this.objetTagRecherche.bar = ''
		this.objetTagRecherche.tags = []
		
		const ClassTagFilter = new FilterTag(recipeData)
		// on initialise nos tags et nos item selon notre base de données fourni
		ClassTagFilter.initTagAndItem()
		ClassTagFilter.eventInputItem()
		// on mets en place notre écouteur d'évenement
		ClassTagFilter.eventTag(this.objetTagRecherche)
		// on lance le premier affichage de toute les recettes
		this.displayReceips(recipeData)
		// j'ecoute l'evenement dans mon input pour la recherche de recette
		this.eventResearchBar.addEventListener('input', e => {
			var valueInput = e.target.value
			if (valueInput.length > 2) {
				this.objetTagRecherche.bar = e.target.value
				this.displayReceips(recipeData)
			}
		})
		/** on gerer le button de la barre de recherche pour lancer la fonction */
		const btnRecherche = document.querySelector('.btnFormResearch')
		btnRecherche.addEventListener('click', e => {
			e.preventDefault()
			this.objetTagRecherche.bar = this.eventResearchBar.value
			this.displayReceips(recipeData)
		})
		
	}
}

const index = new Index()

index.main()