'use strict';

module.exports = function(db) {
    var layoutOrder = {
        'Allergies': 1,
        'Immunizations': 2,
        'Vital Signs': 3,
        'Diet Orders': 4,
        'Pending Lab Orders': 5,
        'Pending Radiology Orders': 6,
        'Pending Procedures': 7,
        'Visits': 8,
        'IV Medications': 9,
        'Inpatient Medications': 10,
        'Outpatient Medications': 11,
        'Labs': 12,
        'Contacts': 13,
        'Providers': 14,
        'Health Factors': 15,
        'Postings': 16,
        'Free Text 1': 17,
        'Free Text 2': 18,
        'Free Text 3': 19
    }

    var allergies = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Allergies',
            directive: 'dt-simple-grid',
            service: 'Allergy',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: false,
            enable_options: false,
            highlight_panel:true
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Allergies Default',
                panel_type_id: pt.id,
                sizeX: 2,
                sizeY: 2
            }).then(function(p) {
                // Then Create the Template_Layout Second
                console.log('templateId:', templateId);
                return db.template_layout.create({
                    template_id: templateId,
                    panel_id: p.id,
                    panel_order: layoutOrder[pt.title]
                }).then(function(tl) {
                    console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                });
            });
        });
    };

    var immunizations = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Immunizations',
            directive: 'dt-simple-grid',
            service: 'Immunizations',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: false,
            enable_options: false
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Immunizations Default',
                panel_type_id: pt.id,
                sizeX: 2,
                sizeY: 2
            }).then(function(p) {
                // Then Create the Template_Layout Second
                console.log('templateId:', templateId);
                return db.template_layout.create({
                    template_id: templateId,
                    panel_id: p.id,
                    panel_order: layoutOrder[pt.title]
                }).then(function(tl) {
                    console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                });
            });
        });
    };

    var vitals = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Vital Signs',
            directive: 'dt-simple-grid',
            service: 'Vitals',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: false,
            enable_options: true
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Vitals Default',
                panel_type_id: pt.id,
                sizeX: 3,
                sizeY: 2
            }).then(function(p) {
                return db.Sequelize.Promise.all([
                    db.template_layout.create({
                        template_id: templateId,
                        panel_id: p.id,
                        panel_order: layoutOrder[pt.title]
                    }),
                    db.panel_setting.create({
                        panel_type_id: pt.id,
                        setting_type: 6,
                        setting_name: 'Occurences',
                        setting_value: '3:1^2^3'
                    }).then(function(ps) {
                        return db.panel_detail.create({
                            panel_id: p.id,
                            panel_setting_id: ps.id,
                            detail_value: '3'
                        }).then(function(tl) {
                            console.log('vital settings updated...')
                        });
                    }),
                    db.panel_setting.create({
                        panel_type_id: pt.id,
                        setting_type: 2,
                        setting_name: 'Back Days',
                        setting_value: '30'
                    }).then(function(ps) {
                        return db.panel_detail.create({
                            panel_id: p.id,
                            panel_setting_id: ps.id,
                            detail_value: '30'
                        }).then(function(tl) {
                            console.log('vital Back Days settings updated...')
                        });
                    })
                ]);
            });
        });
    };

    var dietOrders = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Diet Orders',
            directive: 'dt-simple-grid',
            service: 'DietOrders',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: false,
            enable_options: false
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Diet Orders Default',
                panel_type_id: pt.id,
                sizeX: 3,
                sizeY: 2
            }).then(function(p) {
                // Then Create the Template_Layout Second
                console.log('templateId:', templateId);
                return db.template_layout.create({
                    template_id: templateId,
                    panel_id: p.id,
                    panel_order: layoutOrder[pt.title]
                }).then(function(tl) {
                    console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                });
            });
        });
    };

    var labOrders = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Pending Lab Orders',
            directive: 'dt-simple-grid',
            service: 'LabOrders',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: true,
            enable_options: false
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Pending Lab Orders Default',
                panel_type_id: pt.id,
                sizeX: 3,
                sizeY: 2
            }).then(function(p) {
                // Then Create the Template_Layout Second
                console.log('templateId:', templateId);
                return db.template_layout.create({
                    template_id: templateId,
                    panel_id: p.id,
                    panel_order: layoutOrder[pt.title]
                }).then(function(tl) {
                    console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                });
            });
        });
    };

    var radiologyOrders = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Pending Radiology Orders',
            directive: 'dt-simple-grid',
            service: 'RadiologyOrders',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: true,
            enable_options: false
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Pending Radiology Orders Default',
                panel_type_id: pt.id,
                sizeX: 3,
                sizeY: 2
            }).then(function(p) {
                // Then Create the Template_Layout Second
                console.log('templateId:', templateId);
                return db.template_layout.create({
                    template_id: templateId,
                    panel_id: p.id,
                    panel_order: layoutOrder[pt.title]
                }).then(function(tl) {
                    console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                });
            });
        });
    };

    var pendingProcedures = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Pending Procedures',
            directive: 'dt-simple-grid',
            service: 'Procedures',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: false,
            enable_options: true
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Pending Procedures Default',
                panel_type_id: pt.id,
                sizeX: 3,
                sizeY: 2
            }).then(function(p) {
                return db.Sequelize.Promise.all([
                    db.template_layout.create({
                        template_id: templateId,
                        panel_id: p.id,
                        panel_order: layoutOrder[pt.title]
                    }),
                    db.panel_setting.create({
                        panel_type_id: pt.id,
                        setting_type: 2,
                        setting_name: 'Future Days',
                        setting_value: '30'
                    }).then(function(ps) {
                        return db.panel_detail.create({
                            panel_id: p.id,
                            panel_setting_id: ps.id,
                            detail_value: '30'
                        }).then(function(tl) {
                            console.log('pending procedures settings updated...')
                        });
                    })
                ]);
            });
        });
    };

    var visits = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Visits',
            directive: 'dt-simple-grid',
            service: 'Visits',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: true,
            enable_options: true
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Visits Default',
                panel_type_id: pt.id,
                sizeX: 3,
                sizeY: 2
            }).then(function(p) {
                console.log('templateId:', templateId);
                // Then Create the Template_Layout Second
                return db.Sequelize.Promise.all([
                    db.template_layout.create({
                        template_id: templateId,
                        panel_id: p.id,
                        panel_order: layoutOrder[pt.title]
                    }).then(function(tl) {
                        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                    }),
                    // Now Create the Settings and Details
                    db.panel_setting.create({
                        panel_type_id: pt.id,
                        setting_type: 2,
                        setting_name: 'Future Days',
                        setting_value: '30'
                    }).then(function(ps) {
                        //Then Create the Details
                        return db.panel_detail.create({
                            panel_id: p.id,
                            panel_setting_id: ps.id,
                            detail_value: '30'
                        }).then(function(tl) {
                            console.log('<<<<<<<Panel Setting & Detail Record Created.>>>>>>>')
                        });
                    })
                ]);
            });
        });
    };

    var ivMedications = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'IV Medications',
            directive: 'dt-simple-grid',
            service: 'IVMedication',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: true,
            enable_options: false
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'IV Medications Default',
                panel_type_id: pt.id,
                sizeX: 3,
                sizeY: 2
            }).then(function(p) {
                // Then Create the Template_Layout Second
                console.log('templateId:', templateId);
                return db.template_layout.create({
                    template_id: templateId,
                    panel_id: p.id,
                    panel_order: layoutOrder[pt.title]
                }).then(function(tl) {
                    console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                });
            });
        });
    };

    var inpatientMedications = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Inpatient Medications',
            directive: 'dt-simple-grid',
            service: 'InpatientMedication',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: false,
            enable_options: false
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Active Inpatient Medications Default',
                panel_type_id: pt.id,
                sizeX: 3,
                sizeY: 2
            }).then(function(p) {
                // Then Create the Template_Layout Second
                console.log('templateId:', templateId);
                return db.template_layout.create({
                    template_id: templateId,
                    panel_id: p.id,
                    panel_order: layoutOrder[pt.title]
                }).then(function(tl) {
                    console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                });
            });
        });
    };

    var outpatientMedications = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Outpatient Medications',
            directive: 'dt-simple-grid',
            service: 'OutpatientMedication',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: false,
            enable_options: false
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Active Outpatient Medications Default',
                panel_type_id: pt.id,
                sizeX: 3,
                sizeY: 2
            }).then(function(p) {
                // Then Create the Template_Layout Second
                console.log('templateId:', templateId);
                return db.template_layout.create({
                    template_id: templateId,
                    panel_id: p.id,
                    panel_order: layoutOrder[pt.title]
                }).then(function(tl) {
                    console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                });
            });
        });
    };

    var labs = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Labs',
            directive: 'dt-simple-grid',
            service: 'Labs',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: false,
            enable_options: true
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Labs Default',
                panel_type_id: pt.id,
                sizeX: 3,
                sizeY: 2
            }).then(function(p) {
                console.log('templateId:', templateId);
                return db.Sequelize.Promise.all([
                    // Then Create the Template_Layout Second
                    db.template_layout.create({
                        template_id: templateId,
                        panel_id: p.id,
                        panel_order: layoutOrder[pt.title]
                    }).then(function(tl) {
                        console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                    }),
                    db.panel_setting.create({
                        panel_type_id: pt.id,
                        setting_type: 6,
                        setting_name: 'Occurences',
                        setting_value: '3:1^2^3'
                    }).then(function(ps) {
                        return db.panel_detail.create({
                            panel_id: p.id,
                            panel_setting_id: ps.id,
                            detail_value: '3'
                        })
                    }).then(function() {
                        return db.panel_setting.create({
                            panel_type_id: pt.id,
                            setting_type: 5,
                            setting_name: 'Test Names'
                        });
                    }).then(function() {
                        console.log('labs settings are created...')
                    }),
                    db.panel_setting.create({
                        panel_type_id: pt.id,
                        setting_type: 7,
                        setting_name: 'Name as PDF Header',
                        setting_value: true
                    }).then(function(ps) {
                        return db.panel_detail.create({
                            panel_id: p.id,
                            panel_setting_id: ps.id,
                            detail_value: true
                        })
                    }).then(function() {
                        console.log('labs Name as PDF Header settings are created...')
                    })
                ])
            });
        });
    };

    var contacts = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Contacts',
            directive: 'dt-contacts',
            scope_variable: 'demographics',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: false,
            enable_options: false
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Contacts Default',
                panel_type_id: pt.id,
                sizeX: 2,
                sizeY: 2
            }).then(function(p) {
                // Then Create the Template_Layout Second
                console.log('templateId:', templateId);
                return db.template_layout.create({
                    template_id: templateId,
                    panel_id: p.id,
                    panel_order: layoutOrder[pt.title]
                }).then(function(tl) {
                    console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                });
            });
        });
    };

    var providers = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Providers',
            directive: 'dt-providers',
            scope_variable: 'demographics',
            minSizeX: 2,
            minSizeY: 1,
            mandatory: false,
            enable_options: false
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Providers Default',
                panel_type_id: pt.id,
                sizeX: 2,
                sizeY: 1
            }).then(function(p) {
                // Then Create the Template_Layout Second
                console.log('templateId:', templateId);
                return db.template_layout.create({
                    template_id: templateId,
                    panel_id: p.id,
                    panel_order: layoutOrder[pt.title]
                }).then(function(tl) {
                    console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                });
            });
        });
    };

    var healthFactors = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Health Factors',
            directive: 'dt-simple-grid',
            service: 'HealthFactors',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: false,
            enable_options: true
        }).then(function(pt) {
            return db.panel.create({
                name: 'Health Factors Default',
                panel_type_id: pt.id,
                sizeX: 3,
                sizeY: 2
            }).then(function(p) {
                return db.Sequelize.Promise.all([
                    db.template_layout.create({
                        template_id: templateId,
                        panel_id: p.id,
                        panel_order: layoutOrder[pt.title]
                    }),
                    db.panel_setting.create({
                        panel_type_id: pt.id,
                        setting_type: 5,
                        setting_name: 'Include Factors'
                    }).then(function() {
                        console.log('health factor settings are created...')
                    })
                ]);
            });
        });
    };

    var postings = function(facilityId, templateId) {
        return db.panel_type.create({
            facility_id: facilityId,
            title: 'Postings',
            directive: 'dt-simple-grid',
            service: 'Postings',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: false,
            enable_options: true
        }).then(function(pt) {
            // Then Create the Panel Second
            return db.panel.create({
                name: 'Postings Default',
                panel_type_id: pt.id,
                sizeX: 3,
                sizeY: 2
            }).then(function(p) {
                return db.Sequelize.Promise.all([
                    db.template_layout.create({
                        template_id: templateId,
                        panel_id: p.id,
                        panel_order: layoutOrder[pt.title]
                    }),
                    db.panel_setting.create({
                        panel_type_id: pt.id,
                        setting_type: 5,
                        setting_name: 'Include Types',
                        setting_value: 'FALL RISK^CLINICAL WARNING^ADVANCE DIRECTIVE'
                    }).then(function(ps) {
                        return db.panel_detail.create({
                            panel_id: p.id,
                            panel_setting_id: ps.id,
                            detail_value: 'FALL RISK'
                        }).then(function() {
                          return db.panel_detail.create({
                              panel_id: p.id,
                              panel_setting_id: ps.id,
                              detail_value: 'CLINICAL WARNING'
                          });
                        }).then(function() {
                          return db.panel_detail.create({
                              panel_id: p.id,
                              panel_setting_id: ps.id,
                              detail_value: 'ADVANCE DIRECTIVE'
                          });
                        });
                    }).then(function() {
                        console.log('postings settings are created...')
                    })
                ]);
            });
        });
    };

    var freeText = function(facility, templateId, index) {
        return db.panel_type.create({
            facility_id: facility.id,
            title: 'Free Text ' + index,
            directive: 'dt-free-text',
            scope_variable: 'patient',
            minSizeX: 2,
            minSizeY: 2,
            mandatory: false,
            enable_options: true
        }).then(function(pt) {
            db.panel_setting.create({
                panel_type_id: pt.id,
                setting_type: 3,
                setting_name: 'Title',
                setting_value: ''
            }).then(function() {
                return db.panel_setting.create({
                    panel_type_id: pt.id,
                    setting_type: 4,
                    setting_name: 'Content',
                    setting_value: ''
                });
            }).then(function() {
                console.log('Free text settings are created<<<<<<<.>>>>>>>')
            })
        }).then(function() {
            console.log('%s Free Text %s is created', facility.name, index);
        });
    };

    var createTemplate = function(facility) {
        //Create Default Template
        return db.template.create({
            facility_id: facility.id,
            template_name: 'Default',
            template_description: 'Default Template',
            active: true
        }).then(function(template) {
            console.log('templateId:', template.id);
            return template.id;
        }).then(function(templateId) {
            return db.Sequelize.Promise.all([
                allergies(facility.id, templateId),
                immunizations(facility.id, templateId),
                vitals(facility.id, templateId),
                dietOrders(facility.id, templateId),
                labOrders(facility.id, templateId),
                radiologyOrders(facility.id, templateId),
                pendingProcedures(facility.id, templateId),
                visits(facility.id, templateId),
                ivMedications(facility.id, templateId),
                inpatientMedications(facility.id, templateId),
                outpatientMedications(facility.id, templateId),
                labs(facility.id, templateId),
                contacts(facility.id, templateId),
                providers(facility.id, templateId),
                healthFactors(facility.id, templateId),
                postings(facility.id, templateId)
            ].concat(['1', '2', '3'].map(function(index) {
                return freeText(facility, templateId, index);
            })))
        }).then(function() {
            console.log('%s is created.', facility.name);
        });
    };

    // Create Facilities and Facility Messages
    return db.Sequelize.Promise.all([
        db.facility.create({
            name: 'Select a facility...',
            station: 0,
            visn: 0
        }).then(function(facility) {
            return db.facility_message.bulkCreate([{
                facility_id: facility.id,
                active: true,
                message_order: 1,
                message_text: 'The Department of Veterans Affairs today announced a number of changes to make participation in the Veterans Choice Program easier and more convenient for Veterans who need to use it.',
                message_headline: 'VA Makes Changes to Veterans Choice Program '
            }, {
                facility_id: facility.id,
                active: true,
                message_order: 2,
                message_text: 'The Department of Veterans Affairs  will sponsor the 5th annual National Veterans Small Business Engagement, November 17–19, 2015, at the David L. Lawrence Convention Center in Pittsburgh, PA.',
                message_headline: 'VA To Hold 2015 Small Business Engagement'
            }, {
                facility_id: facility.id,
                active: true,
                message_order: 3,
                message_text: 'VA Secretary Robert A. McDonald announces a partnership with the a foundation to further advance VA’s outreach to Veterans through deeper and more innovative local and community partnerships.',
                message_headline: 'VA Secretary to Announce Partnership'
            }]).then(function() {
                db.facility_contact.create({
                    facilityId: facility.id,
                    title1: 'Beth J. King, RN, BSN, MA, CCM',
                    title2: 'National Center for Patient Safety (10A4E)',
                    phone: '730-930-5871',
                    email: 'Beth.King@va.gov'
                })
            });
        }).then(function() {
            return db.landing_image.bulkCreate([{
                name: 'landing1.jpg',
                active: true
            }, {
                name: 'landing2.jpg',
                active: true
            }, {
                name: 'landing3.jpg',
                active: true
            }, {
                name: 'landing4.jpg',
                active: true
            }]);
        }),
        db.facility.create({
            name: 'Biloxi',
            station: 520,
            visn: 16
        }).then(function(facility) {
            return db.Sequelize.Promise.all([createTemplate(facility),
                db.facility_message.bulkCreate([{
                    facility_id: facility.id,
                    active: true,
                    message_order: 1,
                    message_text: 'This is the message text for the first message from Biloxi. We hope you have a great day!',
                    message_headline: 'Biloxi Message 1 Headline'
                }, {
                    facility_id: facility.id,
                    active: true,
                    message_order: 2,
                    message_text: 'This is the message text for the second message from Biloxi. We hope you have a great day!This is the message text for the second message from Biloxi. We hope you have a great day!This is the message text for the second message from Biloxi. We hope you have a great day!',
                    message_headline: 'Biloxi Message 2 Headline'
                }, {
                    facility_id: facility.id,
                    active: true,
                    message_order: 3,
                    message_text: 'This is the message text for the third message from Biloxi. We hope you have a great day!',
                    message_headline: 'Biloxi Message 3 Headline'
                }, {
                    facility_id: facility.id,
                    active: true,
                    message_order: 4,
                    message_text: 'This is the message text for the fourth message from Biloxi. We hope you have a great day!',
                    message_headline: 'Biloxi Message 4 Headline'
                }]),
                db.facility_contact.create({
                    facilityId: facility.id,
                    title1: 'Beth J. King, RN, BSN, MA, CCM',
                    title2: 'National Center for Patient Safety (10A4E)',
                    phone: '730-930-5871',
                    email: 'Beth.King@va.gov'
                })
            ])
        }),
        db.facility.create({
            name: 'Madison',
            station: 607,
            visn: 12
        }).then(function(facility) {
            return db.Sequelize.Promise.all([createTemplate(facility),
                db.facility_message.bulkCreate([{
                    facility_id: facility.id,
                    active: true,
                    message_order: 1,
                    message_text: 'This is the message text for the first message from Madison. We hope you have a great day!',
                    message_headline: 'Madison Message 1 Headline'
                }, {
                    facility_id: facility.id,
                    active: true,
                    message_order: 2,
                    message_text: 'This is the message text for the second message from Madison. We hope you have a great day!',
                    message_headline: 'Madison Message 2 Headline'
                }, {
                    facility_id: facility.id,
                    active: true,
                    message_order: 3,
                    message_text: 'This is the message text for the third message from Madison. We hope you have a great day!',
                    message_headline: 'Madison Message 3 Headline'
                }, {
                    facility_id: facility.id,
                    active: true,
                    message_order: 4,
                    message_text: 'This is the message text for the fourth message from Madison. We hope you have a great day!',
                    message_headline: 'Madison Message 4 Headline'
                }]),
                db.facility_contact.create({
                    facilityId: facility.id,
                    title1: 'Carole Borland BSN, RN',
                    title2: 'Nurse Manager',
                    title3: 'William S. Middleton Memorial VA Hospital',
                    phone: '608-308-3432',
                    email: 'Carole.Borland@va.gov'
                })
            ])
        }),
        db.facility.create({
            name: 'Minneapolis',
            station: 618,
            visn: 23
        }).then(function(facility) {
            return db.Sequelize.Promise.all([createTemplate(facility),
                db.facility_message.bulkCreate([{
                    facility_id: facility.id,
                    active: true,
                    message_order: 1,
                    message_text: 'This is the message text for the first message from Minneapolis. We hope you have a great day!',
                    message_headline: 'Minneapolis Message 1 Headline'
                }, {
                    facility_id: facility.id,
                    active: true,
                    message_order: 2,
                    message_text: 'This is the message text for the second message from Minneapolis. We hope you have a great day!',
                    message_headline: 'Minneapolis Message 2 Headline'
                }, {
                    facility_id: facility.id,
                    active: true,
                    message_order: 3,
                    message_text: 'This is the message text for the third message from Minneapolis. We hope you have a great day!',
                    message_headline: 'Minneapolis Message 3 Headline'
                }, {
                    facility_id: facility.id,
                    active: true,
                    message_order: 4,
                    message_text: 'This is the message text for the fourth message from Minneapolis. We hope you have a great day!',
                    message_headline: 'Minneapolis Message 4 Headline'
                }]),
                db.facility_contact.create({
                    facilityId: facility.id,
                    title1: 'Adam Herr',
                    phone: '612-467-4268',
                    email: 'Adam.Herr@va.gov'
                })
            ])
        }),
        db.facility.create({
            name: 'Central Texas (Waco)',
            station: 674,
            visn: 17
        }).then(function(facility) {
            return db.Sequelize.Promise.all([createTemplate(facility),
                db.facility_message.bulkCreate([{
                    facility_id: facility.id,
                    active: true,
                    message_order: 1,
                    message_text: 'This is the message text for the first message from Central Texas (Waco). We hope you have a great day!',
                    message_headline: 'Central Texas (Waco) Message 1 Headline'
                }, {
                    facility_id: facility.id,
                    active: true,
                    message_order: 2,
                    message_text: 'This is the message text for the second message from Central Texas (Waco). We hope you have a great day!',
                    message_headline: 'Central Texas (Waco) Message 2 Headline'
                }, {
                    facility_id: facility.id,
                    active: true,
                    message_order: 3,
                    message_text: 'This is the message text for the third message from Central Texas (Waco). We hope you have a great day!',
                    message_headline: 'Central Texas (Waco) Message 3 Headline'
                }, {
                    facility_id: facility.id,
                    active: true,
                    message_order: 4,
                    message_text: 'This is the message text for the fourth message from Central Texas (Waco). We hope you have a great day!',
                    message_headline: 'Central Texas (Waco) Message 4 Headline'
                }]),
                db.facility_contact.create({
                    facilityId: facility.id,
                    title1: 'Judy Strahan',
                    phone: '254-752-6581',
                    email: 'Judy.Strahan@va.gov'
                })
            ]);
        })
    ]);
};
