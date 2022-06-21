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
		 * Recherche via TITRE, INGREDIENTS, DESCRIPTION avec la searchBar
		 
		 * @param {*Array} recipeData 
		 * @returns
		 */
	filterAlgo2(recipeData) {
		var filteredReceipes = []
		for (let i = 0; i < recipeData.length; i++) {
			if (recipeData[i].name.toLowerCase().includes(this.objetTagRecherche.bar) ||
			recipeData[i].description.toLowerCase().includes(this.objetTagRecherche.bar) ||
			recipeData[i].ingredients.some(ingredient => ingredient.ingredient.includes(this.objetTagRecherche.bar))) {
				filteredReceipes.push(recipeData[i])
			}
		}

		return filteredReceipes
	}

	/**
	 * Affiche les cartes de recettes selon les data reçu
	 * @param {*Array} datasRecipe 
	 * @param {*String} recherche 
	 */
	displayReceips(datasRecipe) {
		this.containerRecipeCards.innerHTML = ''

		// quand la barre de recherche et que aucun tags n'est selectionner on affiche toutes les recettes
		if (this.objetTagRecherche.bar === '' && this.objetTagRecherche.tags.length === 0) {
			console.log('======première condition =========')
			console.log(this.objetTagRecherche.bar)
			console.log(this.objetTagRecherche.tags.length)
			console.log('on affiche toutes les recettes')
			console.log('==================================')
			datasRecipe
				.map(recipe => new Recipe(recipe))
				.forEach(recipe => {
					const Factories = new Card(recipe)
					this.containerRecipeCards.appendChild(
						Factories.createRecipeCard()
					)
				})
		} else if (this.objetTagRecherche.bar != '' && this.objetTagRecherche.tags.length === 0){
			console.log('====== deuxième condition =========')
			console.log(this.objetTagRecherche.bar)
			console.log(this.objetTagRecherche.tags.length)
			console.log('on fait un tri que par la bar de recherche')
			console.log('==================================')
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
			console.log('====== troisième condition =========')
			console.log('=> ' + this.objetTagRecherche.bar)
			console.log(this.objetTagRecherche.tags.length)
			console.log('on fait un tri que par tags')
			console.log('==================================')
			
			var firstFilter = datasRecipe.filter(recipe => recipe.name.toLowerCase().includes(this.objetTagRecherche.bar ) ||
			recipe.description.toLowerCase().includes(this.objetTagRecherche.bar) ||
			recipe.ingredients.some(ingredient => ingredient.ingredient.includes(this.objetTagRecherche.bar)))
			console.log(firstFilter)

			console.log(this.objetTagRecherche.tags.forEach(el => console.log(el)))
			

			/**modifier le tableau dataRecipe par le nouveau tableau */
			var filtreArray = datasRecipe
			filtreArray
				.map(recipe => new Recipe(recipe))
				.forEach(recipe => {
					const Factories = new Card(recipe)
					this.containerRecipeCards.appendChild(
						Factories.createRecipeCard()
					)
				})
		} else if (this.objetTagRecherche.bar != '' && this.objetTagRecherche.tags.length > 0){
			console.log('====== quatrième condition =========')
			console.log(this.objetTagRecherche.bar)
			console.log(this.objetTagRecherche.tags.length)
			console.log('on fait un tri complet')
			console.log('==================================')

			datasRecipe
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
		/** on creer nos tags de recherche */
		const ClassTagFilter = new FilterTag(recipeData)
		ClassTagFilter.initTagAndItem()
		ClassTagFilter.eventInputItem()
		ClassTagFilter.eventTag(this.objetTagRecherche)
		
		// on lance le premier affichage des recettes
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