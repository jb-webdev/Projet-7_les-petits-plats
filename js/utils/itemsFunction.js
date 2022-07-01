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
// creation des items dans les inputs de recherceh par tags

const createItemList = (arrayElement, WrapperInput, ClassItem) => {
    //createItemList(this.arrayFilterItemsIngredient, 'wrapperInputIngredient-ul', 'ingredient')
    const wrapperInput = document.getElementById(WrapperInput)
    wrapperInput.innerHTML =''
    for (let i = 0; i < arrayElement.length; i++) {
        var ModifyStringForDataValueElement = accentsModifyDeleteSpace(arrayElement[i])
        var itemCreate = document.createElement('li')
        itemCreate.setAttribute('class', `item ${ClassItem}`)
        itemCreate.setAttribute('data-List', `${ModifyStringForDataValueElement}`)
        itemCreate.innerHTML = `${arrayElement[i]}`
        wrapperInput.appendChild(itemCreate)
    }
}
// ===== CREATION DES TAGS  =====
const createElementTag = (arrayTag, classTag) => {
    const wrapperTag = document.getElementById('wrapperTag')
    
    for (let i = 0; i < arrayTag.length; i++) {
        var tagElement = document.createElement('div')
        var ModifyStringForDataValueElement = accentsModifyDeleteSpace(arrayTag[i])
        tagElement.setAttribute('data-value', `${ModifyStringForDataValueElement}`)
        switch (classTag) {
            case 'ingredients':
                tagElement.setAttribute('class', 'tagSelect tagSelect-ingredients')
                break
            case 'appareils':
                tagElement.setAttribute('class', 'tagSelect tagSelect-appareils')
                break
            case 'ustensils':
                tagElement.setAttribute('class', 'tagSelect tagSelect-ustensils')
                break
        }
        const htmlContentTag = `
            <span class="closetag"><span id=close-${ModifyStringForDataValueElement} class="fa-solid fa-xmark"></span></span>
            <p class="textTag">${arrayTag[i]}</p>
        `
        tagElement.innerHTML = htmlContentTag
        wrapperTag.appendChild(tagElement)
    }
}
const closeBtn = (value,) => {
    var wrapperInputAppareils = document.getElementById(`wrapperInput${value}`)
    console.log(`wrapperInput${value}`)
    var researchInput = document.getElementById(`researchTag${value}`)
    console.log(`researchTag${value}`)
    wrapperInputAppareils.classList.remove('activeBox')
    researchInput.classList.remove('openDropdownInput')
}
const openBtn = (value) => {
    var wrapperInputAppareils = document.getElementById(`wrapperInput${value}`)
    var researchInput = document.getElementById(`researchTag${value}`)
    wrapperInputAppareils.classList.toggle('activeBox')
    researchInput.classList.toggle('openDropdownInput')

}
const openDropDown = (datasDisplay, objetTagRechercheTags) => {
    var arrowUp = document.querySelectorAll(".fa-angle-up")
    arrowUp.forEach(el => el.addEventListener('click', el => {
        var idTarget = el.target.id
        var replaceValueTarget = idTarget.replace('arrow', '')
        openBtn(replaceValueTarget)
        createItemList(itemsBtnIngredient(datasDisplay), 'wrapperInputIngredients-ul', 'ingredients')
		createItemList(itemsBtnAppareils(datasDisplay), 'wrapperInputAppareils-ul', 'appareils')
		createItemList(itemsBtnUstensils(datasDisplay), 'wrapperInputUstensils-ul', 'ustensils')
        createElementTag(itemsBtnIngredient(datasDisplay), 'ingredients')
		createElementTag(itemsBtnAppareils(datasDisplay), 'appareils')
		createElementTag(itemsBtnUstensils(datasDisplay), 'ustensils')
        const itemsEvent = document.querySelectorAll('.item')
		itemsEvent.forEach(el => el.addEventListener('click', el => {
			objetTagRechercheTags.push(el.target.textContent)
			var targetIdClose = el.target.classList[1]
			var elements = document.querySelector(`div[data-value=${el.target.dataset.list}]`)
			elements.classList.toggle('activeTag')
			closeBtn(targetIdClose[0].toUpperCase() + targetIdClose.slice(1))
		}))
        const closeTagEvent = document.querySelectorAll('.fa-xmark')
		closeTagEvent.forEach(el => el.addEventListener('click', el => {
			var changeId = el.target.id.replace('close-', '')
			var elements = document.querySelector(`div[data-value=${changeId}]`)
			elements.classList.remove('activeTag')
			objetTagRechercheTags.splice(objetTagRechercheTags.indexOf(changeId), 1)
		}))
        return objetTagRechercheTags
    }))
    
}


export { 
    accentsModifyDeleteSpace,
    createElementTag, 
    createItemList, 
    itemsBtnIngredient, 
    itemsBtnAppareils, 
    itemsBtnUstensils, 
    openDropDown, 
    openBtn, 
    closeBtn}

