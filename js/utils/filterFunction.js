/**
 * 
 * @param {*} dataDisplay = var dataDisplay = []
 * @param {*} arrayFilterRecherche = this.arrayFilterRecherche
 * @param {*} arrayRechercheBar = this.objetTagRecherche.bar
 */
const researchBar = (arrayFilterRecherche, arrayRechercheBar) => {
    if (arrayRechercheBar === ''){
        return arrayFilterRecherche
    } else if (arrayRechercheBar != ''){
        var dataFilter = arrayFilterRecherche.filter(recipe => 
            recipe.name.toLowerCase().includes(arrayRechercheBar) ||
            recipe.description.toLowerCase().includes(arrayRechercheBar) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(arrayRechercheBar)))
        return dataFilter
    }
}

const researchTagIngredient = (dataDisplay, arrayRechercheTag) => {
    if (arrayRechercheTag.length === 0) {
        return dataDisplay
    } else if (arrayRechercheTag.length != 0) {
        let filterTagElement = dataDisplay
        for (let elementTag of arrayRechercheTag) {
            filterTagElement = filterTagElement.filter(recipe => recipe.ingredients.some(
                ingredient => ingredient.ingredient.toLowerCase().includes(elementTag)))
        }
        // faire trois filtre un pour chaque bouttons
        return filterTagElement
    }
}
const researchTagAppareils = (dataDisplay, arrayRechercheTag) => {
    if (arrayRechercheTag.length === 0) {
        return dataDisplay
    } else if (arrayRechercheTag.length != 0) {
        let filterTagElement = dataDisplay
        for (let elementTag of arrayRechercheTag) {
            filterTagElement = filterTagElement.filter(recipe => recipe.appliance.toLowerCase().includes(elementTag))
        }
        // faire trois filtre un pour chaque bouttons
        return filterTagElement
    }
}
const researchTagUstensils = (dataDisplay, arrayRechercheTag) => {
    if (arrayRechercheTag.length === 0) {
        return dataDisplay
    } else if (arrayRechercheTag.length != 0) {
        let filterTagElement = dataDisplay
        for (let elementTag of arrayRechercheTag) {
            filterTagElement = filterTagElement.filter(recipe => recipe.ustensils.some(
                ustensil => ustensil.toLowerCase().includes(elementTag)))
        }
        // faire trois filtre un pour chaque bouttons
        return filterTagElement
    }
      
}


export { researchBar, researchTagUstensils, researchTagAppareils, researchTagIngredient }