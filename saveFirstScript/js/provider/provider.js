class Provider {
	/**
     * 
     * @param {string} url 
     */
	constructor(url) {
		this._url = url
	}
	async get() {
		return fetch(this._url)
			.then(res => res.json())
			.then(res => res.recipes)
			.catch(err => console.log('une erreur c\'est produite', err))
	}
}
class ReceiptsProvider extends Provider {
	/**
     * Avec cette class on retourne touttes les datas des photographes
     * @param {string} url 
     */
	constructor(url) {
		super(url)
	}

	async getDataReceipts() {
		return await this.get()
	}
}

export {ReceiptsProvider}