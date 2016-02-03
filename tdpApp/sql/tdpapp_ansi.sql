SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

CREATE DATABASE IF NOT EXISTS `tdpapp` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE tdpapp;

CREATE TABLE IF NOT EXISTS "facility" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "name" varchar(50) NOT NULL,
  "station" int(11) NOT NULL,
  "visn" int(11) DEFAULT NULL,
  "server" varchar(45) DEFAULT NULL,
  "createdAt" datetime DEFAULT NULL,
  "updatedAt" datetime DEFAULT NULL,
  PRIMARY KEY ("id")
) AUTO_INCREMENT=5 ;

INSERT INTO `facility` (`id`, `name`, `station`, `visn`, `server`, `createdAt`, `updatedAt`) VALUES
(1, 'Biloxi', 520, 16, NULL, NULL, NULL),
(2, 'Madison', 607, 12, NULL, NULL, NULL),
(3, 'Minneapolis', 618, 23, NULL, NULL, NULL),
(4, 'Central Texas (Waco)', 674, 17, NULL, NULL, NULL);

CREATE TABLE IF NOT EXISTS "facility_message" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "facility_id" int(11) NOT NULL,
  "active" tinyint(1) NOT NULL DEFAULT '1',
  "message_order" int(11) NOT NULL,
  "message_text" varchar(200) NOT NULL,
  "message_headline" varchar(50) NOT NULL,
  "createdAt" datetime DEFAULT NULL,
  "updatedAt" datetime DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "facility_message_idx_facility_id" ("facility_id")
) AUTO_INCREMENT=30 ;

INSERT INTO `facility_message` (`id`, `facility_id`, `active`, `message_order`, `message_text`, `message_headline`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, 'This is the message text for the first message from Biloxi. We hope you have a great day!', 'Biloxi Message 1 Headline', NULL, NULL),
(2, 2, 1, 1, 'This is the message text for the first message from Madison. We hope you have a great day!', 'Madison Message 1 Headline', NULL, NULL),
(3, 3, 1, 1, 'This is the message text for the first message from Minneapolis. We hope you have a great day!', 'Minneapolis Message 1 Headline', NULL, NULL),
(4, 4, 1, 1, 'This is the message text for the first message from Central Texas (Waco). We hope you have a great day!', 'Central Texas (Waco) Message 1 Headline', NULL, NULL),
(8, 1, 1, 2, 'This is the message text for the second message from Biloxi. We hope you have a great day!', 'Biloxi Message 2 Headline', NULL, NULL),
(9, 2, 1, 2, 'This is the message text for the second message from Madison. We hope you have a great day!', 'Madison Message 2 Headline', NULL, NULL),
(10, 3, 1, 2, 'This is the message text for the second message from Minneapolis. We hope you have a great day!', 'Minneapolis Message 2 Headline', NULL, NULL),
(11, 4, 1, 2, 'This is the message text for the second message from Central Texas (Waco). We hope you have a great day!', 'Central Texas (Waco) Message 2 Headline', NULL, NULL),
(15, 1, 1, 3, 'This is the message text for the third message from Biloxi. We hope you have a great day!', 'Biloxi Message 3 Headline', NULL, NULL),
(16, 2, 1, 3, 'This is the message text for the third message from Madison. We hope you have a great day!', 'Madison Message 3 Headline', NULL, NULL),
(17, 3, 1, 3, 'This is the message text for the third message from Minneapolis. We hope you have a great day!', 'Minneapolis Message 3 Headline', NULL, NULL),
(18, 4, 1, 3, 'This is the message text for the third message from Central Texas (Waco). We hope you have a great day!', 'Central Texas (Waco) Message 3 Headline', NULL, NULL),
(22, 1, 1, 4, 'This is the message text for the fourth message from Biloxi. We hope you have a great day!', 'Biloxi Message 4 Headline', NULL, NULL),
(23, 2, 1, 4, 'This is the message text for the fourth message from Madison. We hope you have a great day!', 'Madison Message 4 Headline', NULL, NULL),
(24, 3, 1, 4, 'This is the message text for the fourth message from Minneapolis. We hope you have a great day!', 'Minneapolis Message 4 Headline', NULL, NULL),
(25, 4, 1, 4, 'This is the message text for the fourth message from Central Texas (Waco). We hope you have a great day!', 'Central Texas (Waco) Message 4 Headline', NULL, NULL),
(29, 1, 0, 4, 'test', 'test', NULL, NULL);

