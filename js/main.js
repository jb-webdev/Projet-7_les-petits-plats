import { ReceiptsProvider } from './provider/provider.js'



class Index {
	constructor() {
		this.receiptsProvider = new ReceiptsProvider('../data/recipes.json')
		
	}
	
	
	async main() {
		const recipeData = await this.receiptsProvider.getDataReceipts()
		
		
	}
}

const index = new Index()

index.main()