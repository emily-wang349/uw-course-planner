class Model {
	constructor(id){
		this.id = id;
	}

	static fromJson(json){ }

	toPlainObject(){ }

	_removeIterablePropById(prop, id){
		if(Array.isArray(prop)){
			for(let i = 0; i < prop.length; i++){
				if(prop[i].id === id){
					prop[i].splice(i, 1);
					return true;
				}
			}
			return false;
		}
	}

	removeIterableProp(prop, item){
		if(typeof item === 'number' || typeof item === 'string'){
			return _removeIterablePropById(prop, ""+item);
		} else if(item instanceof Model){
			return _removeIterablePropById(prop, item.id);
		}
		throw new TypeError("Expected String, Number, or Model, got " + typeof term);
	}

	getIterablePropById(prop, id){
		if(!(typeof id === 'string')) throw new TypeError("Expected String or Number, got " + typeof id);
		if(Array.isArray(prop)){
			for(let i = 0; i < prop.length; i++){
				if(prop[i].id === id){
					return prop[i];
				}
			}
		}
		return null;
	}
}

module.exports = Model;