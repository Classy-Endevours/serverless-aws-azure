class CustomError extends Error {
    public data: any;

    constructor(message: string, data = {}) {
        super(message);
        this.data = data;
    }

}

export default CustomError