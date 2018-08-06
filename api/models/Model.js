class Model {
	constructor(){
		
	}

	static fromJson(json){
		throw new Error("static method not overridden")
	}

	toJson(){
		//apparently we can support custom serialization
		return 'moreData'
	}
}

module.exports = Model;