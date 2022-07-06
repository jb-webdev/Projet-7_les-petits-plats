import { ReceiptsProvider } from './provider/provider.js'

import { Card } from './Factories/Card.js'
import { Recipe } from './models/Recipe.js'
import { researchBar, researchTagIngredient,researchTagAppareils, researchTagUstensils } from './utils/filterFunction.js'
import {
	accentsModifyDeleteSpace,
	itemsBtnIngredient, 
	itemsBtnAppareils, 
	itemsBtnUstensils, 
	openBtn, 
	closeBtn,
	displayItemList,
	initTagsAndItems} from './utils/itemsFunction.js'

class Index {
	constructor() {
		this.receiptsProvider = new ReceiptsProvider('../data/recipes.json')
		this.containerRecipeCards = document.querySelector('.wrapperCards')
		this.eventResearchBar = document.getElementById('inputResearch')
		this.wrapperTag = document.getElementById('wrapperTag')

		this.arrayFilterRecherche = []
		
		this.arrayBarRecherche = ''
		this.arrayTagRechercheIngredient = []
		this.arrayTagRechercheAppareils = []
		this.arrayTagRechercheUstensils = []

		this.arrayItemRechercheIngredients = []
		this.arrayItemRechercheAppareils = []
		this.arrayItemRechercheUstensils = []

	}
	closeAllBtn() {
		var arrayBtn = ['Ingredients', 'Appareils', 'Ustensils']
		
		for (let i = 0; i < arrayBtn.length; i++){
			closeBtn(arrayBtn[i])
		}
	}
	/**
	 * filtre les recettes selon le choix de l'utilisateur
	 */
	displayReceips() {
		// on initialise le html du container
		this.containerRecipeCards.innerHTML = ''
		// on désactive l'affichage tous les items 
		displayItemList(this.arrayItemRechercheIngredients, this.arrayItemRechercheAppareils, this.arrayItemRechercheUstensils, 'off')
		// On lance les Algo de recherche
		var datasDisplay = researchBar(this.arrayFilterRecherche, this.arrayBarRecherche)
		var datasDisplay = researchTagIngredient(datasDisplay, this.arrayTagRechercheIngredient)
		var datasDisplay = researchTagAppareils(datasDisplay, this.arrayTagRechercheAppareils)
		var datasDisplay = researchTagUstensils(datasDisplay, this.arrayTagRechercheUstensils)
		
		// j'affiche le resultat de la recherche
		if (datasDisplay.length === 0) {
			this.containerRecipeCards.innerHTML = 'Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.'

		} else if (datasDisplay.length > 0) {
			// on active les items à afficher
			this.arrayItemRechercheIngredients = itemsBtnIngredient(datasDisplay)
			this.arrayItemRechercheAppareils = itemsBtnAppareils(datasDisplay)
			this.arrayItemRechercheUstensils = itemsBtnUstensils(datasDisplay)
			displayItemList(this.arrayItemRechercheIngredients, this.arrayItemRechercheAppareils, this.arrayItemRechercheUstensils, 'on')
			
			// on affiche le resultat de la recherche
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
		this.arrayFilterRecherche = await this.receiptsProvider.getDataReceipts()
		this.eventResearchBar.value = ''
		// On initialise tous les tags et les items
		initTagsAndItems(this.arrayFilterRecherche)
		 
		this.arrayItemRechercheIngredients = itemsBtnIngredient(this.arrayFilterRecherche)
		this.arrayItemRechercheAppareils = itemsBtnAppareils(this.arrayFilterRecherche)
		this.arrayItemRechercheUstensils = itemsBtnUstensils(this.arrayFilterRecherche)
		// on lance le premier affichage de toute les recettes
		this.displayReceips()

		// On ecoute l'evenement dans la barre de recherche
		this.eventResearchBar.addEventListener('input', e => {
			var valueInput = e.target.value
			if (valueInput.length > 2) {
				this.arrayBarRecherche = e.target.value
			} else if (valueInput.length < 3){
				this.arrayBarRecherche = ''
			}
			this.displayReceips()
		})
		// Open btn Filter
		
		const inputEventIngredient = document.querySelectorAll('.dropdownInput')
		inputEventIngredient.forEach(element => element.addEventListener('click', element =>{
			this.closeAllBtn()
			var idTarget = element.target.id
			var replaceValueTarget = idTarget.replace('researchTag', '')
			openBtn(replaceValueTarget)
			document.getElementById(`${idTarget}`).addEventListener('input', e => {
				var recupIdInput = e.target.id
				var transformRecupIdInput = recupIdInput.replace('researchTag', '')

				var datasToFilter = []
				var itemClass = ''
				switch (transformRecupIdInput.toLowerCase()) {
					case 'ingredients' :
						datasToFilter = this.arrayItemRechercheIngredients
						itemClass = 'itemlistIngredients-'
						break
					case 'appareils' :
						datasToFilter = this.arrayItemRechercheAppareils
						itemClass = 'itemlistAppareils-'
					break
					case 'ustensils' :
						datasToFilter = this.arrayItemRechercheUstensils
						itemClass = 'itemlistUstensils-'
						break
				}
				var itemToDisplayOn = []

				if (e.target.value.length > 2) {
					itemToDisplayOn = datasToFilter.filter(element => element.includes(e.target.value))
					// On passe tous les items en display none
					for (let i = 0; i < datasToFilter.length; i++){
						let elementsDisplayNone = document.getElementById(`${itemClass}${accentsModifyDeleteSpace(datasToFilter[i])}`)
						elementsDisplayNone.classList.remove('activeItem')	
					}
					// On affiche le resultat de notre recherche
					for (let i = 0; i < itemToDisplayOn.length; i++){
						var elementsToDisplayOn = document.getElementById(`${itemClass}${accentsModifyDeleteSpace(itemToDisplayOn[i])}`)
						elementsToDisplayOn.classList.toggle('activeItem')
					}
				} else if (e.target.value.length < 3){
					// On passe tous les items en display none
					for (let i = 0; i < datasToFilter.length; i++){
						let elementsDisplayNone = document.getElementById(`${itemClass}${accentsModifyDeleteSpace(datasToFilter[i])}`)
						elementsDisplayNone.classList.remove('activeItem')	
					}
					for (let i = 0; i < datasToFilter.length; i++){
						var elementsIngredients = document.getElementById(`${itemClass}${accentsModifyDeleteSpace(datasToFilter[i])}`)
						elementsIngredients.classList.toggle('activeItem')	
					}
				}
			})
		}))
		// ecouteur d'evenement btn recherche

		document.addEventListener('keydown', (event) => {
			const nomTouche = event.key;
			switch (nomTouche){
				case 'Escape' :
					this.closeAllBtn()
				break
			}
		  }, false);

		const itemsEvent = document.querySelectorAll('.item')
		itemsEvent.forEach(el => el.addEventListener('click', el => {
			var targetIdClose = el.target.classList[1]
			switch (targetIdClose) {
				case 'ingredients':
					this.arrayTagRechercheIngredient.push(el.target.textContent)
					break
				case 'appareils':
					this.arrayTagRechercheAppareils.push(el.target.textContent)
					break
				case 'ustensils':
					this.arrayTagRechercheUstensils.push(el.target.textContent)
					break
			}
			var elements = document.querySelector(`div[data-value=${el.target.dataset.list}]`)
			elements.classList.toggle('activeTag')
			closeBtn(targetIdClose[0].toUpperCase() + targetIdClose.slice(1))
			this.displayReceips()
		}))
		// Event close tag
		const closeTagEvent = document.querySelectorAll('.fa-xmark')
		closeTagEvent.forEach(el => el.addEventListener('click', el => {
			var changeId = el.target.id.replace('close-', '')
			var elements = document.querySelector(`div[data-value=${changeId}]`)
			elements.classList.remove('activeTag')
			switch (el.target.parentElement.classList[1]) {
				case 'closetagIngredients':
					this.arrayTagRechercheIngredient.splice(this.arrayTagRechercheIngredient.indexOf(changeId), 1)
					break
				case 'closetagAppareils':
					this.arrayTagRechercheAppareils.splice(this.arrayTagRechercheAppareils.indexOf(changeId), 1)
					break
				case 'closetagUstensils':
					this.arrayTagRechercheUstensils.splice(this.arrayTagRechercheUstensils.indexOf(changeId), 1)
					break
			}
            this.displayReceips()
		})) 
	}
}

const index = new Index()

index.main()