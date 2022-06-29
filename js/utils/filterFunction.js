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
        return console.log('le tableau est vide')
    } else if (arrayRechercheTag.length != 0) {
/*
        for (let elementTag of this.objetTagRecherche.tags) {
            var filterTagElement = datasDisplay.filter(recipe => recipe.appliance.toLowerCase().includes(elementTag) ||
                recipe.ustensils.some(el => el.toLowerCase().includes(elementTag)) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(elementTag)))
            datasDisplay = filterTagElement
            this.arrayFilterRechercheItems = datasDisplay
        }
*/
        return console.log('On doit faire la recherche par Tag')
    }

}


export { researchBar, researchTag }