module.exports = {
    remoteUrl : process.env.OPENSHIFT_MONGODB_DB_URL ? process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME : ""
    //remoteUrl: 'mongodb://localhost/material-note'


};