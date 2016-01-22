--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: facility; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE facility (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    station integer NOT NULL,
    visn integer,
    server character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: facility_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE facility_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: facility_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE facility_id_seq OWNED BY facility.id;


--
-- Name: facility_message; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE facility_message (
    id integer NOT NULL,
    facility_id integer NOT NULL,
    active boolean DEFAULT true NOT NULL,
    message_order integer NOT NULL,
    message_text character varying(255) NOT NULL,
    message_headline character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: facility_message_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE facility_message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: facility_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE facility_message_id_seq OWNED BY facility_message.id;


--
-- Name: panel; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE panel (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    panel_type_id integer NOT NULL,
    location_id integer,
    description character varying(255),
    "sizeX" integer,
    "sizeY" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: panel_detail; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE panel_detail (
    id integer NOT NULL,
    panel_id integer NOT NULL,
    panel_setting_id integer NOT NULL,
    detail_value character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: panel_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE panel_detail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: panel_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE panel_detail_id_seq OWNED BY panel_detail.id;


--
-- Name: panel_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE panel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: panel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE panel_id_seq OWNED BY panel.id;


--
-- Name: panel_setting; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE panel_setting (
    id integer NOT NULL,
    panel_type_id integer NOT NULL,
    setting_type integer NOT NULL,
    setting_name character varying(255) NOT NULL,
    setting_value character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: panel_setting_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE panel_setting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: panel_setting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE panel_setting_id_seq OWNED BY panel_setting.id;


--
-- Name: panel_type; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE panel_type (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    directive character varying(255) NOT NULL,
    scope_variable character varying(255) NOT NULL,
    "minSizeX" integer,
    "minSizeY" integer,
    mandatory boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: panel_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE panel_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: panel_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE panel_type_id_seq OWNED BY panel_type.id;


--
-- Name: template; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE template (
    id integer NOT NULL,
    template_name character varying(255) NOT NULL,
    template_description character varying(255),
    location_id integer,
    active boolean,
    template_owner integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: template_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE template_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: template_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE template_id_seq OWNED BY template.id;


--
-- Name: template_layout; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE template_layout (
    id integer NOT NULL,
    template_id integer NOT NULL,
    panel_id integer NOT NULL,
    panel_order integer NOT NULL,
    optional boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: template_layout_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE template_layout_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: template_layout_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE template_layout_id_seq OWNED BY template_layout.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY facility ALTER COLUMN id SET DEFAULT nextval('facility_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY facility_message ALTER COLUMN id SET DEFAULT nextval('facility_message_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY panel ALTER COLUMN id SET DEFAULT nextval('panel_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY panel_detail ALTER COLUMN id SET DEFAULT nextval('panel_detail_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY panel_setting ALTER COLUMN id SET DEFAULT nextval('panel_setting_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY panel_type ALTER COLUMN id SET DEFAULT nextval('panel_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY template ALTER COLUMN id SET DEFAULT nextval('template_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY template_layout ALTER COLUMN id SET DEFAULT nextval('template_layout_id_seq'::regclass);


--
-- Name: facility_message_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY facility_message
    ADD CONSTRAINT facility_message_pkey PRIMARY KEY (id);


--
-- Name: facility_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY facility
    ADD CONSTRAINT facility_pkey PRIMARY KEY (id);


--
-- Name: panel_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY panel_detail
    ADD CONSTRAINT panel_detail_pkey PRIMARY KEY (id);


--
-- Name: panel_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY panel
    ADD CONSTRAINT panel_pkey PRIMARY KEY (id);


--
-- Name: panel_setting_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY panel_setting
    ADD CONSTRAINT panel_setting_pkey PRIMARY KEY (id);


--
-- Name: panel_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY panel_type
    ADD CONSTRAINT panel_type_pkey PRIMARY KEY (id);


--
-- Name: template_layout_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY template_layout
    ADD CONSTRAINT template_layout_pkey PRIMARY KEY (id);


--
-- Name: template_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY template
    ADD CONSTRAINT template_pkey PRIMARY KEY (id);


--
-- Name: facility_message_facility_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY facility_message
    ADD CONSTRAINT facility_message_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES facility(id);


--
-- Name: panel_detail_panel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY panel_detail
    ADD CONSTRAINT panel_detail_panel_id_fkey FOREIGN KEY (panel_id) REFERENCES panel(id);


--
-- Name: panel_detail_panel_setting_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY panel_detail
    ADD CONSTRAINT panel_detail_panel_setting_id_fkey FOREIGN KEY (panel_setting_id) REFERENCES panel_setting(id);


--
-- Name: panel_panel_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY panel
    ADD CONSTRAINT panel_panel_type_id_fkey FOREIGN KEY (panel_type_id) REFERENCES panel_type(id) ON UPDATE CASCADE;


--
-- Name: panel_setting_panel_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY panel_setting
    ADD CONSTRAINT panel_setting_panel_type_id_fkey FOREIGN KEY (panel_type_id) REFERENCES panel_type(id);


--
-- Name: template_layout_panel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY template_layout
    ADD CONSTRAINT template_layout_panel_id_fkey FOREIGN KEY (panel_id) REFERENCES panel(id) ON UPDATE CASCADE;


--
-- Name: template_layout_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY template_layout
    ADD CONSTRAINT template_layout_template_id_fkey FOREIGN KEY (template_id) REFERENCES template(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

