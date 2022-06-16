export class FilterTag {
	constructor (recipe) {
		this._recipe = recipe
        this.ingredientsArray = []
        this.appliancesArray = []
        this.ustensilsArray = []
	}

	createIngredientsArray(){
        let array = [];
        let itemIngredients = [];
        for (let i = 0; i < this._recipe.length; i++) {
            array.push(this._recipe[i].ingredients);
        }
        for (let el in array) {
            for (let a = 0; a < array[el].length; a++) {
                let items = array[el][a].ingredient;
                itemIngredients.push(items.toLowerCase());
            };
        }
        // je traite les duplicatas dans le tableau et je range par ordre alphabetique
        this.ingredientsArray = itemIngredients.filter((item, index) => itemIngredients.indexOf(item) === index).sort()

        return this.ingredientsArray
	}
    createApplianceArray(){
        let itemsAppliance = [];
        for (let i = 0; i < this._recipe.length; i++) {
            itemsAppliance.push(this._recipe[i].appliance.toLowerCase());
        }
        // je traite les duplicatas dans le tableau et je range par ordre alphabetique
        this.appliancesArray = itemsAppliance.filter((item, index) => itemsAppliance.indexOf(item) === index).sort();
        return this.appliancesArray
    }
    createUstensilsArray(){
        let array = [];
        let itemsUstensils = [];
        for (let i = 0; i < this._recipe.length; i++) {
            array.push(this._recipe[i].ustensils);
        }
        for (let el in array) {
            for (let i = 0; i < array[el].length; i++) {
                let items = array[el][i];
                itemsUstensils.push(items.toLowerCase());
            };
        }
        // je traite les duplicatas dans le tableau et je range par ordre alphabetique
        this.ustensilsArray = itemsUstensils.filter((item, index) => itemsUstensils.indexOf(item) === index).sort();
        return this.ustensilsArray
    }
    /** methode pour creer les items de choix dans les buttons */
    createList(container, array, expr) {
        const wrapperIngredient = document.querySelector(container)
        var compteur = 0

        for (let i = 0; i < array.length; i++) {
            const itemElement = document.createElement('p')
            switch (expr) {
                case 'ingredients':
                    var constructionIdItem = `item-ingredient-${compteur}`
                    itemElement.setAttribute('id', constructionIdItem)
                    itemElement.setAttribute('class', 'item item-ingredient')
                    break;
                case 'appareils':
                    var constructionIdItem = `item-appareil-${compteur}`
                    itemElement.setAttribute('id', constructionIdItem)
                    itemElement.setAttribute('class', 'item item-appareil')
                    break;
                case 'ustensils':
                    var constructionIdItem = `item-ustensil-${compteur}`
                    itemElement.setAttribute('id', constructionIdItem)
                    itemElement.setAttribute('class', 'item item-ustensil')
                    break;
                default:
                    console.log(`error`);
            }
            itemElement.innerHTML = array[i]
            wrapperIngredient.appendChild(itemElement)
            compteur = compteur + 1
        }


    }
    /** methode pour creer les tags non afficher à l'ecran */
    createTag (array, expr) {
        const wrapperTag = document.getElementById('wrapperTag')
        var compteur = 0
        for (let i = 0; i < array.length; i++) {
            const tagElement = document.createElement('div')
            
            switch (expr) {
                case 'ingredients':
                    var idTgTransform = `tag-ingredient-${compteur}`
                    tagElement.setAttribute('id', `${idTgTransform}`)
                    tagElement.setAttribute('class', `tagSelect tagSelect-ingredient`)
                    break;
                case 'appareils':
                    var idTgTransform = `tag-appareil-${compteur}`
                    tagElement.setAttribute('id', `${idTgTransform}`)
                    tagElement.setAttribute('class', `tagSelect tagSelect-appareil`)
                    break;
                case 'ustensils':
                    var idTgTransform = `tag-ustensil-${compteur}`
                    tagElement.setAttribute('id', `${idTgTransform}`)
                    tagElement.setAttribute('class', `tagSelect tagSelect-ustensil`)
                    break;
                default:
                    console.log(`error`);
            }
            const htmlContentTag = `
              <span class="closetag"><i id=close-${idTgTransform} class="fa-solid fa-xmark"></i></span>
              <p class="textTag">${array[i]}</p>
          `
            tagElement.innerHTML = htmlContentTag
            wrapperTag.appendChild(tagElement)
            compteur = compteur + 1
        }

        
    }
    /** methode pour afficher les tag ou les suprimer de l'affichage */
    eventTag(objetTag) {
        
        // ecoute l'evenement clique pour creer les tags
        const divs = document.querySelectorAll('.item')

        divs.forEach(el => el.addEventListener('click', el => {
            var targetDisplay = el.target.id
            var transformId = targetDisplay.replace('item-', 'tag-')
            var tagToDsisplay = document.getElementById(transformId)
            tagToDsisplay.classList.add('activeTag')
            objetTag.tags.push(el.target.textContent)
            
            return objetTag.tags
        }))
        // ecoute l'evenement clique pour suprimer les tag
        const closeTag = document.querySelectorAll('.fa-xmark')
        closeTag.forEach(el => el.addEventListener('click', el => {
            var retourTarget = el.target.id
            let transformValue = retourTarget.replace('close-', '')
            var tagToClose = document.getElementById(transformValue)
            tagToClose.classList.remove('activeTag')
            var transformTagToItem = retourTarget.replace('close-tag', 'item')
            let indexToSuprime = objetTag.tags.indexOf(document.getElementById(transformTagToItem).textContent)
            objetTag.tags.splice(indexToSuprime, 1)
           
            return objetTag.tags
        }))
    }
    
}