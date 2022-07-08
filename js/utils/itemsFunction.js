// Fonction pour suprimer les accents et les espaces de nos chaînes de caractères
const accentsModifyDeleteSpace = (paraph) => {
    var r = paraph
    var caractereAModifier = { 
        'a': '[àáâãäå]', 
        'ae': 'æ', 
        'c': 'ç', 
        'e': '[èéêë]', 
        'i': '[ìíîï]', 
        'n': 'ñ', 
        'o': '[òóôõö]', 
        'oe': 'œ'
     }
     
     for (let i in caractereAModifier) { 
         r = r.replace(new RegExp(caractereAModifier[i], 'g'), i) 
         // on mets le mots en minuscule
         r = r.toLowerCase()
         // on suprime tout caractère qui n'est pas un mot ou un espace
         //r = r.replace(/(?!\w|\s)./g, '')
         r = r.replace('(', '')
         r = r.replace(')', '')
         r = r.replace('.', '')
         // on remplace tous les espaces
         r = r.replaceAll(' ', '-')
         
     }
     return r
}
// ===== INGREDIENTS =====
// je creer mon tableau ingredient pour les items
const itemsBtnIngredient = (arrayItems,) => {
    // this.arrayFilterRechercheItems
    // tri des items ingredients
    var arrayStockIngredient = []
    var itemsIngredients = []
    for (let i = 0; i < arrayItems.length; i++) {
        arrayStockIngredient.push(arrayItems[i].ingredients)

    }
    for (let el in arrayStockIngredient) {
        for (let a = 0; a < arrayStockIngredient[el].length; a++) {
            let items = arrayStockIngredient[el][a].ingredient
            itemsIngredients.push(items.toLowerCase())
        }
    }
    // je traite les duplicatas dans le tableau et je range par ordre alphabetique
    return itemsIngredients = itemsIngredients.filter((item, index) => itemsIngredients.indexOf(item) === index).sort()
}
// ===== APPAREILS ===== 
// je creer mon tableau APPAREILS pour les items
const itemsBtnAppareils = (arrayItems) => {
    // this.arrayFilterRechercheItems
    var itemsApareils = []
    for (let i = 0; i < arrayItems.length; i++) {
        let items = arrayItems[i].appliance
        itemsApareils.push(items.toLowerCase())
    }
    // je traite les duplicatas dans le tableau et je range par ordre alphabetique
    return itemsApareils = itemsApareils.filter((item, index) => itemsApareils.indexOf(item) === index).sort()
}
// ===== USTENSILS =====
// Je creer mon tableau USTENSILS pour les items
const itemsBtnUstensils = (arrayItems) => {
    //this.arrayFilterRechercheItems
    var arrayStockUstensils = []
    var itemsUstensils = []
    for (let i = 0; i < arrayItems.length; i++) {
        arrayStockUstensils.push(arrayItems[i].ustensils)
    }
    for (let el in arrayStockUstensils) {
        for (let i = 0; i < arrayStockUstensils[el].length; i++) {
            let items = arrayStockUstensils[el][i]
            //var modifyItems = accentsModifyDeleteSpace(items)
            //itemsUstensils.push(modifyItems)
            itemsUstensils.push(items.toLowerCase())
        }
    }
    // je traite les duplicatas dans le tableau et je range par ordre alphabetique
    return itemsUstensils = itemsUstensils.filter((item, index) => itemsUstensils.indexOf(item) === index).sort()

}
// ===== BTN INPUT TAGS RECHERCHE pour INGREDIENT / APPAREILS / USTENSILS =====
// creation des items dans les inputs de recherche par tags
const createItemList = (arrayElement, WrapperInput, ClassItem) => {
    //createItemList(this.arrayFilterItemsIngredient, 'wrapperInputIngredient-ul', 'ingredient')
    const wrapperInput = document.getElementById(WrapperInput)
    wrapperInput.innerHTML =''
    for (let i = 0; i < arrayElement.length; i++) {
        var ModifyStringForDataValueElement = accentsModifyDeleteSpace(arrayElement[i])
        var itemCreate = document.createElement('li')
        switch (ClassItem) {
            case 'ingredients':
                itemCreate.setAttribute('id', `itemlistIngredients-${ModifyStringForDataValueElement}`)
                break
            case 'appareils':
                itemCreate.setAttribute('id', `itemlistAppareils-${ModifyStringForDataValueElement}`)
                break
            case 'ustensils':
                itemCreate.setAttribute('id', `itemlistUstensils-${ModifyStringForDataValueElement}`)
                break
        }itemCreate.setAttribute('class', `item ${ClassItem} activeItem`)
        itemCreate.setAttribute('data-List', `${ModifyStringForDataValueElement}`)
        itemCreate.innerHTML = `${arrayElement[i]}`
        wrapperInput.appendChild(itemCreate)
    }
}

