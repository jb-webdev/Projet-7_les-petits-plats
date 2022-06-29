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
    return itemsIngredients = itemsIngredients.filter((item, index) => itemsIngredients.indexOf(item) === index).sort()
}

// ===== APPAREILS ===== 
// je creer mon tableau APPAREILS pour les items
const itemsBtnAppareils = (arrayItems) => {
    // this.arrayFilterRechercheItems
    var itemsApareils = []
		for (let i = 0; i < arrayItems.length; i++) {
			itemsApareils.push(arrayItems[i].appliance.toLowerCase())
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
    for (let i = 0; i < arrayElement.length; i++) {
        var itemCreate = document.createElement('li')
        itemCreate.setAttribute('class', `item ${ClassItem}`)
        itemCreate.innerHTML = `${arrayElement[i]}`
        wrapperInput.appendChild(itemCreate)
    }
}

// ===== CREATION DES TAGS  =====
const createElementTag = (arrayTag, classTag) => {
    const wrapperTag = document.getElementById('wrapperTag')
    
    for (let i = 0; i < arrayTag.length; i++) {
        var tagElement = document.createElement('div')
        tagElement.setAttribute('data-value', `${arrayTag[i]}`)
        switch (classTag) {
            case 'ingredient':
                tagElement.setAttribute('class', 'tagSelect tagSelect-ingredient')
                break
            case 'appareils':
                tagElement.setAttribute('class', 'tagSelect tagSelect-appareil')
                break
            case 'ustensils':
                tagElement.setAttribute('class', 'tagSelect tagSelect-ustensil')
                break
        }
        const htmlContentTag = `
            <span class="closetag"><span id=close-${arrayTag[i]} class="fa-solid fa-xmark"></span></span>
            <p class="textTag">${arrayTag[i]}</p>
        `
        tagElement.innerHTML = htmlContentTag
        wrapperTag.appendChild(tagElement)
    }
}

const closeBtn = (value,) => {
    var wrapperInputAppareils = document.getElementById(`wrapperInput${value}`)
    var researchInput = document.getElementById(`researchTag${value}`)
    wrapperInputAppareils.classList.remove('activeBox')
    researchInput.classList.remove('openDropdownInput')
}

const openBtn = (value,) => {
    var wrapperInputAppareils = document.getElementById(`wrapperInput${value}`)
    var researchInput = document.getElementById(`researchTag${value}`)
    wrapperInputAppareils.classList.toggle('activeBox')
    researchInput.classList.toggle('openDropdownInput')
}

const openDropDown = () => {
    var arrowUp = document.querySelectorAll(".fa-angle-up")
    arrowUp.forEach(el => el.addEventListener('click', el => {
        var idTarget = el.target.id
        var replaceValueTarget = idTarget.replace('arrow', '')
        openBtn(replaceValueTarget)
    }))
    
}


export { createElementTag, createItemList, itemsBtnIngredient, itemsBtnAppareils, itemsBtnUstensils, openDropDown, openBtn, closeBtn}

