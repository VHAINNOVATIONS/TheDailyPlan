module.exports = function(db) {

  var templateID = 0;
  //Create Default Template
  db.template.create({
    id: 1,
    template_name: 'Default',
    template_description: 'Default Template',
    active: true
  }).then(function(template) {
    templateID = template.id;
    console.log('templateID:',templateID);
  }).then(function(template) {
    console.log('afsin');
  });

  // Create Facilities and Facility Messages
  db.facility.create({
    name: 'Select a facility...',
    station: 0,
    visn: 0
  }).then(function(facility) {
    db.facility_message.bulkCreate([{
      facility_id: facility.id,
      active: true,
      message_order: 1,
      message_text: 'The Department of Veterans Affairs today announced a number of changes to make participation in the Veterans Choice Program easier and more convenient for Veterans who need to use it.',
      message_headline: 'VA Makes Changes to Veterans Choice Program '
    },{
      facility_id: facility.id,
      active: true,
      message_order: 2,
      message_text: 'The Department of Veterans Affairs  will sponsor the 5th annual National Veterans Small Business Engagement, November 17–19, 2015, at the David L. Lawrence Convention Center in Pittsburgh, PA.',
      message_headline: 'VA To Hold 2015 Small Business Engagement'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 3,
      message_text: 'VA Secretary Robert A. McDonald announces a partnership with the a foundation to further advance VA’s outreach to Veterans through deeper and more innovative local and community partnerships.',
      message_headline: 'VA Secretary to Announce Partnership'
    }]);
  });

 db.facility.create({
    name: 'Biloxi',
    station: 520,
    visn: 16
  }).then(function(facility) {
    db.facility_message.bulkCreate([{
      facility_id: facility.id,
      active: true,
      message_order: 1,
      message_text: 'This is the message text for the first message from Biloxi. We hope you have a great day!',
      message_headline: 'Biloxi Message 1 Headline'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 2,
      message_text: 'This is the message text for the second message from Biloxi. We hope you have a great day!',
      message_headline: 'Biloxi Message 2 Headline'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 3,
      message_text: 'This is the message text for the third message from Biloxi. We hope you have a great day!',
      message_headline: 'Biloxi Message 3 Headline'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 4,
      message_text: 'This is the message text for the fourth message from Biloxi. We hope you have a great day!',
      message_headline: 'Biloxi Message 4 Headline'
    }]);
  });

  db.facility.create({
    name: 'Madison',
    station: 607,
    visn: 12
  }).then(function(facility) {
    db.facility_message.bulkCreate([{
      facility_id: facility.id,
      active: true,
      message_order: 1,
      message_text: 'This is the message text for the first message from Madison. We hope you have a great day!',
      message_headline: 'Madison Message 1 Headline'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 2,
      message_text: 'This is the message text for the second message from Madison. We hope you have a great day!',
      message_headline: 'Madison Message 2 Headline'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 3,
      message_text: 'This is the message text for the third message from Madison. We hope you have a great day!',
      message_headline: 'Madison Message 3 Headline'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 4,
      message_text: 'This is the message text for the fourth message from Madison. We hope you have a great day!',
      message_headline: 'Madison Message 4 Headline'
    }]);
  });

db.facility.create({
    name: 'Minneapolis',
    station: 618,
    visn: 23
  }).then(function(facility) {
    db.facility_message.bulkCreate([{
      facility_id: facility.id,
      active: true,
      message_order: 1,
      message_text: 'This is the message text for the first message from Minneapolis. We hope you have a great day!',
      message_headline: 'Minneapolis Message 1 Headline'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 2,
      message_text: 'This is the message text for the second message from Minneapolis. We hope you have a great day!',
      message_headline: 'Minneapolis Message 2 Headline'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 3,
      message_text: 'This is the message text for the third message from Minneapolis. We hope you have a great day!',
      message_headline: 'Minneapolis Message 3 Headline'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 4,
      message_text: 'This is the message text for the fourth message from Minneapolis. We hope you have a great day!',
      message_headline: 'Minneapolis Message 4 Headline'
    }]);
  });

  db.facility.create({
    name: 'Central Texas (Waco)',
    station: 674,
    visn: 17
  }).then(function(facility) {
    db.facility_message.bulkCreate([{
      facility_id: facility.id,
      active: true,
      message_order: 1,
      message_text: 'This is the message text for the first message from Central Texas (Waco). We hope you have a great day!',
      message_headline: 'Central Texas (Waco) Message 1 Headline'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 2,
      message_text: 'This is the message text for the second message from Central Texas (Waco). We hope you have a great day!',
      message_headline: 'Central Texas (Waco) Message 2 Headline'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 3,
      message_text: 'This is the message text for the third message from Central Texas (Waco). We hope you have a great day!',
      message_headline: 'Central Texas (Waco) Message 3 Headline'
    },{
      facility_id: facility.id,
      active: true,
      message_order: 4,
      message_text: 'This is the message text for the fourth message from Central Texas (Waco). We hope you have a great day!',
      message_headline: 'Central Texas (Waco) Message 4 Headline'
    }]);
  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Allergies',
    directive: 'dt-allergies',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 1,
    mandatory: true
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Allergies Default',
      panel_type_id: pt.id,
      sizeX: 2,
      sizeY: 1
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Immunizations',
    directive: 'dt-immunizations',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 1,
    mandatory: false
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Immunizations Default',
      panel_type_id: pt.id,
      sizeX: 2,
      sizeY: 1
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Problems',
    directive: 'dt-problems',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: false
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Problems Default',
      panel_type_id: pt.id,
      sizeX: 3,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Vitals',
    directive: 'dt-vitals',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: false
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Vitals Default',
      panel_type_id: pt.id,
      sizeX: 3,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Diet Orders',
    directive: 'dt-diet-orders',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: false
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Diet Orders Default',
      panel_type_id: pt.id,
      sizeX: 3,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Lab Orders',
    directive: 'dt-lab-orders',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: true
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Lab Orders Default',
      panel_type_id: pt.id,
      sizeX: 3,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Radiology Reports',
    directive: 'dt-radiology-reports',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: false
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Radiology Reports Default',
      panel_type_id: pt.id,
      sizeX: 3,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Visits',
    directive: 'dt-visits',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: true
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Visits Default',
      panel_type_id: pt.id,
      sizeX: 3,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'IV Medications',
    directive: 'dt-iv-meds',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: false
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'IV Medications Default',
      panel_type_id: pt.id,
      sizeX: 3,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Active Medications',
    directive: 'dt-active-meds',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: true
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Active Medications Default',
      panel_type_id: pt.id,
      sizeX: 3,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Radiology Orders',
    directive: 'dt-radiology-orders',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: false
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Radiology Orders Default',
      panel_type_id: pt.id,
      sizeX: 3,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Nursing Orders',
    directive: 'dt-nursing-orders',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: false
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Nursing Orders Default',
      panel_type_id: pt.id,
      sizeX: 3,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Labs',
    directive: 'dt-labs',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: false
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Labs Default',
      panel_type_id: pt.id,
      sizeX: 3,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

      // Now Create the Settings and Details
      db.panel_setting.create({
        panel_type_id: pt.id,
        setting_type: 1,
        setting_name: Tests,
        setting_value: 'MAGNESIUM'
      }).then(function(ps) {
        //Then Create the Details
        db.panel_detail.create({
          panel_id: p.id,
          panel_setting_id: ps.id
        }).then(function(tl) {
          console.log('<<<<<<<Panel Setting & Detail Record Created.>>>>>>>')
        });

      });

      // Now Create the Settings and Details
      db.panel_setting.create({
        panel_type_id: pt.id,
        setting_type: 1,
        setting_name: Tests,
        setting_value: 'POTASSIUM'
      }).then(function(ps) {
        //Then Create the Details
        db.panel_detail.create({
          panel_id: p.id,
          panel_setting_id: ps.id
        }).then(function(tl) {
          console.log('<<<<<<<Panel Setting & Detail Record Created.>>>>>>>')
        });

      });

      // Now Create the Settings and Details
      db.panel_setting.create({
        panel_type_id: pt.id,
        setting_type: 1,
        setting_name: Tests,
        setting_value: 'HDL'
      }).then(function(ps) {
        //Then Create the Details
        db.panel_detail.create({
          panel_id: p.id,
          panel_setting_id: ps.id
        }).then(function(tl) {
          console.log('<<<<<<<Panel Setting & Detail Record Created.>>>>>>>')
        });

      });

      // Now Create the Settings and Details
      db.panel_setting.create({
        panel_type_id: pt.id,
        setting_type: 1,
        setting_name: Tests,
        setting_value: 'CHOLESTEROL'
      }).then(function(ps) {
        //Then Create the Details
        db.panel_detail.create({
          panel_id: p.id,
          panel_setting_id: ps.id
        }).then(function(tl) {
          console.log('<<<<<<<Panel Setting & Detail Record Created.>>>>>>>')
        });

      });

      // Now Create just a Settings
      db.panel_setting.create({
        panel_type_id: pt.id,
        setting_type: 1,
        setting_name: Tests,
        setting_value: 'TRIGLYCERIDE'
      })

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Contacts',
    directive: 'dt-contacts',
    scope_variable: 'demographics',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: false
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Contacts Default',
      panel_type_id: pt.id,
      sizeX: 2,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

  // Create the Panel_Type First
  db.panel_type.create({
    title: 'Health Factors',
    directive: 'dt-health-factors',
    scope_variable: 'patient',
    minSizeX: 2,
    minSizeY: 2,
    mandatory: false
  }).then(function(pt) {
    // Then Create the Panel Second
    db.panel.create({
      name: 'Health Factors Default',
      panel_type_id: pt.id,
      sizeX: 3,
      sizeY: 2
    }).then(function(p) {
      // Then Create the Template_Layout Second
      console.log('templateID:',templateID);
      db.template_layout.create({
        template_id: templateID,
        panel_id: p.id,
        panel_order: p.id
      }).then(function(tl) {
        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
      });

    });

  });

};
