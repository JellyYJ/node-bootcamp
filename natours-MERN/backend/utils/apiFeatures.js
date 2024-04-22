class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString }; // shallow copy of `req.query`
    // delete some fields
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

    // Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this; // return the entire object
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      // query = query.sort(req.query.sort);
    } else {
      this.query = this.query.sort('createdAt');
    }
    return this; // return the entire object
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // exclude 'v' field
    }

    return this; // return the entire object
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; // default page
    const limit = this.queryString.limit * 1 || 100; // default limit
    // limit=10 1-10 page1, 11-20 page2, 21-30 page3
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this; // return the entire object
  }
}

module.exports = APIFeatures;
