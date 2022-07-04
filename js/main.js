import { ReceiptsProvider } from './provider/provider.js'

import { Card } from './Factories/Card.js'
import { Recipe } from './models/Recipe.js'
import { researchBar, researchTagIngredient,researchTagAppareils, researchTagUstensils } from './utils/filterFunction.js'
import { createElementTag, createItemList, itemsBtnIngredient, itemsBtnAppareils, itemsBtnUstensils, openBtn, closeBtn} from './utils/itemsFunction.js'

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
		// On lance les Algo de recherche
		var datasDisplay = researchBar(this.arrayFilterRecherche, this.arrayBarRecherche)
		var datasDisplay = researchTagIngredient(datasDisplay, this.arrayTagRechercheIngredient)
		var datasDisplay = researchTagAppareils(datasDisplay, this.arrayTagRechercheAppareils)
		var datasDisplay = researchTagUstensils(datasDisplay, this.arrayTagRechercheUstensils)

		// j'affiche le resultat de la recherche
		if (datasDisplay.length === 0) {
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
	}

	async main() {
		// Je recuperer les datas provenant de la BDD
		this.arrayFilterRecherche = await this.receiptsProvider.getDataReceipts()
		
		this.eventResearchBar.value = ''
		// on lance le premier affichage de toute les recettes
		this.displayReceips()
		 // On creer tous les tags en display none
		createElementTag(itemsBtnIngredient(this.arrayFilterRecherche), 'ingredients')
		createElementTag(itemsBtnAppareils(this.arrayFilterRecherche), 'appareils')
		createElementTag(itemsBtnUstensils(this.arrayFilterRecherche), 'ustensils')

		
		createItemList(itemsBtnIngredient(this.arrayFilterRecherche), 'wrapperInputIngredients-ul', 'ingredients')
		createItemList(itemsBtnAppareils(this.arrayFilterRecherche), 'wrapperInputAppareils-ul', 'appareils')
		createItemList(itemsBtnUstensils(this.arrayFilterRecherche), 'wrapperInputUstensils-ul', 'ustensils')


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
		var arrowUp = document.querySelectorAll(".fa-angle-up")
		arrowUp.forEach(el => el.addEventListener('click', el => {
			var idTarget = el.target.id
			var replaceValueTarget = idTarget.replace('arrow', '')
			openBtn(replaceValueTarget)
		}))
		const inputEventIngredient = document.querySelectorAll('.dropdownInput')
		inputEventIngredient.forEach(element => element.addEventListener('click', element =>{
			this.closeAllBtn()
			var idTarget = element.target.id
			var replaceValueTarget = idTarget.replace('researchTag', '')
			openBtn(replaceValueTarget)
		}))
		
		// ecouteur d'evenement btn recherche
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
		// ecouteur evenement close btn
		const closeTagEvent = document.querySelectorAll('.fa-xmark')
		closeTagEvent.forEach(el => el.addEventListener('click', el => {
			var changeId = el.target.id.replace('close-', '')
			console.log(el.target.parentElement.classList[1])
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