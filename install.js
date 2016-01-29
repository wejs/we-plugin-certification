module.exports = {
  /**
   * Return a list of updates
   *
   * @param  {Object} we we.js object
   * @return {Array}    a list of update objects
   */
  updates: function updates() {
    return [
      {
        version: '0.3.3',
        /**
         * Add present column
         */
        update: function update033(we, done) {
          we.utils.async.series([
            function (done) {
              var sql = 'ALTER TABLE `certificationTemplates` ADD COLUMN `published` '+
                'TINYINT(1) NOT NULL DEFAULT 0 `';
              we.db.defaultConnection.query(sql)
              .then(function(){
                done();
              }).catch(function (err){
                we.log.error(err);
                done(err);
              });
            }
          ], done);
        }
      }
    ];
  }
};