CREATE TABLE IF NOT EXISTS "panel" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "panel_type_id" int(11) NOT NULL,
  "location_id" int(11) DEFAULT NULL,
  "description" varchar(100) DEFAULT NULL,
  "sizeX" int(11) DEFAULT NULL,
  "sizeY" int(11) DEFAULT NULL,
  "createdAt" datetime DEFAULT NULL,
  "updatedAt" datetime DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "panel_panel_type_fkey_idx" ("panel_type_id"),
  KEY "panel_idx_name" ("name"),
  KEY "panel_idx_location_id" ("location_id")
) AUTO_INCREMENT=13 ;

INSERT INTO `panel` (`id`, `name`, `panel_type_id`, `location_id`, `description`, `sizeX`, `sizeY`, `createdAt`, `updatedAt`) VALUES
(1, 'Allergies Default', 1, NULL, NULL, 2, 1, NULL, NULL),
(2, 'Immunizations Default', 2, NULL, NULL, 2, 1, NULL, NULL),
(3, 'Problems Default', 3, NULL, NULL, 3, 2, NULL, NULL),
(4, 'Vitals Default', 4, NULL, NULL, 3, 2, NULL, NULL),
(5, 'Diet Orders Default', 5, NULL, NULL, 3, 2, NULL, NULL),
(6, 'Lab Orders Default', 6, NULL, NULL, 3, 2, NULL, NULL),
(7, 'Radiology Reports Default', 7, NULL, NULL, 3, 2, NULL, NULL),
(8, 'Visits Default', 8, NULL, NULL, 3, 2, NULL, NULL),
(9, 'IV Medications Default', 9, NULL, NULL, 3, 2, NULL, NULL),
(10, 'Active Medications Default', 10, NULL, NULL, 3, 2, NULL, NULL),
(11, 'Radiology Orders', 11, NULL, NULL, 3, 2, NULL, NULL),
(12, 'Nursing Orders', 12, NULL, NULL, 3, 2, NULL, NULL);

CREATE TABLE IF NOT EXISTS "panel_detail" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "panel_id" int(11) NOT NULL,
  "panel_setting_id" int(11) NOT NULL,
  "detail_value" varchar(45) DEFAULT NULL,
  "createdAt" datetime DEFAULT NULL,
  "updatedAt" datetime DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "panel_detail_panel_id_fkey_idx" ("panel_id"),
  KEY "panel_detail_panel_setting_id_fkey_idx" ("panel_setting_id")
) AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS "panel_setting" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "panel_type_id" int(11) NOT NULL,
  "setting_type" int(11) NOT NULL,
  "setting_name" varchar(45) NOT NULL,
  "setting_value" varchar(45) NOT NULL,
  "createdAt" datetime DEFAULT NULL,
  "updatedAt" datetime DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "panel_setting_panel_type_fkey_idx" ("panel_type_id")
) AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS "panel_type" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "title" varchar(45) NOT NULL,
  "directive" varchar(45) NOT NULL,
  "scope_variable" varchar(45) NOT NULL,
  "minSizeX" int(11) DEFAULT NULL,
  "minSizeY" int(11) DEFAULT NULL,
  "mandatory" tinyint(1) DEFAULT NULL,
  "createdAt" datetime DEFAULT NULL,
  "updatedAt" datetime DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "panel_type_idx_name" ("title")
) AUTO_INCREMENT=13 ;