const displayItemList = (datasIngredient, datatAppareils, datasUstensils, stateElements) => {
    for (let i = 0; i < datasIngredient.length; i++){
        var elementsIngredients = document.getElementById(`itemlistIngredients-${accentsModifyDeleteSpace(datasIngredient[i])}`)
        switch (stateElements) {
            case 'on':
                elementsIngredients.classList.toggle('activeItem')
                break
            case 'off':
                elementsIngredients.classList.remove('activeItem')
                break
        }
    }
    for (let i = 0; i < datatAppareils.length; i++){
        var elementsAppareils = document.getElementById(`itemlistAppareils-${accentsModifyDeleteSpace(datatAppareils[i])}`)
        switch (stateElements) {
            case 'on':
                elementsAppareils.classList.toggle('activeItem')
                break
            case 'off':
                elementsAppareils.classList.remove('activeItem')
                break
        }
    }

    for (let i = 0; i < datasUstensils.length; i++){
        var elementsUstnsils = document.getElementById(`itemlistUstensils-${accentsModifyDeleteSpace(datasUstensils[i])}`)
        switch (stateElements) {
            case 'on':
                elementsUstnsils.classList.toggle('activeItem')
                break
            case 'off':
                elementsUstnsils.classList.remove('activeItem')
                break
        }
    }
}
// ===== CREATION DES TAGS  =====
const createElementTag = (arrayTag, classTag) => {
    const wrapperTag = document.getElementById('wrapperTag')
    
    for (let i = 0; i < arrayTag.length; i++) {
        var tagElement = document.createElement('div')
        var classTagElement = ''
        var closeTag = ''
        var ModifyStringForDataValueElement = accentsModifyDeleteSpace(arrayTag[i])
        tagElement.setAttribute('data-value', `${ModifyStringForDataValueElement}`)
        
        switch (classTag) {
            case 'ingredients':
                tagElement.setAttribute('id', `tagElementIngredients-${ModifyStringForDataValueElement}`)
                tagElement.setAttribute('class', 'tagSelect tagSelect-ingredients')
                classTagElement = ' closetagIngredients'
                closeTag = 'closeTagIngredients'
                break
            case 'appareils':
                tagElement.setAttribute('id', `tagElementAppareils-${ModifyStringForDataValueElement}`)
                tagElement.setAttribute('class', 'tagSelect tagSelect-appareils')
                classTagElement = ' closetagAppareils'
                closeTag = 'closeTagAppareils'
                break
            case 'ustensils':
                tagElement.setAttribute('id', `tagElementUstensils-${ModifyStringForDataValueElement}`)
                tagElement.setAttribute('class', 'tagSelect tagSelect-ustensils')
                classTagElement = ' closetagUstensils'
                closeTag = 'closeTagUstensils'
                break
        }
        const htmlContentTag = `
            <p class="textTag">${arrayTag[i]}</p>
            <span class='closetag${classTagElement}'><span id=${closeTag}${ModifyStringForDataValueElement} class="fa-solid fa-xmark"></span></span>
        `
        tagElement.innerHTML = htmlContentTag
        wrapperTag.appendChild(tagElement)
    }
}
const openBtn = (value) => {
    var wrapperInputAppareils = document.getElementById(`wrapperInput${value}`)
    var researchInput = document.getElementById(`researchTag${value}`)
    wrapperInputAppareils.classList.toggle('activeBox')
    researchInput.classList.toggle('openDropdownInput')
}
const closeBtn = (value) => {
    var wrapperInputAppareils = document.getElementById(`wrapperInput${value}`)
    var researchInput = document.getElementById(`researchTag${value}`)
    researchInput.value = ''
    wrapperInputAppareils.classList.remove('activeBox')
    researchInput.classList.remove('openDropdownInput')
}

const initTagsAndItems = (datasArray) => {
    // On creer tous les tags en display none
createElementTag(itemsBtnIngredient(datasArray), 'ingredients')
createElementTag(itemsBtnAppareils(datasArray), 'appareils')
createElementTag(itemsBtnUstensils(datasArray), 'ustensils')
// On creer tous les items pour la recherche par tags
createItemList(itemsBtnIngredient(datasArray), 'wrapperInputIngredients-ul', 'ingredients')
createItemList(itemsBtnAppareils(datasArray), 'wrapperInputAppareils-ul', 'appareils')
createItemList(itemsBtnUstensils(datasArray), 'wrapperInputUstensils-ul', 'ustensils')
}
export { 
    accentsModifyDeleteSpace,
    createElementTag, 
    createItemList, 
    itemsBtnIngredient, 
    itemsBtnAppareils, 
    itemsBtnUstensils,
    openBtn, 
    closeBtn,
    displayItemList,
    initTagsAndItems
}

