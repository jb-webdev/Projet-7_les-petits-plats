import { ReceiptsProvider } from './provider/provider.js'

import { Card } from './Factories/Card.js'
import { Recipe } from './models/Recipe.js'


class Index {
	constructor() {
		this.receiptsProvider = new ReceiptsProvider('../data/recipes.json')
		this.containerRecipeCards = document.querySelector('.wrapperCards')
		this.recherche = new Object
		
	}
	/**Methode pour l'affichage des recettes */
	displayReceips(arrayRecherche) {
		arrayRecherche
			.map(recipe => new Recipe(recipe))
			.forEach(recipe => {
				const Factories = new Card(recipe)
				this.containerRecipeCards.appendChild(
					Factories.createRecipeCard()
				)
			})
	}
	
	async main() {
		const recipeData = await this.receiptsProvider.getDataReceipts()
		this.displayReceips(recipeData)
		
	}
}

const index = new Index()

index.main()