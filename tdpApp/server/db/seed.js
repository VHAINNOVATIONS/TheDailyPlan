'use strict';

module.exports = function(db) {
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
                    message_text: 'This is the message text for the second message from Biloxi. We hope you have a great day!',
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
                }])
            ]);
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
                }])
            ]);
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
                }])
            ]);
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
                }])
            ]);
        })
    ]);

    function createTemplate(facility) {
        //Create Default Template
        return db.template.create({
            facility_id: facility.id,
            template_name: 'Default',
            template_description: 'Default Template',
            active: true
        }).then(function(template) {
            console.log('templateID:', template.id);
            return template.id;
        }).then(function(templateID) {
            return db.Sequelize.Promise.all([
                db.panel_type.create({
                    facility_id: facility.id,
                    title: 'Allergies',
                    directive: 'dt-simple-grid',
                    service: 'Allergy',
                    scope_variable: 'patient',
                    minSizeX: 2,
                    minSizeY: 1,
                    mandatory: false,
                    enable_options: false
                }).then(function(pt) {
                    // Then Create the Panel Second
                    return db.panel.create({
                        name: 'Allergies Default',
                        panel_type_id: pt.id,
                        sizeX: 2,
                        sizeY: 1
                    }).then(function(p) {
                        // Then Create the Template_Layout Second
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });
                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
                    title: 'Immunizations',
                    directive: 'dt-simple-grid',
                    service: 'Immunizations',
                    scope_variable: 'patient',
                    minSizeX: 2,
                    minSizeY: 1,
                    mandatory: false,
                    enable_options: false
                }).then(function(pt) {
                    // Then Create the Panel Second
                    return db.panel.create({
                        name: 'Immunizations Default',
                        panel_type_id: pt.id,
                        sizeX: 2,
                        sizeY: 1
                    }).then(function(p) {
                        // Then Create the Template_Layout Second
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });

                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
                    title: 'Vitals',
                    directive: 'dt-vitals',
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
                        // Then Create the Template_Layout Second
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });

                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
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
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });

                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
                    title: 'Lab Orders',
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
                        name: 'Lab Orders Default',
                        panel_type_id: pt.id,
                        sizeX: 3,
                        sizeY: 2
                    }).then(function(p) {
                        // Then Create the Template_Layout Second
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });

                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
                    title: 'Pending Procedures',
                    directive: 'dt-simple-grid',
                    service: 'Procedures',
                    scope_variable: 'patient',
                    minSizeX: 2,
                    minSizeY: 2,
                    mandatory: false,
                    enable_options: false
                }).then(function(pt) {
                    // Then Create the Panel Second
                    return db.panel.create({
                        name: 'Pending Procedures Default',
                        panel_type_id: pt.id,
                        sizeX: 3,
                        sizeY: 2
                    }).then(function(p) {
                        // Then Create the Template_Layout Second
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });

                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
                    title: 'Radiology Reports',
                    directive: 'dt-radiology-reports',
                    scope_variable: 'patient',
                    minSizeX: 2,
                    minSizeY: 2,
                    mandatory: true,
                    enable_options: false
                }).then(function(pt) {
                    // Then Create the Panel Second
                    return db.panel.create({
                        name: 'Radiology Reports Default',
                        panel_type_id: pt.id,
                        sizeX: 3,
                        sizeY: 2
                    }).then(function(p) {
                        // Then Create the Template_Layout Second
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });

                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
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
                        console.log('templateID:', templateID);
                        // Then Create the Template_Layout Second
                        return db.Sequelize.Promise.all([
                            db.template_layout.create({
                                template_id: templateID,
                                panel_id: p.id,
                                panel_order: p.id
                            }).then(function(tl) {
                                console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                            }),
                            // Now Create the Settings and Details
                            db.panel_setting.create({
                                panel_type_id: pt.id,
                                setting_type: 2,
                                setting_name: 'Number of Future Days',
                                setting_value: '30'
                            }).then(function(ps) {
                                //Then Create the Details
                                return db.panel_detail.create({
                                    panel_id: p.id,
                                    panel_setting_id: ps.id
                                }).then(function(tl) {
                                    console.log('<<<<<<<Panel Setting & Detail Record Created.>>>>>>>')
                                });
                            })
                        ]);
                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
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
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });
                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
                    title: 'Inpatient Medications',
                    directive: 'dt-simple-grid',
                    service: 'InpatientMedication',
                    scope_variable: 'patient',
                    minSizeX: 2,
                    minSizeY: 2,
                    mandatory: true,
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
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });
                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
                    title: 'Outpatient Medications',
                    directive: 'dt-simple-grid',
                    service: 'OutpatientMedication',
                    scope_variable: 'patient',
                    minSizeX: 2,
                    minSizeY: 2,
                    mandatory: true,
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
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });
                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
                    title: 'Radiology Orders',
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
                        name: 'Radiology Orders Default',
                        panel_type_id: pt.id,
                        sizeX: 3,
                        sizeY: 2
                    }).then(function(p) {
                        // Then Create the Template_Layout Second
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });

                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
                    title: 'Nursing Orders',
                    directive: 'dt-simple-grid',
                    service: 'NursingOrders',
                    scope_variable: 'patient',
                    minSizeX: 2,
                    minSizeY: 2,
                    mandatory: false,
                    enable_options: false
                }).then(function(pt) {
                    // Then Create the Panel Second
                    return db.panel.create({
                        name: 'Nursing Orders Default',
                        panel_type_id: pt.id,
                        sizeX: 3,
                        sizeY: 2
                    }).then(function(p) {
                        // Then Create the Template_Layout Second
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });

                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
                    title: 'Labs',
                    directive: 'dt-labs',
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
                        console.log('templateID:', templateID);
                        return db.Sequelize.Promise.all([
                            // Then Create the Template_Layout Second
                            db.template_layout.create({
                                template_id: templateID,
                                panel_id: p.id,
                                panel_order: p.id
                            }).then(function(tl) {
                                console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                            }),
                            // Now Create the Settings and Details
                            db.panel_setting.create({
                                panel_type_id: pt.id,
                                setting_type: 1,
                                setting_name: 'Tests',
                                setting_value: 'MAGNESIUM'
                            }).then(function(ps) {
                                //Then Create the Details
                                return db.panel_detail.create({
                                    panel_id: p.id,
                                    panel_setting_id: ps.id
                                }).then(function(tl) {
                                    console.log('<<<<<<<Panel Setting & Detail Record Created.>>>>>>>')
                                });
                            }),
                            // Now Create the Settings and Details
                            db.panel_setting.create({
                                panel_type_id: pt.id,
                                setting_type: 1,
                                setting_name: 'Tests',
                                setting_value: 'POTASSIUM'
                            }).then(function(ps) {
                                //Then Create the Details
                                return db.panel_detail.create({
                                    panel_id: p.id,
                                    panel_setting_id: ps.id
                                }).then(function(tl) {
                                    console.log('<<<<<<<Panel Setting & Detail Record Created.>>>>>>>')
                                });
                            }),
                            // Now Create the Settings and Details
                            db.panel_setting.create({
                                panel_type_id: pt.id,
                                setting_type: 1,
                                setting_name: 'Tests',
                                setting_value: 'HDL'
                            }).then(function(ps) {
                                //Then Create the Details
                                return db.panel_detail.create({
                                    panel_id: p.id,
                                    panel_setting_id: ps.id
                                }).then(function(tl) {
                                    console.log('<<<<<<<Panel Setting & Detail Record Created.>>>>>>>')
                                });
                            }),
                            // Now Create the Settings and Details
                            db.panel_setting.create({
                                panel_type_id: pt.id,
                                setting_type: 1,
                                setting_name: 'Tests',
                                setting_value: 'CHOLESTEROL'
                            }).then(function(ps) {
                                //Then Create the Details
                                return db.panel_detail.create({
                                    panel_id: p.id,
                                    panel_setting_id: ps.id
                                }).then(function(tl) {
                                    console.log('<<<<<<<Panel Setting & Detail Record Created.>>>>>>>')
                                });
                            }),
                            // Now Create just a Settings
                            db.panel_setting.create({
                                panel_type_id: pt.id,
                                setting_type: 1,
                                setting_name: 'Tests',
                                setting_value: 'TRIGLYCERIDE'
                            }).then(function(ps) {
                                //Then Create the Details
                                return db.panel_detail.create({
                                    panel_id: p.id,
                                    panel_setting_id: ps.id
                                }).then(function(tl) {
                                    console.log('<<<<<<<Panel Setting & Detail Record Created.>>>>>>>')
                                });
                            })
                        ])
                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
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
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });

                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
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
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });

                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
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
                                template_id: templateID,
                                panel_id: p.id,
                                panel_order: p.id
                            }),
                            db.panel_setting.create({
                                panel_type_id: pt.id,
                                setting_type: 2,
                                setting_name: 'Number of Back Days',
                                setting_value: '30'
                            }).then(function(ps) {
                                return db.panel_detail.create({
                                    panel_id: p.id,
                                    panel_setting_id: ps.id
                                })
                            })
                        ]);
                    });
                }),
                db.panel_type.create({
                    facility_id: facility.id,
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
                        // Then Create the Template_Layout Second
                        console.log('templateID:', templateID);
                        return db.template_layout.create({
                            template_id: templateID,
                            panel_id: p.id,
                            panel_order: p.id
                        }).then(function(tl) {
                            console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                        });
                    });
                })].concat(['1', '2', '3'].map(function(index) {
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
                        // Then Create the Panel Second
                        return db.panel.create({
                            name: 'Free Text Default',
                            panel_type_id: pt.id,
                            sizeX: 2,
                            sizeY: 2
                        }).then(function(p) {
                            console.log('templateID:', templateID);
                            return db.Sequelize.Promise.all([
                                // Then Create the Template_Layout Second
                                db.template_layout.create({
                                    template_id: templateID,
                                    panel_id: p.id,
                                    panel_order: p.id
                                }).then(function(tl) {
                                    console.log('<<<<<<<Template Layout Records Created.>>>>>>>')
                                }),
                                // Now Create the Settings and Details
                                db.panel_setting.create({
                                      panel_type_id: pt.id,
                                      setting_type: 3,
                                      setting_name: 'Title',
                                      setting_value: ''
                                }).then(function(ps) {
                                    //Then Create the Details
                                    return db.panel_detail.create({
                                        panel_id: p.id,
                                        panel_setting_id: ps.id
                                    })
                                }).then(function() {
                                    return db.panel_setting.create({
                                        panel_type_id: pt.id,
                                        setting_type: 4,
                                        setting_name: 'Content',
                                        setting_value: ''
                                    });
                                }).then(function(ps) {
                                    return db.panel_detail.create({
                                        panel_id: p.id,
                                        panel_setting_id: ps.id
                                    })
                                }).then(function() {
                                    console.log('Free text settings are created<<<<<<<.>>>>>>>')
                                })
                            ]);
                        });
                    }).then(function() {
                        console.log('%s Free Text %s is created', facility.name, index);
                    });
            }))
        )}).then(function() {
          console.log('%s is created.', facility.name);
        });
        //endforloop
    }
};
