let statuses = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	SERVER_ERROR: 500
};

class ResponseWrapper{
	constructor(res, data, message, status){		
		this.res = res;
		this.data = data || { empty: true };
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
			ok: 200 <= this.status && this.status < 400
		}
	}

	send(){
		this.res.status(this.status);
		this.res.json(this.makeResponseObject())
	}

}

module.exports = ResponseWrapper;