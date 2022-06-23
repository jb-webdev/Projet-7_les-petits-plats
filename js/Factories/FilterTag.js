export class FilterTag {
	constructor (recipe) {
		this._recipe = recipe
        this.ingredientsArray = []
        this.appliancesArray = []
        this.ustensilsArray = []
	}

    /** Methode pour la création de mes liste de tags que je stock dans des array 
     * this.ingredientsArray && this.appliancesArray && this.ustensilsArray
     */
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
    /** methode pour creer les tags non afficher à l'ecran */
    createTag(array, expr, wrapperItem) {
        const wrapperTag = document.getElementById('wrapperTag')
        const WrapperItem = document.getElementById(wrapperItem)
        var compteur = 0
        for (let i = 0; i < array.length; i++) {
            
            const tagElement = document.createElement('div')
            const itemElement = document.createElement('p')

            switch (expr) {
                case 'ingredients':
                    var idTagTransform = `tag-ingredient-${compteur}`
                    var idItemTransform = `item-ingredient-${compteur}`
                    tagElement.setAttribute('id', `${idTagTransform}`)
                    tagElement.setAttribute('class', `tagSelect tagSelect-ingredient`)
                    itemElement.setAttribute('id', `${idItemTransform}`)
                    itemElement.setAttribute('class', 'item item-ingredient inactiveItem')
                    itemElement.innerHTML = `${array[i]}`

                    break;
                case 'appareils':
                    var idTagTransform = `tag-appareil-${compteur}`
                    var idItemTransform = `item-appareil-${compteur}`
                    tagElement.setAttribute('id', `${idTagTransform}`)
                    tagElement.setAttribute('class', `tagSelect tagSelect-appareil`)
                    itemElement.setAttribute('id', `${idItemTransform}`)
                    itemElement.setAttribute('class', 'item item-appareil inactiveItem')
                    itemElement.innerHTML = `${array[i]}`
                    break;
                case 'ustensils':
                    var idTagTransform = `tag-ustensil-${compteur}`
                    var idItemTransform = `item-ustensil-${compteur}`
                    tagElement.setAttribute('id', `${idTagTransform}`)
                    tagElement.setAttribute('class', `tagSelect tagSelect-ustensil`)
                    itemElement.setAttribute('id', `${idItemTransform}`)
                    itemElement.setAttribute('class', 'item item-ustensil inactiveItem')
                    itemElement.innerHTML = `${array[i]}`
                    break;
                default:
                    console.log(`error`);
            }
            const htmlContentTag = `
          <span class="closetag"><i id=close-${idTagTransform} class="fa-solid fa-xmark"></i></span>
          <p class="textTag">${array[i]}</p>
      `
            tagElement.innerHTML = htmlContentTag
            wrapperTag.appendChild(tagElement)
            WrapperItem.appendChild(itemElement)
            compteur = compteur + 1
        }
    }
    /** Methode pour initialiser les tags et les items en display none */
    initTagAndItem(){
        /** On appel la methode pour creer nos array */
        this.createIngredientsArray()
		this.createApplianceArray()
		this.createUstensilsArray()
        this.createTag(this.ingredientsArray, 'ingredients', 'wrapperInputIngredient')
        this.createTag(this.appliancesArray, 'appareils', 'wrapperInputAppareils')
        this.createTag(this.ustensilsArray, 'ustensils', 'wrapperInputUstensils')

    }
    /** methode display item et dropdown */
    eventInputItem() {
        const inputTagIngredient = document.getElementById('researchTagIngredient')
        const inputTagAppareils = document.getElementById('researchTagAppareils')
        const inputTagUstensils = document.getElementById('researchTagUstensils')
    
        const moveItem = (targetValue, itemClass, array, contentInput, arrowChangeValue) => {
            var elementItem = document.querySelectorAll(itemClass)
            const arrowChange = document.getElementById(arrowChangeValue)

            const dropDownDisplayIngredient = document.querySelector(contentInput)        
            if (targetValue.length > 2) {
                var filteredTagValue
                filteredTagValue = array.filter(element => element.toLowerCase().includes(targetValue))
                for (let i = 0; i < filteredTagValue.length; i++){
                    elementItem.forEach(element => {
                       if (element.textContent === filteredTagValue[i]) {
                        dropDownDisplayIngredient.classList.remove('inactiveBox')
                        dropDownDisplayIngredient.classList.add('activeBox')
                        arrowChange.classList.remove('fa-angle-up')
                        arrowChange.classList.add('fa-angle-down')
                        var displayItemIngredient = document.getElementById(element.id)
                        displayItemIngredient.classList.remove('inactiveItem')
                        displayItemIngredient.classList.add('activeItem')
                        displayItemIngredient.setAttribute('tabindex', 0)
                        
                       }
                    })
                }
            } else if (targetValue.length < 3 || targetValue.length === 0) {
                elementItem.forEach(element => {
                    var closeItemIngredient = document.getElementById(element.id)
                    closeItemIngredient.classList.remove('activeItem')
                    closeItemIngredient.classList.add('inactiveItem')
                    dropDownDisplayIngredient.classList.remove('activeBox')
                    dropDownDisplayIngredient.classList.add('inactiveBox')
                    arrowChange.classList.remove('fa-angle-down')
                        arrowChange.classList.add('fa-angle-up')
                })
            }
        }

        inputTagIngredient.addEventListener('input', e => {
            moveItem(e.target.value, '.item-ingredient', this.ingredientsArray, '.dropdown-contentInput-ingredient', 'arrowIngredient')
        })

        inputTagAppareils.addEventListener('input', e => {
            moveItem(e.target.value, '.item-appareil', this.appliancesArray, '.dropdown-contentInput-appareils', 'arrowAppareils')
        })

        inputTagUstensils.addEventListener('input', e => {
            moveItem(e.target.value, '.item-ustensil', this.ustensilsArray, '.dropdown-contentInput-ustensils', 'arrowUstensils')
        })
    }
    /** methode pour afficher les tag ou les suprimer de l'affichage */
    eventTag(objetTag) {
        // ecoute l'evenement click et keypres pour creer les tags
        const divs = document.querySelectorAll('.item')
        
        divs.forEach(el => el.addEventListener('click', el => {
            var targetDisplay = el.target.id
            var transformId = targetDisplay.replace('item', 'tag')
            var tagToDsisplay = document.getElementById(transformId)
            tagToDsisplay.classList.add('activeTag')
            /** on stock le choix dans l'objet de recherche */
            objetTag.tags.push(el.target.textContent)
            /** On recupere la balise qui a comme class activeBox */
            var parentActiveBox = document.querySelector('.activeBox')
            var getIdActiveBoxClass = document.getElementById(parentActiveBox.id)
            var removeClass = document.getElementById(getIdActiveBoxClass.id)
            /** On modifie la position de la flèche après la selection par clique */
            var arrowId = document.getElementById(removeClass.id.replace('wrapperInput', 'arrow'))
            arrowId.classList.remove('fa-angle-down')
            arrowId.classList.add('fa-angle-up')
            /** on modifie la class pour fermer la recherche après la selection */
            removeClass.classList.remove('activeBox')
            removeClass.classList.add('inactiveBox')
            var transformGetIdActiveBoxClass = getIdActiveBoxClass.id.replace('wrapperInput', 'researchTag')
            /** On vide la barre de recherche des tag pour repartir à zéro */
            document.getElementById(transformGetIdActiveBoxClass).value = ''

            return objetTag.tags
        }))
        divs.forEach(el => el.addEventListener('keypress', event => {
            if (event.key === 'Enter') {
                var targetDisplay = event.target.id
                var transformId = targetDisplay.replace('item', 'tag')
                var tagToDsisplay = document.getElementById(transformId)
                tagToDsisplay.classList.add('activeTag')
                /** on stock le choix dans l'objet de recherche */
                objetTag.tags.push(event.target.textContent)
                /** On recupere la balise qui a comme class activeBox */
                var parentActiveBox = document.querySelector('.activeBox')
                var getIdActiveBoxClass = document.getElementById(parentActiveBox.id)
                var removeClass = document.getElementById(getIdActiveBoxClass.id)
                /** On modifie la position de la flèche après la selection par clique */
                var arrowId = document.getElementById(removeClass.id.replace('wrapperInput', 'arrow'))
                arrowId.classList.remove('fa-angle-down')
                arrowId.classList.add('fa-angle-up')
                /** on modifie la class pour fermer la recherche après la selection */
                removeClass.classList.remove('activeBox')
                removeClass.classList.add('inactiveBox')
                var transformGetIdActiveBoxClass = getIdActiveBoxClass.id.replace('wrapperInput', 'researchTag')
                /** On vide la barre de recherche des tag pour repartir à zéro */
                document.getElementById(transformGetIdActiveBoxClass).value = ''
                //console.log(objetTag.tags)

                return objetTag.tags
            }
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
            //console.log(objetTag.tags)
            return objetTag.tags
        }))
    }
}