const database = require("./database-connection");

module.exports = {
    list(db) {
        return database(db).select();
    },
    read(db, id) {
        return database(db).select().where("id", id).first();
    },
    create(db, body) {
        return database(db)
            .insert(body)
            .returning("*")
            .then(record => record[0]);
    },
    update(db, id, body) {
        return database(db)
            .update(body)
            .where("id", id)
            .returning("*")
            .then(record => record[0]);
    },
    delete(db, id) {
        return database(db).delete().where("id", id);
    }
};