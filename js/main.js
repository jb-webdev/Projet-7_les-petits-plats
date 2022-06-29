import { ReceiptsProvider } from './provider/provider.js'

import { Card } from './Factories/Card.js'
import { Recipe } from './models/Recipe.js'
import { researchBar, researchTag } from './utils/filterFunction.js'
import { createElementTag, createItemList, itemsBtnIngredient, itemsBtnAppareils, itemsBtnUstensils, openDropDown, openBtn, closeBtn} from './utils/itemsFunction.js'

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
		if (this.arrayFilterRechercheItems.length === 0){
			this.containerRecipeCards.innerHTML = 'Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.'

		} else if (this.arrayFilterRechercheItems.length > 0){
			datasDisplay
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
		// Je recuperer les datas provenant de la BDD
		this.recipeData = await this.receiptsProvider.getDataReceipts()
		this.initObjectForResearch()
		// on lance le premier affichage de toute les recettes
		this.displayReceips()
		
		// On hydrate nos tableau de recherche ingredients / appareils / ustensils
		this.arrayFilterItemsIngredient = itemsBtnIngredient(this.arrayFilterRecherche)
		this.arrayFilterItemsAppareils = itemsBtnAppareils(this.arrayFilterRecherche)
		this.arrayFilterItemsUstensils = itemsBtnUstensils(this.arrayFilterRecherche)
		// on créer nos liste en display none
		createItemList(this.arrayFilterItemsIngredient, 'wrapperInputIngredient-ul', 'ingredient')
		createItemList(this.arrayFilterItemsAppareils, 'wrapperInputAppareil-ul', 'appareil')
		createItemList(this.arrayFilterItemsUstensils, 'wrapperInputUstensil-ul', 'ustensil')
		// on créer tous nos tags en display none
		createElementTag(this.arrayFilterItemsIngredient, 'ingredient')
		createElementTag(this.arrayFilterItemsAppareils, 'appareils')
		createElementTag(this.arrayFilterItemsUstensils, 'ustensils')

		// On ecoute l'evenement pour l'ouverture des inputs Tag
		openDropDown()

		const itemsEvent = document.querySelectorAll('.item')
		itemsEvent.forEach(el => el.addEventListener('click', el => {
			this.objetTagRecherche.tags.push(el.target.textContent)
			console.log(el.target)
			var targetIdClose = el.target.classList[1]
			var elements = document.querySelector(`div[data-value=${el.target.textContent}]`)
			elements.classList.toggle('activeTag')
			closeBtn(targetIdClose[0].toUpperCase() + targetIdClose.slice(1))
			this.displayReceips()
		}))
		
		const closeTagEvent = document.querySelectorAll('.fa-xmark')
		closeTagEvent.forEach(el => el.addEventListener('click', el => {
			var changeId = el.target.id.replace('close-', '')
			var elements = document.querySelector(`div[data-value=${changeId}]`)
			elements.classList.remove('activeTag')
			this.objetTagRecherche.tags.splice(this.objetTagRecherche.tags.indexOf(changeId), 1)
			console.log(this.objetTagRecherche.tags)
			this.displayReceips()
		}))

		// On écoute l'evenenment dans la barre de recherche
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