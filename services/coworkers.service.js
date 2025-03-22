const Coworker = require('../models/coworker.model');

async function create(coworker) {
  console.log("Creating new coworker(s):", coworker);
  if (Array.isArray(coworker)) {
    const results = await Coworker.insertMany(coworker);
    return results.map(doc => doc._id.toString());
  } else {
    const newCoworker = new Coworker(coworker);
    await newCoworker.save();
    return newCoworker._id.toString();
  }
}

async function find({ searchString = '', page = 1, perPage = 20 }) {
  console.log("Searching for coworkers with searchString:", searchString);
  const query = { lastName: { $regex: searchString, $options: 'i' } };
  const [items, count] = await Promise.all([
    Coworker.find(query).skip((page - 1) * perPage).limit(perPage).lean(),
    Coworker.countDocuments(query)
  ]);
  console.log("Found coworkers:", items);
  return { items, count };
}

async function findById(id) {
  console.log("Finding coworker by ID:", id);
  const coworker = await Coworker.findById(id).lean();
  console.log("Found coworker:", coworker);
  return coworker || null;
}

async function findByIdAndUpdate(id, update) {
  console.log("Updating coworker with ID:", id);
  console.log("Update data:", update);
  const coworker = await Coworker.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true }).lean();
  console.log("Updated coworker:", coworker);
  return coworker || null;
}

async function findByIdAndDelete(id) {
  console.log("Deleting coworker with ID:", id);
  const coworker = await Coworker.findByIdAndDelete(id).lean();
  console.log("Deleted coworker:", coworker);
  return coworker || null;
}

async function findOne(filter) {
  console.log("Finding coworker with filter:", filter);
  const coworker = await Coworker.findOne(filter).lean();
  console.log("Found coworker with filter:", coworker);
  return coworker || null;
}

module.exports = {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne,
};
