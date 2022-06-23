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
		/** Function Algo 2 */
		function filterData(term, arrayToLoop) {
			var filteredReceipes = []
			for (let i = 0; i < arrayToLoop.length; i++){
				if(arrayToLoop[i].name.toLowerCase().includes(term) || 
				arrayToLoop[i].description.toLowerCase().includes(term) ||
				arrayToLoop[i].ingredients.some( ingredient => ingredient.ingredient.toLowerCase().includes(term))) {
					filteredReceipes.push(arrayToLoop[i])
				}
			}
		   return filteredReceipes
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
			// quand la barre de recherche et rempli et que aucun tags n'est selectionner on filtre qu'avec le term de la barre de recherche
			let resultatRecherche = this.objetTagRecherche.bar
			var filtreArray  = filterData(resultatRecherche, datasRecipe)
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
			// quand la barre de recherche et vide et au moins un tags est selectionné on filtre qu'avec les terms des tags
			var filtreArray = datasRecipe
			for (let i = 0; i < this.objetTagRecherche.tags.length; i++){
				filtreArray = filterData(this.objetTagRecherche.tags[i], filtreArray)
			}
			if (filtreArray.length === 0) {
				displayCardError()
			} else {
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
			// quand la barre de recherche et au moins un tags est selectionné on filtre l'ensemble de la recherche
			let resultatRecherche = this.objetTagRecherche.bar
			var filtreArray = filterData(resultatRecherche, datasRecipe)
			
			for (let i = 0; i < this.objetTagRecherche.tags.length; i++){
				filtreArray = filterData(this.objetTagRecherche.tags[i], filtreArray)
			}
			if (filtreArray.length === 0) {
				displayCardError()
			} else {
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