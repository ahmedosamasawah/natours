class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObject = { ...this.queryString };

    const excludedFields = ['page', 'limit', 'sort', 'fields'];
    excludedFields.forEach((el) => delete queryObject[el]);

    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.queryString.sort) this.query = this.query.sort(this.queryString.sort.split(',').join(' '));
    this.query = this.query.sort('-createdAt');

    return this;
  }

  limitFields() {
    if (this.queryString.fields) this.query = this.query.select(this.queryString.fields.split(',').join(' '));
    this.query = this.query.select('-__v');

    return this;
  }

  paginate() {
    const defaultPage = 1;
    const defaultLimit = 100;

    const page = Math.max(this.queryString.page * 1 || defaultPage, 1);
    const limit = Math.max(this.queryString.limit * 1 || defaultLimit, 1);

    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
