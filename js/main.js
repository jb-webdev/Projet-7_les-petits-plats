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
		this.essaiRecherche = new Object()
	}
	/**
		 * Recherche via TITRE, INGREDIENTS, DESCRIPTION avec la searchBar
		 
		 * @param {*Array} recipeData 
		 * @returns
		 */
	filterData(recipeData) {
		
		if (this.essaiRecherche.tags.length === 0){
			console.log('le tableau est vide !')
			const filteredReceipes = recipeData.filter(recipe => recipe.name.toLowerCase().includes(this.essaiRecherche.bar) ||
			recipe.description.toLowerCase().includes(this.essaiRecherche.bar) ||
			recipe.ingredients.some(ingredient => ingredient.ingredient.includes(this.essaiRecherche.bar)))
		return filteredReceipes
		} else if (this.essaiRecherche.tags.length){
			var termRecherche = []
			
			for (let i = 0; i < this.essaiRecherche.tags.length; i++){
				termRecherche.push(this.essaiRecherche.tags[i])
			}

			const filteredReceipes = recipeData.filter(recipe => recipe.name.toLowerCase().includes(this.essaiRecherche.bar) ||
			recipe.description.toLowerCase().includes(this.essaiRecherche.bar) ||
			recipe.ingredients.some(ingredient => ingredient.ingredient.includes(this.essaiRecherche.bar)))
		return filteredReceipes

		}
	}

	/**
	 * Affiche les cartes de recettes selon les data reçu
	 * @param {*Array} datasRecipe 
	 * @param {*String} recherche 
	 */
	displayReceips(datasRecipe) {
		this.containerRecipeCards.innerHTML = ''
		// quand la barre de recherche et que aucun tags n'est selectionner on affiche toutes les recettes
		if (this.essaiRecherche.bar === '' && this.essaiRecherche.tags.length === 0) {
			datasRecipe
				.map(recipe => new Recipe(recipe))
				.forEach(recipe => {
					const Factories = new Card(recipe)
					this.containerRecipeCards.appendChild(
						Factories.createRecipeCard()
					)
				})
		} else {
			var filtreArray = this.filterData(datasRecipe)
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
		// on creer nos item pour les liste
        ClassTagFilter.createList('.dropdown-content-ingredient', ClassTagFilter.ingredientsArray, 'ingredients')
		ClassTagFilter.createList('.dropdown-content-appareils', ClassTagFilter.appliancesArray, 'appareils')
		ClassTagFilter.createList('.dropdown-content-ustensils', ClassTagFilter.ustensilsArray, 'ustensils')
		// on creer nos tags
		ClassTagFilter.createTag(ClassTagFilter.ingredientsArray, 'ingredients')
		ClassTagFilter.createTag(ClassTagFilter.appliancesArray, 'appareils')
		ClassTagFilter.createTag(ClassTagFilter.ustensilsArray, 'ustensils')
		// on gere notre objet de recherche
		this.essaiRecherche.bar = ''
		this.essaiRecherche.tags = []
		/** on gerer le button de la barre de recherche pour lancer la fonction */
		const btnRecherche = document.querySelector('.btnFormResearch')
		btnRecherche.addEventListener('click', e => {
			e.preventDefault()
			this.displayReceips(recipeData)
		})
		// on lance le premier affichage des recettes
		this.displayReceips(recipeData)
		
		// on ecoute les evenements au niveau des tags
		ClassTagFilter.eventTag(this.essaiRecherche)
		
		
		
		// j'ecoute l'evenement dans mon input pour la recherche de recette
		this.eventResearchBar.addEventListener('input', e => {
			var valueInput = e.target.value
			if (valueInput.length > 2) {
				this.essaiRecherche.bar = e.target.value
				this.displayReceips(recipeData)
			}
		})

	}
}

const index = new Index()

index.main()