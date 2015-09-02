/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/extend.plugin
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);
  // set plugin configs
  plugin.setConfigs({
    permissions: {
      'user_certification': {
        'title': 'View user certifications',
        'description': 'View and download user certifications'
      }
    }
  });
  // ser plugin routes
  plugin.setRoutes({
    'get /user/:userId([0-9]+)/certification': {
      controller    : 'certification',
      action        : 'userCertifications',
      model         : 'certification',
      permission    : 'user_certification',
      template      : 'certification/userCertifications'
    }
  });
  return plugin;
};