INSERT INTO `panel_type` (`id`, `title`, `directive`, `scope_variable`, `minSizeX`, `minSizeY`, `mandatory`, `createdAt`, `updatedAt`) VALUES
(1, 'Allergies', 'dt-allergies', 'patient', 2, 1, 1, NULL, NULL),
(2, 'Immunizations', 'dt-immunizations', 'patient', 2, 1, NULL, NULL, NULL),
(3, 'Problems', 'dt-problems', 'patient', 2, 2, NULL, NULL, NULL),
(4, 'Vitals', 'dt-vitals', 'patient', 2, 2, NULL, NULL, NULL),
(5, 'Diet Orders', 'dt-diet-orders', 'patient', 2, 2, NULL, NULL, NULL),
(6, 'Lab Orders', 'dt-lab-orders', 'patient', 2, 2, 1, NULL, NULL),
(7, 'Radiology Reports', 'dt-radiology-reports', 'patient', 2, 2, NULL, NULL, NULL),
(8, 'Visits', 'dt-visits', 'patient', 2, 2, 1, NULL, NULL),
(9, 'IV Medications', 'dt-iv-meds', 'patient', 2, 2, NULL, NULL, NULL),
(10, 'Active Medications', 'dt-active-meds', 'patient', 2, 2, 1, NULL, NULL),
(11, 'Radiology Orders', 'dt-radiology-orders', 'patient', 2, 2, NULL, NULL, NULL),
(12, 'Nursing Orders', 'dt-nursing-orders', 'patient', 2, 2, NULL, NULL, NULL);

CREATE TABLE IF NOT EXISTS "template" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "template_name" varchar(45) NOT NULL,
  "template_description" varchar(100) DEFAULT NULL,
  "location_id" int(11) DEFAULT NULL,
  "active" tinyint(1) DEFAULT '1',
  "template_owner" int(11) DEFAULT NULL,
  "createdAt" datetime DEFAULT NULL,
  "updatedAt" datetime DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "template_idx_template_name" ("template_name"),
  KEY "template_idx_location_id" ("location_id")
) AUTO_INCREMENT=59 ;

INSERT INTO `template` (`id`, `template_name`, `template_description`, `location_id`, `active`, `template_owner`, `createdAt`, `updatedAt`) VALUES
(1, 'Default', 'Default Template', NULL, 1, NULL, '2016-01-11 07:56:37', NULL);

CREATE TABLE IF NOT EXISTS "template_layout" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "template_id" int(11) NOT NULL,
  "panel_id" int(11) NOT NULL,
  "panel_order" int(11) NOT NULL,
  "optional" tinyint(1) DEFAULT NULL,
  "createdAt" datetime DEFAULT NULL,
  "updatedAt" datetime DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "template_layout_template_id_fkey_idx" ("template_id"),
  KEY "template_layout_panel_id_fkey_idx" ("panel_id")
) AUTO_INCREMENT=13 ;

INSERT INTO `template_layout` (`id`, `template_id`, `panel_id`, `panel_order`, `optional`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, NULL, NULL, NULL),
(2, 1, 2, 2, NULL, NULL, NULL),
(3, 1, 3, 3, NULL, NULL, NULL),
(4, 1, 4, 4, NULL, NULL, NULL),
(5, 1, 5, 5, NULL, NULL, NULL),
(6, 1, 6, 6, NULL, NULL, NULL),
(7, 1, 7, 7, NULL, NULL, NULL),
(8, 1, 8, 8, NULL, NULL, NULL),
(9, 1, 9, 9, NULL, NULL, NULL),
(10, 1, 10, 10, NULL, NULL, NULL),
(11, 1, 11, 11, NULL, NULL, NULL),
(12, 1, 12, 12, NULL, NULL, NULL);


ALTER TABLE `facility_message`
  ADD CONSTRAINT "facility_message_fkey" FOREIGN KEY ("facility_id") REFERENCES "facility" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `panel`
  ADD CONSTRAINT "panel_panel_type_fkey" FOREIGN KEY ("panel_type_id") REFERENCES "panel_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `panel_detail`
  ADD CONSTRAINT "panel_detail_panel_id_fkey" FOREIGN KEY ("panel_id") REFERENCES "panel" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT "panel_detail_panel_setting_id_fkey" FOREIGN KEY ("panel_setting_id") REFERENCES "panel_setting" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `panel_setting`
  ADD CONSTRAINT "panel_setting_panel_type_fkey" FOREIGN KEY ("panel_type_id") REFERENCES "panel_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `template_layout`
  ADD CONSTRAINT "template_layout_panel_id_fkey" FOREIGN KEY ("panel_id") REFERENCES "panel" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT "template_layout_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "template" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
