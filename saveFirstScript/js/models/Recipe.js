export class Recipe {
    constructor(recipe){
        this._id = recipe.id
        this._name = recipe.name
        this._servings = recipe.servings
        this._ingredients = recipe.ingredients
        this._time = recipe.time
        this._description = recipe.description
        this._appliance = recipe.appliance
        this._ustensils = recipe.ustensils
        this._state = false
    }

    getId() {
        return this._id
    }

    getName() {
        return this._name
    }

    getServings(){
        return this._servings
    }

    getIngredients(){
        return this._ingredients
    }
    
    getTime() {
        return this._time
    }

    getDescription() {
        return this._description
    }

    getAppliance() {
        return this._appliance
    }
    
    getUstensils() {
        return this._ustensils
    }
    getSate(){
        return this._state
    }
    setState(state){
        this._state = state
        return this._state
    }

}