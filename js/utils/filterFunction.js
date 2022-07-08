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
        let dataFilter = []
        for (let i = 0; i < arrayFilterRecherche.length; i++){
            if(arrayFilterRecherche[i].name.toLowerCase().includes(arrayRechercheBar) || 
            arrayFilterRecherche[i].description.toLowerCase().includes(arrayRechercheBar) ||
            arrayFilterRecherche[i].ingredients.some( ingredient => ingredient.ingredient.includes(arrayRechercheBar))) {
                dataFilter.push(arrayFilterRecherche[i])
            }
        }
       return dataFilter
    }
}

const researchTagIngredient = (dataDisplay, arrayRechercheTag) => {
    if (arrayRechercheTag.length === 0) {
        return dataDisplay
    } else if (arrayRechercheTag.length != 0) {
        var dataFilter = []
        for (let elementTag of arrayRechercheTag) {
            for (let i = 0; i < dataDisplay.length; i++){
                if (dataDisplay[i].ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(elementTag))){
                    dataFilter.push(dataDisplay[i])
                }
            }
        }
        return dataFilter
    }
}
const researchTagAppareils = (dataDisplay, arrayRechercheTag) => {
    if (arrayRechercheTag.length === 0) {
        return dataDisplay
    } else if (arrayRechercheTag.length != 0) {
        let dataFilter = []
        for (let elementTag of arrayRechercheTag) {
            for (let i = 0; i < dataDisplay.length; i++){
                if (dataDisplay[i].appliance.toLowerCase().includes(elementTag)){
                    dataFilter.push(dataDisplay[i])
                }
            }
        }
        return dataFilter
    }
}
const researchTagUstensils = (dataDisplay, arrayRechercheTag) => {
    if (arrayRechercheTag.length === 0) {
        return dataDisplay
    } else if (arrayRechercheTag.length != 0) {
        var dataFilter = []
        for (let elementTag of arrayRechercheTag) {
            for (let i = 0; i < dataDisplay.length; i++){
                if (dataDisplay[i].ustensils.some(ustensil => ustensil.toLowerCase().includes(elementTag))){
                    dataFilter.push(dataDisplay[i])
                }
            }
        }
        return dataFilter
    }      
}


export { researchBar, researchTagUstensils, researchTagAppareils, researchTagIngredient }