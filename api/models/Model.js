class Model {
	constructor(){
		throw new Error("cannot instantiate generic class")
	}

	static fromJson(json){
		throw new Error("static method not overridden")
	}

	toJson(){
		//apparently we can support custom serialization
	}
}

module.exports = Model;