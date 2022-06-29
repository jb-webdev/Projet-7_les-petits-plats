/**
 * 
 * @param {*} dataDisplay = var dataDisplay = []
 * @param {*} arrayFilterRecherche = this.arrayFilterRecherche
 * @param {*} arrayRechercheBar = this.objetTagRecherche.bar
 */
const researchBar = (dataDisplay, arrayFilterRecherche, arrayRechercheBar) => {
    if (arrayRechercheBar === ''){
        return dataDisplay = arrayFilterRecherche
    } else if (arrayRechercheBar != ''){
        return dataDisplay = arrayFilterRecherche.filter(recipe => 
            recipe.name.toLowerCase().includes(arrayRechercheBar) ||
            recipe.description.toLowerCase().includes(arrayRechercheBar) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(arrayRechercheBar)))
    }
}

const researchTag = (dataDisplay, arrayRechercheTag) => {
    if (arrayRechercheTag.length === 0) {
        return dataDisplay
    } else if (arrayRechercheTag.length != 0) {
        for (let elementTag of arrayRechercheTag) {
            var filterTagElement = dataDisplay.filter(recipe => recipe.appliance.toLowerCase().includes(elementTag) ||
                recipe.ustensils.some(el => el.toLowerCase().includes(elementTag)) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(elementTag)))
                dataDisplay = filterTagElement
        }
        return dataDisplay
    }

}


export { researchBar, researchTag }