EWD.sockets.log = true;
EWD.VistATerminalPort = 8081;

EWD.application = {
  name: 'tdp',
  timeout: 3600,
  login: true,
  labels: {
    'ewd-title': 'The Daily Plan',
    'ewd-navbar-title-phone': 'The Daily Plan',
    'ewd-navbar-title-other': 'The Daily Plan using EWD.js'
  },
  navFragments: {
    main: {
      cache: true
    }
  },

  onStartup: function() {
    EWD.getFragment('login.html', 'loginPanel'); 
    EWD.getFragment('main.html', 'main_Container'); 
  },

  onPageSwap: {
  },

  onFragment: {
    // injected fragments
    'login.html': function(messageObj) {
      $('#loginBtn').show();
      $('#loginPanel').on('show.bs.modal', function() {
        setTimeout(function() {
          document.getElementById('username').focus();
        },1000);
      });

      $('#loginPanelBody').keydown(function(event){
        if (event.keyCode === 13) {
          document.getElementById('loginBtn').click();
        }
      });
    }
  },

  onMessage: {
    loggedIn: function(messageObj) {
      toastr.options.target = 'body';
      $('#main_Container').show();
      $('#mainPageTitle').text('Welcome to The Daily Plan, ' + messageObj.message.name);
    }
  }
};






