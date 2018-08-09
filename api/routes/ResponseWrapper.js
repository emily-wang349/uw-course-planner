let statuses = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
};

class ResponseWrapper{
	constructor(res, data, message, status){		
		this.res = res;
		this.data = data || {};
		this.message = message || "No message";
		this.status = status || statuses.OK;
	}

	static get STATUS () {
		return statuses;
	}

	makeResponseObject(){
		return {
			message: this.message,
			status: this.status,
			data: this.data,
			ok: this.status <= 200 && this.status < 400
		}
	}

	send(){
		this.res.status(this.status);
		this.res.json(this.makeResponseObject())
	}

}

module.exports = ResponseWrapper;