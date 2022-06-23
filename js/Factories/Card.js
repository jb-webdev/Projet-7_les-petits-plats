export class Card {
	constructor (recipe) {
		this._recipe = recipe
	}

	createRecipeCard(){
		const divCard = document.createElement('div')
		divCard.setAttribute('class', "card")
        divCard.setAttribute('id', `${this._recipe._id}`)
        
		const templateCard = `
                <div class="card-header">
                    <p class="img">Image</p>
                </div>
                <div class="card-body">
                    <div class="card-body-title">
                        <h4>${this._recipe._name}</h4>
                        <p>${this._recipe._time} <span class="fa-regular fa-clock"></span></p>
                    </div>
                    <div class="recipe">
                        <div class="recipe-ingredients">
                            <h5>Ingredient</h5>
                            ${this._recipe._ingredients.map((ingredient) => 
                                `<p>
                                    ${ingredient.ingredient}: ${"quantity" in ingredient ? ingredient.quantity : ""}
                                    ${"unit" in ingredient ? ingredient.unit : ""}`)}
                                </p>
                        </div>
                        <div class="recipe-description">
                            <p>
                            ${this._recipe._description.substring(0,180)}${this._recipe._description.length > 180 ? "..." : ""}
                            </p>
                        </div>
                    </div>
                </div>   
        `

		divCard.innerHTML = templateCard

		return divCard
	}
    
}