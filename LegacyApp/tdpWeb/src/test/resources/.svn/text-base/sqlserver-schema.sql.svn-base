USE [master]
GO
/****** Object:  Database [tdp_web]    Script Date: 05/18/2010 18:04:11 ******/
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'tdp_web')
BEGIN
CREATE DATABASE [tdp_web] ON  PRIMARY 
( NAME = N'tdp_web', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10.MSSQLSERVER\MSSQL\DATA\tdp_web.mdf' , SIZE = 2304KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'tdp_web_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10.MSSQLSERVER\MSSQL\DATA\tdp_web_log.LDF' , SIZE = 576KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
END
GO
ALTER DATABASE [tdp_web] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [tdp_web].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [tdp_web] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [tdp_web] SET ANSI_NULLS OFF
GO
ALTER DATABASE [tdp_web] SET ANSI_PADDING OFF
GO
ALTER DATABASE [tdp_web] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [tdp_web] SET ARITHABORT OFF
GO
ALTER DATABASE [tdp_web] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [tdp_web] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [tdp_web] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [tdp_web] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [tdp_web] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [tdp_web] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [tdp_web] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [tdp_web] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [tdp_web] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [tdp_web] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [tdp_web] SET  ENABLE_BROKER
GO
ALTER DATABASE [tdp_web] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [tdp_web] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [tdp_web] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [tdp_web] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [tdp_web] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [tdp_web] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [tdp_web] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [tdp_web] SET  READ_WRITE
GO
ALTER DATABASE [tdp_web] SET RECOVERY FULL
GO
ALTER DATABASE [tdp_web] SET  MULTI_USER
GO
ALTER DATABASE [tdp_web] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [tdp_web] SET DB_CHAINING OFF
GO
EXEC sys.sp_db_vardecimal_storage_format N'tdp_web', N'ON'
GO
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
/****** Object:  User [tdp_user]    Script Date: 05/18/2010 18:04:12 ******/
IF  EXISTS (SELECT * FROM sys.database_principals WHERE name = N'tdp_user')
DROP USER [tdp_user]
GO
/****** Object:  User [tdp_user]    Script Date: 05/18/2010 18:04:12 ******/
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = N'tdp_user')
CREATE USER [tdp_user] FOR LOGIN [tdp_user] WITH DEFAULT_SCHEMA=[dbo]
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
	[definition] [varchar](255) NOT NULL,
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
	[document_id] [nchar](10) NOT NULL,
	[patient_id] [nchar](10) NOT NULL,
	[first_name] [varchar](50) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[ssn] [nchar](9) NOT NULL,
	[dob] [date] NOT NULL,
	[med_unit_id] [int] NOT NULL,
 CONSTRAINT [PK_document_event] PRIMARY KEY CLUSTERED 
(
	[document_event_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
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