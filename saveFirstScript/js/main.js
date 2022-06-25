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
		this.cardError = document.querySelector('.cardError')
	}
	/**
	 * filtre les recettes selon le choix de l'utilisateur
	 * @param {*Array} datasRecipe
	 */
	displayReceips(datasRecipe) {
		this.containerRecipeCards.innerHTML = ''
		/** Fonction pour l'affichage de la carte Error avec redirection */
		const displayCardError = () => {
			const cardsError = `
			<div class="cardError">
				<p><strong>Error</strong></p>
				<p>Aucune recette ne correspond à votre critère…</p>
				<p>vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>
			</div>
			`
			this.containerRecipeCards.innerHTML = cardsError
			setTimeout(() => {
				this.containerRecipeCards.innerHTML = ''
				this.eventResearchBar.value = ''
				datasRecipe
				.map(recipe => new Recipe(recipe))
				.forEach(recipe => {
					const Factories = new Card(recipe)
					this.containerRecipeCards.appendChild(
						Factories.createRecipeCard()
					)
				})
			}, 3000)
		}
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
			// quand la barre de recherche a un therm et que aucun tags n'est selectionner on filtre le recettes par rapport a la barre de recherche seulement
			var filtreArray = datasRecipe.filter(recipe => recipe.name.toLowerCase().includes(this.objetTagRecherche.bar ) ||
			recipe.description.toLowerCase().includes(this.objetTagRecherche.bar) ||
			recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(this.objetTagRecherche.bar)))
			if (filtreArray.length === 0) {
				displayCardError()
			} else {
				filtreArray.map(recipe => new Recipe(recipe))
				.forEach(recipe => {
					const Factories = new Card(recipe)
					this.containerRecipeCards.appendChild(
						Factories.createRecipeCard()
					)
				})
			}
		} else if (this.objetTagRecherche.bar === '' && this.objetTagRecherche.tags.length > 0){
			// quand la barre de recherche et vide et qu'au moins un tag est selectionné on filtre les recettes que par tags
			var filtreArray = datasRecipe
			for ( let elementArray of this.objetTagRecherche.tags){
				filtreArray = filtreArray.filter(recipe => recipe.name.toLowerCase().includes(elementArray) ||
				recipe.description.toLowerCase().includes(elementArray) ||
				recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(elementArray)))
			}
			if (filtreArray.length === 0) {
				displayCardError()
			} else{
				filtreArray
					.map(recipe => new Recipe(recipe))
					.forEach(recipe => {
						const Factories = new Card(recipe)
						this.containerRecipeCards.appendChild(
							Factories.createRecipeCard()
						)
					})
			}
		} else if (this.objetTagRecherche.bar != '' && this.objetTagRecherche.tags.length > 0){
			// quand un therm dans la barre de recherche et au moins un tags et selectionné en filtre avec tous les critères
			var firstResearch = datasRecipe.filter(
				recipe => recipe.name.toLowerCase().includes(this.objetTagRecherche.bar ) ||
				recipe.description.toLowerCase().includes(this.objetTagRecherche.bar) ||
				recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(this.objetTagRecherche.bar))
				)

			var filtreArray = firstResearch
			for ( let elementArray of this.objetTagRecherche.tags){
				filtreArray = filtreArray.filter(recipe => recipe.name.toLowerCase().includes(elementArray) ||
				recipe.description.toLowerCase().includes(elementArray) ||
				recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(elementArray)))
			}
			
			if (filtreArray.length === 0) {
				displayCardError()
			} else{
				filtreArray
				.map(recipe => new Recipe(recipe))
				.forEach(recipe => {
					const Factories = new Card(recipe)
					this.containerRecipeCards.appendChild(
						Factories.createRecipeCard()
					)
				})
			}
		}
	}
	async main() {
		const recipeData = await this.receiptsProvider.getDataReceipts()
		// on réinitialise s'aasure que notre barre de recherhce est vide
		this.eventResearchBar.value = ''
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
		// on ecoute l'evenement sur le close du tag pour renvoyé un affichage a l'utilisateur selon ca recherche initiale
		document.querySelectorAll('.fa-xmark').forEach(el => el.addEventListener('click', el => {
            this.displayReceips(recipeData)
        }))
		document.querySelectorAll('.item').forEach(el => el.addEventListener('click', el => {
            this.displayReceips(recipeData)
        }))
		document.querySelectorAll('.item').forEach(el => el.addEventListener('click', el => {
            this.displayReceips(recipeData)
        }))
		// on ecoute l'évenenment keypress pour lancer le filtre de recherche
		document.querySelectorAll('.item').forEach(el => el.addEventListener('keypress', event => {
			if (event.key === 'Enter'){
				this.displayReceips(recipeData)
			}
        }))
		
	}
}

const index = new Index()

index.main()