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
            const itemElement = document.createElement('li')

            switch (expr) {
                case 'ingredients':
                    var idTagTransform = `tag-ingredient-${compteur}`
                    var idItemTransform = `item-ingredient-${compteur}`
                    tagElement.setAttribute('id', `${idTagTransform}`)
                    tagElement.setAttribute('class', `tagSelect tagSelect-ingredient`)

                    itemElement.setAttribute('id', `${idItemTransform}`)
                    itemElement.setAttribute('class', 'item item-ingredient activeItem')
                    itemElement.setAttribute('data-value', `${array[i]}`)
                    itemElement.innerHTML = `${array[i]}`

                    break;
                case 'appareils':
                    var idTagTransform = `tag-appareil-${compteur}`
                    var idItemTransform = `item-appareil-${compteur}`
                    tagElement.setAttribute('id', `${idTagTransform}`)
                    tagElement.setAttribute('class', `tagSelect tagSelect-appareil`)

                    itemElement.setAttribute('id', `${idItemTransform}`)
                    itemElement.setAttribute('class', 'item item-appareil activeItem')
                    itemElement.setAttribute('data-value', `${array[i]}`)
                    itemElement.innerHTML = `${array[i]}`
                    break;
                case 'ustensils':
                    var idTagTransform = `tag-ustensil-${compteur}`
                    var idItemTransform = `item-ustensil-${compteur}`
                    tagElement.setAttribute('id', `${idTagTransform}`)
                    tagElement.setAttribute('class', `tagSelect tagSelect-ustensil`)
                    itemElement.setAttribute('id', `${idItemTransform}`)
                    itemElement.setAttribute('class', 'item item-ustensil activeItem')
                    itemElement.setAttribute('data-value', `${array[i]}`)
                    itemElement.innerHTML = `${array[i]}`
                    break;
                default:
                    console.log(`error`);
            }
            const htmlContentTag = `
          <span class="closetag"><span id=close-${idTagTransform} class="fa-solid fa-xmark"></span></span>
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
   

}