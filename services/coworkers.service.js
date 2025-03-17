const mockData = require('../helpers/mock-data');

async function create(coworker) {
    console.log("Creating new coworker:", coworker);
    const id = String(mockData.coworkers.length + 1);  // Simulating an auto-generated ID
    console.log("Generated new ID:", id);

    mockData.coworkers.push({ ...coworker, id });
    console.log("New coworkers array:", mockData.coworkers);
    return id;
}

async function find({ searchString = '', page = 1, perPage = 20 }) {
    console.log("Searching for coworkers with searchString:", searchString);

    const filteredCoworkers = mockData.coworkers.filter(coworker =>
        coworker.lastName.toLowerCase().includes(searchString.toLowerCase())
    );

    console.log("Filtered coworkers:", filteredCoworkers);
    
    return {
        items: filteredCoworkers.slice((page - 1) * perPage, page * perPage),
        count: filteredCoworkers.length,
    };
}

async function findById(id) {
    console.log("Finding coworker by ID:", id);
    const coworker = mockData.coworkers.find(coworker => coworker.id === id);

    console.log("Found coworker:", coworker);
    return coworker || null;
}

async function findByIdAndUpdate(id, update) {
    console.log("Updating coworker with ID:", id);
    console.log("Update data:", update);

    const index = mockData.coworkers.findIndex(coworker => coworker.id === id);
    if (index === -1) {
        console.log("Coworker not found for update.");
        return null;
    }

    mockData.coworkers[index] = { ...mockData.coworkers[index], ...update };
    console.log("Updated coworker:", mockData.coworkers[index]);
    return mockData.coworkers[index];
}

async function findByIdAndDelete(id) {
    console.log("Deleting coworker with ID:", id);

    const index = mockData.coworkers.findIndex(coworker => coworker.id === id);
    if (index === -1) {
        console.log("Coworker not found for deletion.");
        return null;
    }

    const deletedCoworker = mockData.coworkers.splice(index, 1);
    console.log("Deleted coworker:", deletedCoworker[0]);
    return deletedCoworker[0];
}

async function findOne(filter) {
    console.log("Finding coworker with filter:", filter);
    
    const coworker = mockData.coworkers.find(coworker =>
        Object.keys(filter).every(key => coworker[key] === filter[key])
    );

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
