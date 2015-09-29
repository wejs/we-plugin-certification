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
    },
    certification: {
     textPositions: {
       middle: { l: 30, t: 350 },
       left: { l: 30, t: 150 },
       right: { l: 400, t: 150 }
     }
    }
  });
  // ser plugin routes
  plugin.setRoutes({
    'get /user/:userId([0-9]+)/certification': {
      titleHandler  : 'i18n',
      titleI18n     : 'certification.userCertifications',
      controller    : 'certification',
      action        : 'userCertifications',
      model         : 'certification',
      permission    : 'user_certification',
      template      : 'certification/userCertifications'
    },
    'get /user/:userId([0-9]+)/certification/:certificationId([0-9]+)/download.pdf': {
      controller    : 'certification',
      action        : 'downloadAsPDF',
      model         : 'certification',
      permission    : 'user_certification'
    }
  });
  return plugin;
};