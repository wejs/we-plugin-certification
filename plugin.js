/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/extend.plugin
 */

module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);
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

  plugin.setResource({ name: 'certification'});
  plugin.setResource({ name: 'certification-template'});

  plugin.addCertificationsMenuLink = function (data, done) {
    const we = data.req.we;

    if (!data.req.isAuthenticated()) return done();

    // set certifications
    data.res.locals.userMenu.addLink({
      id: 'certification_userCertifications',
      dividerAfter: true,
      text: '<i class="glyphicon glyphicon-asterisk"></i> '+
        data.req.__('certification.my'),
      href: we.router.urlTo(
        'certification.userCertifications', [data.req.user.id], we
      ),
      parent: 'user',
      class: null,
      weight: 7
    });

    done();
  }

  plugin.hooks.on('we-plugin-menu:after:set:core:menus', plugin.addCertificationsMenuLink);

  /**
   * Render one pdf template
   * @return {[type]} [description]
   */
  plugin.renderPDFtemplate = require('./lib/renderPDFtemplate.js');

  return plugin;
};