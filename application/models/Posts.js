const db = require("../conf/database");
const PostModel = {};

PostModel.create = (title, description, photoPath, thumbnail,
                    fk_userId) => {
    let baseSQL = "INSERT INTO posts (title, description, photopath, thumbnail, createdAt, fk_userid) VALUE (?,?,?,?, now(), ?)";
    return db.execute(baseSQL, [
        title,
        description,
        photoPath,
        thumbnail,
        fk_userId
    ])
        .then(([results, fields]) => {
            return Promise.resolve(results && results.affectedRows);
        })
        .catch((err) => Promise.reject(err));
}

PostModel.search = (searchTerm) => {
    let baseSQL = "SELECT id, title, description, thumbnail, concat_ws('', title, description ) AS haystack \
            FROM posts \
            HAVING haystack like ?; ";
    let sqlReadySearchTerm = "%" + searchTerm + "%";
    return db.execute(baseSQL,[sqlReadySearchTerm])
        .then(([results,fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

PostModel.getNRecentPosts = (numberOfPost) => {
    let baseSQL =
        "SELECT id, title, description, thumbnail, createdAt FROM posts ORDER BY createdAt DESC LIMIT ?;"
    return db.query(baseSQL, [numberOfPost]).then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err))
}
module.exports = PostModel;
