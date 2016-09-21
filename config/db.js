module.exports = {
    remoteUrl : process.env.OPENSHIFT_MONGODB_DB_URL ? process.env.OPENSHIFT_MONGODB_DB_URL + "material-note" : "",
    //remoteUrl: 'mongodb://localhost/material-note'
};