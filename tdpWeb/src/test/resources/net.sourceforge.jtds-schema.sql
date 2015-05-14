USE [tdp_web]
GO
/****** Object:  ForeignKey [FK_user_role_app_user]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_user_role_app_user]') AND parent_object_id = OBJECT_ID(N'[dbo].[user_role]'))
ALTER TABLE [dbo].[user_role] DROP CONSTRAINT [FK_user_role_app_user]
GO
/****** Object:  ForeignKey [FK_user_role_role]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_user_role_role]') AND parent_object_id = OBJECT_ID(N'[dbo].[user_role]'))
ALTER TABLE [dbo].[user_role] DROP CONSTRAINT [FK_user_role_role]
GO
/****** Object:  ForeignKey [FK_template_components_components]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_template_components_components]') AND parent_object_id = OBJECT_ID(N'[dbo].[template_components]'))
ALTER TABLE [dbo].[template_components] DROP CONSTRAINT [FK_template_components_components]
GO
/****** Object:  ForeignKey [FK_template_components_templates]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_template_components_templates]') AND parent_object_id = OBJECT_ID(N'[dbo].[template_components]'))
ALTER TABLE [dbo].[template_components] DROP CONSTRAINT [FK_template_components_templates]
GO
/****** Object:  ForeignKey [FK_document_event_event_type]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_document_event_event_type]') AND parent_object_id = OBJECT_ID(N'[dbo].[document_event]'))
ALTER TABLE [dbo].[document_event] DROP CONSTRAINT [FK_document_event_event_type]
GO
/****** Object:  ForeignKey [FK_document_event_med_unit]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_document_event_med_unit]') AND parent_object_id = OBJECT_ID(N'[dbo].[document_event]'))
ALTER TABLE [dbo].[document_event] DROP CONSTRAINT [FK_document_event_med_unit]
GO
/****** Object:  Table [dbo].[document_event]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_document_event_event_type]') AND parent_object_id = OBJECT_ID(N'[dbo].[document_event]'))
ALTER TABLE [dbo].[document_event] DROP CONSTRAINT [FK_document_event_event_type]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_document_event_med_unit]') AND parent_object_id = OBJECT_ID(N'[dbo].[document_event]'))
ALTER TABLE [dbo].[document_event] DROP CONSTRAINT [FK_document_event_med_unit]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[document_event]') AND type in (N'U'))
DROP TABLE [dbo].[document_event]
GO
/****** Object:  Table [dbo].[template_components]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_template_components_components]') AND parent_object_id = OBJECT_ID(N'[dbo].[template_components]'))
ALTER TABLE [dbo].[template_components] DROP CONSTRAINT [FK_template_components_components]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_template_components_templates]') AND parent_object_id = OBJECT_ID(N'[dbo].[template_components]'))
ALTER TABLE [dbo].[template_components] DROP CONSTRAINT [FK_template_components_templates]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[template_components]') AND type in (N'U'))
DROP TABLE [dbo].[template_components]
GO
/****** Object:  Table [dbo].[user_role]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_user_role_app_user]') AND parent_object_id = OBJECT_ID(N'[dbo].[user_role]'))
ALTER TABLE [dbo].[user_role] DROP CONSTRAINT [FK_user_role_app_user]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_user_role_role]') AND parent_object_id = OBJECT_ID(N'[dbo].[user_role]'))
ALTER TABLE [dbo].[user_role] DROP CONSTRAINT [FK_user_role_role]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[user_role]') AND type in (N'U'))
DROP TABLE [dbo].[user_role]
GO
/****** Object:  Table [dbo].[templates]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[templates]') AND type in (N'U'))
DROP TABLE [dbo].[templates]
GO
/****** Object:  Table [dbo].[event_type]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[event_type]') AND type in (N'U'))
DROP TABLE [dbo].[event_type]
GO
/****** Object:  Table [dbo].[role]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[role]') AND type in (N'U'))
DROP TABLE [dbo].[role]
GO
/****** Object:  Table [dbo].[app_user]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[app_user]') AND type in (N'U'))
DROP TABLE [dbo].[app_user]
GO
/****** Object:  Table [dbo].[components]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[components]') AND type in (N'U'))
DROP TABLE [dbo].[components]
GO
/****** Object:  Table [dbo].[definition]    Script Date: 05/18/2010 18:04:13 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[definition]') AND type in (N'U'))
DROP TABLE [dbo].[definition]
GO
/****** Object:  Table [dbo].[definition]    Script Date: 05/18/2010 18:04:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[definition]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[definition](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[abbreviation] [varchar](15) NOT NULL,
	[definition] [nvarchar](255) NOT NULL,
	[deleted] [char](1) NULL,
	[status] [varchar](15) NULL,
	[next_refresh] [datetime] NULL,
	[medline_plus_index] [tinyint] NULL,
	[last_update] [timestamp] NULL,
	[updated_by] [varchar] (10) NULL,
 CONSTRAINT [PK_definition] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_definition_abbreviation] ON [dbo].[definition] 
(
	[abbreviation] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[components]    Script Date: 05/18/2010 18:04:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[components]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[components](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[component_name] [varchar](255) NOT NULL,
	[title] [varchar](255) NOT NULL,
	[template] [varchar](MAX) NOT NULL,
	[mandatory] [char](1) NOT NULL,
	[unit] [varchar] (10) NULL,
	[method] [varchar](85) NOT NULL,
	[order_sequence] [int] NULL,
	[has_criteria] [char](1) NOT NULL,
	[criteria] [varchar](512) NULL,
	[component_created_by] [varchar](20) NOT NULL,
	[component_updated_by] [varchar](20) NULL,
	[component_create_date] [timestamp] NOT NULL,
	[component_update_date] [datetime] NULL,
 CONSTRAINT [PK_components] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_components_name] ON [dbo].[components] 
(
	[component_name] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[app_user]    Script Date: 06/30/2010 9:42:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[app_user]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[app_user](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](20) NOT NULL,
	[version] [int] NOT NULL,
	[password] [varchar](50) NULL,
	[first_name] [varchar](50) NULL,
	[last_name] [varchar](50) NULL,
	[duz] [varchar](15) NOT NULL,
	[email] [varchar](50) NULL,
	[account_enabled] [char](1) NULL,
	[account_expired] [char](1) NULL,
	[account_locked] [char](1) NULL,
	[credentials_expired] [char](1) NULL,
	[pref_init_search] [varchar](20) NULL,
	[pref_font_size] [varchar](20) NULL,
	[pref_team] [varchar](20) NULL,
 CONSTRAINT [PK_app_user] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[app_user]') AND name = N'IX_app_user')
CREATE NONCLUSTERED INDEX [IX_app_user] ON [dbo].[app_user] 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_app_user_username] ON [dbo].[app_user] 
(
	[username] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_app_user_duz] ON [dbo].[app_user] 
(
	[duz] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role]    Script Date: 05/18/2010 18:04:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[role]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[role](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](20) NOT NULL,
	[description] [varchar](64) NULL,
 CONSTRAINT [PK_role] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[event_type]    Script Date: 05/18/2010 18:04:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[event_type]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[event_type](
	[event_type_id] [int] IDENTITY(1,1) NOT NULL,
	[code] [char](5) NOT NULL,
	[description] [varchar](50) NULL,
	[status] [nchar](1) NULL,
	[created_by] [varchar](20) NOT NULL,
	[updated_by] [varchar](20) NULL,
	[create_date] [timestamp] NOT NULL,
	[update_date] [datetime] NULL,
 CONSTRAINT [PK_event_type] PRIMARY KEY CLUSTERED 
(
	[event_type_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_event_type_code] ON [dbo].[event_type] 
(
	[code] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[templates]    Script Date: 05/18/2010 18:04:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[templates]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[templates](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[template_name] [varchar](50) NOT NULL,
	[ward] [varchar](25) NULL,
	[description] [varchar](255) NULL,
	[template_created_by] [varchar](20) NOT NULL,
	[template_updated_by] [varchar](20) NULL,
	[template_create_date] [timestamp] NOT NULL,
	[template_update_date] [datetime] NULL,
 CONSTRAINT [PK_templates] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[user_role]    Script Date: 05/18/2010 18:04:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[user_role]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[user_role](
	[user_id] [int] NOT NULL,
	[role_id] [int] NOT NULL,
 CONSTRAINT [PK_user_role] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC,
	[role_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[template_components]    Script Date: 05/18/2010 18:04:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[template_components]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[template_components](
	[template_id] [int] NOT NULL,
	[component_id] [int] NOT NULL,
	[priority] [int] NOT NULL,
 CONSTRAINT [PK_template_components] PRIMARY KEY CLUSTERED 
(
	[template_id] ASC,
	[component_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[document_event]    Script Date: 05/18/2010 18:04:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[document_event]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[document_event](
	[document_event_id] [int] IDENTITY(1,1) NOT NULL,
	[event_type_id] [int] NOT NULL,
	[event_date] [datetime] NOT NULL,
	[document_id] [int] NOT NULL,
	[patient_id] [nchar](10) NOT NULL,
	[first_name] [varchar](50) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[ssn] [nchar](11) NOT NULL,
	[dob] [date] NOT NULL,
	[med_unit_id] [int] NOT NULL,
	[event_updated_by] [varchar](20) NOT NULL,
	[event_update_date] [datetime] NULL,
	[event_target_key] [varchar](50) NULL,
 CONSTRAINT [PK_document_event] PRIMARY KEY CLUSTERED 
(
	[document_event_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
CREATE NONCLUSTERED INDEX [IX_document_event_patient_id] ON [dbo].[document_event] 
(
	[patient_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_document_event_document_id] ON [dbo].[document_event] 
(
	[document_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[testimonials]    Script Date: 07/03/2010 18:04:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[testimonials]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[testimonials](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](50) NOT NULL,
	[quote] [varchar] (150) NOT NULL,
	[testimonial] [varchar](512) NOT NULL,
	[image_link] [varchar] (150) NULL,
	[created_by] [varchar](20) NOT NULL,
	[updated_by] [varchar](20) NULL,
	[create_date] [timestamp] NOT NULL,
	[update_date] [datetime] NULL,
 CONSTRAINT [PK_testimonials] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
--
-- Create a table to hold the unique report sequence values
-- This table defines a single identity column
--
if object_id('sequence') is not null
drop table [sequence]
go

create table dbo.[sequence]
(
sequenceid int identity(1,1) not null
)
go

/****** Object:  ForeignKey [FK_user_role_app_user]    Script Date: 05/18/2010 18:04:13 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_user_role_app_user]') AND parent_object_id = OBJECT_ID(N'[dbo].[user_role]'))
ALTER TABLE [dbo].[user_role]  WITH CHECK ADD  CONSTRAINT [FK_user_role_app_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[app_user] ([id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_user_role_app_user]') AND parent_object_id = OBJECT_ID(N'[dbo].[user_role]'))
ALTER TABLE [dbo].[user_role] CHECK CONSTRAINT [FK_user_role_app_user]
GO
/****** Object:  ForeignKey [FK_user_role_role]    Script Date: 05/18/2010 18:04:13 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_user_role_role]') AND parent_object_id = OBJECT_ID(N'[dbo].[user_role]'))
ALTER TABLE [dbo].[user_role]  WITH CHECK ADD  CONSTRAINT [FK_user_role_role] FOREIGN KEY([role_id])
REFERENCES [dbo].[role] ([id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_user_role_role]') AND parent_object_id = OBJECT_ID(N'[dbo].[user_role]'))
ALTER TABLE [dbo].[user_role] CHECK CONSTRAINT [FK_user_role_role]
GO
/****** Object:  ForeignKey [FK_template_components_components]    Script Date: 05/18/2010 18:04:13 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_template_components_components]') AND parent_object_id = OBJECT_ID(N'[dbo].[template_components]'))
ALTER TABLE [dbo].[template_components]  WITH CHECK ADD  CONSTRAINT [FK_template_components_components] FOREIGN KEY([component_id])
REFERENCES [dbo].[components] ([id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_template_components_components]') AND parent_object_id = OBJECT_ID(N'[dbo].[template_components]'))
ALTER TABLE [dbo].[template_components] CHECK CONSTRAINT [FK_template_components_components]
GO
/****** Object:  ForeignKey [FK_template_components_templates]    Script Date: 05/18/2010 18:04:13 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_template_components_templates]') AND parent_object_id = OBJECT_ID(N'[dbo].[template_components]'))
ALTER TABLE [dbo].[template_components]  WITH CHECK ADD  CONSTRAINT [FK_template_components_templates] FOREIGN KEY([template_id])
REFERENCES [dbo].[templates] ([id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_template_components_templates]') AND parent_object_id = OBJECT_ID(N'[dbo].[template_components]'))
ALTER TABLE [dbo].[template_components] CHECK CONSTRAINT [FK_template_components_templates]
GO
/****** Object:  ForeignKey [FK_document_event_event_type]    Script Date: 05/18/2010 18:04:13 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_document_event_event_type]') AND parent_object_id = OBJECT_ID(N'[dbo].[document_event]'))
ALTER TABLE [dbo].[document_event]  WITH CHECK ADD  CONSTRAINT [FK_document_event_event_type] FOREIGN KEY([event_type_id])
REFERENCES [dbo].[event_type] ([event_type_id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_document_event_event_type]') AND parent_object_id = OBJECT_ID(N'[dbo].[document_event]'))
ALTER TABLE [dbo].[document_event] CHECK CONSTRAINT [FK_document_event_event_type]
GO
--
-- This procedure is used for generating the unique value
-- 
if object_id('get_next_sequence') is not null
drop procedure dbo.get_next_sequence
go

create procedure dbo.get_next_sequence @seqno int output
as
set nocount on
--
-- Insert into the dbo.[sequence] table; the identity produced
-- will be passed back to the caller as a handle.
--
-- Processing breakdown
-- 
-- 1. We start a transaction
-- 2. We insert into the table using the ‘default values’ option which triggers
-- the identity column to increment
-- 3. We now rollback the insert. Identity values are kept in SQL Server
-- memory and are not subject to rollback. The rollback is in place to
-- keep the table from growing too large. In effect, the table will always
-- be empty.
-- 4. We use the scope_identity() to grab the produced identity and we pass this
-- value back to the caller.
--
begin tran tran1
insert into dbo.[sequence] default values
rollback -- This prevents the table from growing

-- Send back the generated handle
select @seqno = scope_identity()
go