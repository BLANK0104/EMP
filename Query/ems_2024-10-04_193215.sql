--
-- PostgreSQL database dump
--

-- Dumped from database version 17rc1
-- Dumped by pg_dump version 17rc1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: new_event_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.new_event_status AS ENUM (
    'Pending',
    'Rejected',
    'Approved',
    'Modified',
    'Draft'
);


ALTER TYPE public.new_event_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_development_club; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.app_development_club (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.app_development_club OWNER TO postgres;

--
-- Name: app_development_club_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.app_development_club_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.app_development_club_id_seq OWNER TO postgres;

--
-- Name: app_development_club_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.app_development_club_id_seq OWNED BY public.app_development_club.id;


--
-- Name: atrangi_club; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.atrangi_club (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.atrangi_club OWNER TO postgres;

--
-- Name: atrangi_club_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.atrangi_club_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.atrangi_club_id_seq OWNER TO postgres;

--
-- Name: atrangi_club_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.atrangi_club_id_seq OWNED BY public.atrangi_club.id;


--
-- Name: clubs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clubs (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    logo text,
    faculty_incharge jsonb NOT NULL,
    slogan character varying(255),
    featured_event jsonb NOT NULL,
    objectives text[],
    team_members jsonb
);


ALTER TABLE public.clubs OWNER TO postgres;

--
-- Name: clubs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clubs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clubs_id_seq OWNER TO postgres;

--
-- Name: clubs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clubs_id_seq OWNED BY public.clubs.id;


--
-- Name: coding_club; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coding_club (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.coding_club OWNER TO postgres;

--
-- Name: coding_club_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coding_club_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coding_club_id_seq OWNER TO postgres;

--
-- Name: coding_club_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coding_club_id_seq OWNED BY public.coding_club.id;


--
-- Name: competitive_preparation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competitive_preparation (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.competitive_preparation OWNER TO postgres;

--
-- Name: competitive_preparation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.competitive_preparation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.competitive_preparation_id_seq OWNER TO postgres;

--
-- Name: competitive_preparation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.competitive_preparation_id_seq OWNED BY public.competitive_preparation.id;


--
-- Name: computer_society_of_india; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.computer_society_of_india (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.computer_society_of_india OWNER TO postgres;

--
-- Name: computer_society_of_india_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.computer_society_of_india_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.computer_society_of_india_id_seq OWNER TO postgres;

--
-- Name: computer_society_of_india_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.computer_society_of_india_id_seq OWNED BY public.computer_society_of_india.id;


--
-- Name: crs_ilc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crs_ilc (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.crs_ilc OWNER TO postgres;

--
-- Name: crs_ilc_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.crs_ilc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.crs_ilc_id_seq OWNER TO postgres;

--
-- Name: crs_ilc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.crs_ilc_id_seq OWNED BY public.crs_ilc.id;


--
-- Name: cultural_activity_forum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cultural_activity_forum (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.cultural_activity_forum OWNER TO postgres;

--
-- Name: cultural_activity_forum_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cultural_activity_forum_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cultural_activity_forum_id_seq OWNER TO postgres;

--
-- Name: cultural_activity_forum_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cultural_activity_forum_id_seq OWNED BY public.cultural_activity_forum.id;


--
-- Name: eoso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eoso (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.eoso OWNER TO postgres;

--
-- Name: eoso_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eoso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.eoso_id_seq OWNER TO postgres;

--
-- Name: eoso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eoso_id_seq OWNED BY public.eoso.id;


--
-- Name: event_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_details (
    id integer NOT NULL,
    event_id integer,
    event_dates jsonb NOT NULL,
    school_audience jsonb NOT NULL,
    audience integer NOT NULL,
    clubs text[],
    resources text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    eventtype character varying[] DEFAULT '{}'::character varying[],
    objectives character varying[] DEFAULT '{}'::character varying[],
    title text,
    description text,
    guests jsonb,
    registration text
);


ALTER TABLE public.event_details OWNER TO postgres;

--
-- Name: event_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_details_id_seq OWNER TO postgres;

--
-- Name: event_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_details_id_seq OWNED BY public.event_details.id;


--
-- Name: eventapprovals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eventapprovals (
    id integer NOT NULL,
    event_id integer NOT NULL,
    approver_id integer NOT NULL,
    status public.new_event_status DEFAULT 'Pending'::public.new_event_status,
    reason text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.eventapprovals OWNER TO postgres;

--
-- Name: eventapprovals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eventapprovals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.eventapprovals_id_seq OWNER TO postgres;

--
-- Name: eventapprovals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eventapprovals_id_seq OWNED BY public.eventapprovals.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    created_by integer NOT NULL,
    status public.new_event_status DEFAULT 'Pending'::public.new_event_status,
    current_approver integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: ieee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ieee (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.ieee OWNER TO postgres;

--
-- Name: ieee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ieee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ieee_id_seq OWNER TO postgres;

--
-- Name: ieee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ieee_id_seq OWNED BY public.ieee.id;


--
-- Name: iste; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.iste (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.iste OWNER TO postgres;

--
-- Name: iste_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.iste_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.iste_id_seq OWNER TO postgres;

--
-- Name: iste_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.iste_id_seq OWNED BY public.iste.id;


--
-- Name: learn_tech; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learn_tech (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.learn_tech OWNER TO postgres;

--
-- Name: learn_tech_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.learn_tech_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.learn_tech_id_seq OWNER TO postgres;

--
-- Name: learn_tech_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.learn_tech_id_seq OWNED BY public.learn_tech.id;


--
-- Name: nmmun; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nmmun (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.nmmun OWNER TO postgres;

--
-- Name: nmmun_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nmmun_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nmmun_id_seq OWNER TO postgres;

--
-- Name: nmmun_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nmmun_id_seq OWNED BY public.nmmun.id;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification (
    id integer NOT NULL,
    user_id integer NOT NULL,
    event_id integer NOT NULL,
    notification_type character varying(50),
    message text NOT NULL,
    sent_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notification OWNER TO postgres;

--
-- Name: notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notification_id_seq OWNER TO postgres;

--
-- Name: notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notification_id_seq OWNED BY public.notification.id;


--
-- Name: report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report (
    id integer NOT NULL,
    event_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    title character varying(255),
    event_type character varying(100),
    guest_speakers jsonb,
    start_date date,
    start_time time without time zone,
    end_date date,
    end_time time without time zone,
    objectives text[],
    venue character varying(255),
    resources text,
    audience integer,
    description text,
    photos text[],
    faculty_coordinators jsonb,
    student_coordinators jsonb,
    schools text[],
    branches text[],
    classes text[],
    years text[],
    clubs text
);


ALTER TABLE public.report OWNER TO postgres;

--
-- Name: report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.report_id_seq OWNER TO postgres;

--
-- Name: report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.report_id_seq OWNED BY public.report.id;


--
-- Name: request_assign; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.request_assign (
    created_by integer NOT NULL,
    approver integer NOT NULL
);


ALTER TABLE public.request_assign OWNER TO postgres;

--
-- Name: s4ds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.s4ds (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.s4ds OWNER TO postgres;

--
-- Name: s4ds_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.s4ds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.s4ds_id_seq OWNER TO postgres;

--
-- Name: s4ds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.s4ds_id_seq OWNED BY public.s4ds.id;


--
-- Name: soft_skill_club; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.soft_skill_club (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.soft_skill_club OWNER TO postgres;

--
-- Name: soft_skill_club_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.soft_skill_club_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.soft_skill_club_id_seq OWNER TO postgres;

--
-- Name: soft_skill_club_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.soft_skill_club_id_seq OWNED BY public.soft_skill_club.id;


--
-- Name: team_uas_nmims; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.team_uas_nmims (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.team_uas_nmims OWNER TO postgres;

--
-- Name: team_uas_nmims_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.team_uas_nmims_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.team_uas_nmims_id_seq OWNER TO postgres;

--
-- Name: team_uas_nmims_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.team_uas_nmims_id_seq OWNED BY public.team_uas_nmims.id;


--
-- Name: the_writers_hub; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.the_writers_hub (
    id integer NOT NULL,
    name character varying(100),
    role character varying(100),
    objectives text,
    outcomes text,
    functions text
);


ALTER TABLE public.the_writers_hub OWNER TO postgres;

--
-- Name: the_writers_hub_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.the_writers_hub_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.the_writers_hub_id_seq OWNER TO postgres;

--
-- Name: the_writers_hub_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.the_writers_hub_id_seq OWNED BY public.the_writers_hub.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(100),
    password character varying(128) NOT NULL,
    role character varying(20) NOT NULL,
    coordinator character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: app_development_club id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_development_club ALTER COLUMN id SET DEFAULT nextval('public.app_development_club_id_seq'::regclass);


--
-- Name: atrangi_club id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atrangi_club ALTER COLUMN id SET DEFAULT nextval('public.atrangi_club_id_seq'::regclass);


--
-- Name: clubs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clubs ALTER COLUMN id SET DEFAULT nextval('public.clubs_id_seq'::regclass);


--
-- Name: coding_club id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coding_club ALTER COLUMN id SET DEFAULT nextval('public.coding_club_id_seq'::regclass);


--
-- Name: competitive_preparation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitive_preparation ALTER COLUMN id SET DEFAULT nextval('public.competitive_preparation_id_seq'::regclass);


--
-- Name: computer_society_of_india id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.computer_society_of_india ALTER COLUMN id SET DEFAULT nextval('public.computer_society_of_india_id_seq'::regclass);


--
-- Name: crs_ilc id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crs_ilc ALTER COLUMN id SET DEFAULT nextval('public.crs_ilc_id_seq'::regclass);


--
-- Name: cultural_activity_forum id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cultural_activity_forum ALTER COLUMN id SET DEFAULT nextval('public.cultural_activity_forum_id_seq'::regclass);


--
-- Name: eoso id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eoso ALTER COLUMN id SET DEFAULT nextval('public.eoso_id_seq'::regclass);


--
-- Name: event_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_details ALTER COLUMN id SET DEFAULT nextval('public.event_details_id_seq'::regclass);


--
-- Name: eventapprovals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventapprovals ALTER COLUMN id SET DEFAULT nextval('public.eventapprovals_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: ieee id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ieee ALTER COLUMN id SET DEFAULT nextval('public.ieee_id_seq'::regclass);


--
-- Name: iste id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iste ALTER COLUMN id SET DEFAULT nextval('public.iste_id_seq'::regclass);


--
-- Name: learn_tech id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learn_tech ALTER COLUMN id SET DEFAULT nextval('public.learn_tech_id_seq'::regclass);


--
-- Name: nmmun id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nmmun ALTER COLUMN id SET DEFAULT nextval('public.nmmun_id_seq'::regclass);


--
-- Name: notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification ALTER COLUMN id SET DEFAULT nextval('public.notification_id_seq'::regclass);


--
-- Name: report id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report ALTER COLUMN id SET DEFAULT nextval('public.report_id_seq'::regclass);


--
-- Name: s4ds id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.s4ds ALTER COLUMN id SET DEFAULT nextval('public.s4ds_id_seq'::regclass);


--
-- Name: soft_skill_club id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.soft_skill_club ALTER COLUMN id SET DEFAULT nextval('public.soft_skill_club_id_seq'::regclass);


--
-- Name: team_uas_nmims id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_uas_nmims ALTER COLUMN id SET DEFAULT nextval('public.team_uas_nmims_id_seq'::regclass);


--
-- Name: the_writers_hub id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.the_writers_hub ALTER COLUMN id SET DEFAULT nextval('public.the_writers_hub_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: app_development_club; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.app_development_club (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Mr. Dhiraj Bhise	Faculty In-charge	We give a start to the students who are interested in App Development.	Increased Awareness and Interest in App Development.	Study Jams
2	Meet Maheshwari	Core Committee Member	We have a community which also focuses on helping students with their ongoing project.	Increased Networking Opportunities within and outside the college.	Workshops
3	Owais Bubere	Core Committee Member	To promote and create an environment of App Development in our community.	Enhanced Skill Acquisition	Fun events
4	Yashasvee Wankhede	Core Committee Member	\N	\N	Coding Contest
5	Rushikesh Patil	Core Committee Member	\N	\N	Seminars by industry experts
6	Malay Padshah	Core Committee Member	\N	\N	\N
7	Rehan Singhal	Core Committee Member	\N	\N	\N
8	Sakina Kayyawala	Core Committee Member	\N	\N	\N
9	Aastha Tiwari	Core Committee Member	\N	\N	\N
10	Navya Singh	Core Committee Member	\N	\N	\N
11	Jenish Mehta	Core Committee Member	\N	\N	\N
12	Ronak Vishanvani	Core Committee Member	\N	\N	\N
\.


--
-- Data for Name: atrangi_club; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.atrangi_club (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Prof. Sonia Relan	Faculty In-charge	Foster Creativity and Expression: Encourage students to explore and develop their artistic talents in a supportive environment.	Enhanced Artistic Skills: Students improve their artistic techniques and broaden their creative expression, leading to more sophisticated and varied art pieces.	Workshops and Classes: Host regular workshops and classes in various art forms, such as painting, drawing, sculpture, and digital art, to help students develop new skills and techniques.
2	Mahek Gopani	Core Committee Member	Encourage collaboration among students from different disciplines to create diverse and innovative art projects.	Increased Visibility: Student artworks gain exposure to a wider audience, including peers, faculty, and the local community, enhancing their reputation and recognition.	Art Jams: Facilitate informal art jam sessions where members can create art together in a relaxed environment.
3	Dhruv Singh	Core Committee Member	Showcase Student Art: Organize exhibitions and events to display student artwork to the college community and beyond.	Stronger Community Bonds: A sense of community and camaraderie is fostered among members, resulting in lasting friendships and collaborative projects.	Exhibitions: Organize regular exhibitions in college galleries or public spaces to display student artwork to the college community and beyond.
4	Priyanshi Sinha	Core Committee Member	\N	\N	Collaborative Workshops: Host workshops that encourage students to work together, combining different skills and perspectives to create unique pieces.
5	\N	\N	\N	\N	Art Shows and Festivals: Participate in or host art shows and festivals to give students the opportunity to present their work to diverse audiences.
\.


--
-- Data for Name: clubs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clubs (id, name, logo, faculty_incharge, slogan, featured_event, objectives, team_members) FROM stdin;
\.


--
-- Data for Name: coding_club; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coding_club (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Dr. Suraj Patil	Faculty In-charge	Skill Development: Enhance members programming skills through hands-on coding practice and learning new languages and technologies.	Enhanced Coding Skills: Members improve their proficiency in various programming languages and technologies through practice and learning.	Conducting Technical hands-on sessions.
2	Prof. Praveen Landge	Faculty In-charge	Learning Resources: Provide access to educational resources, such as tutorials, coding challenges, and guest speakers from the industry.	Collaborative Experience: Members gain experience working in teams, learning to communicate effectively and manage collaborative tasks.	Conducting Programming Contests.
3	Jay Patel	Team Lead	Networking: Create opportunities for members to connect with peers, mentors, and professionals in the tech industry.	Networking Opportunities: Members connect with peers, mentors, and professionals, which can lead to internships, job opportunities, or collaborations.	\N
4	Srikar Molahalli	Team Lead	Problem Solving: Work on practical problems and coding challenges to enhance critical thinking and problem-solving skills.	Problem-Solving Abilities: Members develop stronger problem-solving and critical-thinking skills by tackling coding challenges and real-world problems.	\N
5	Yashasvee Wankhade	co-Lead	\N	\N	\N
6	Deshna Sancheti	co-Lead	\N	\N	\N
7	Tanishq Nandwana	Event Operation lead	\N	\N	\N
8	Divyanshu Kumbe	Marketing lead	\N	\N	\N
9	Krish Prajapati	Public Relations lead	\N	\N	\N
10	Vyom Adhyaru	Creative Lead	\N	\N	\N
11	Dhyani Shah	Documentation Lead	\N	\N	\N
12	Vedant Bhatt	Quantitative Analytics	\N	\N	\N
13	Utkarsh	Competitive Coding	\N	\N	\N
14	Laxita Jain	Web Development	\N	\N	\N
15	Niti Sharma	AI/ML	\N	\N	\N
\.


--
-- Data for Name: competitive_preparation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competitive_preparation (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Dr. Amit Pandit	Faculty In-charge	Identification of students appearing for GPAT examination	Interactive sessions were conducted by faculties to discuss about the exam.	Identification of students interested in appearing for GPAT Examination.
2	Uday Patil	Core Committee Member	Guiding them regarding examination preparation and exam form filling	Seminar was organised by the club in association with external agency named “GPAT Discussion Center”	Arranging the seminars to discuss about plan of preparation 
3	\N	\N	Arranging external agencies seminars to motivate interested students for GPAT	Assistance was provided by faculty for resolving the doubts related to exam preparation and application form filling.	Inviting external agencies to organize seminars to motivate students
4	\N	\N	\N	\N	Conduct monthly meetings to take updates on examination preparation.
\.


--
-- Data for Name: computer_society_of_india; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.computer_society_of_india (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Dr. Mayank Sohani	Faculty In-charge	Promote IT Education and Knowledge: To enhance the quality and scope of IT education and ensure professionals stay updated with emerging technologies.	Enhanced IT Education: Improved IT education standards and updated knowledge among professionals, evidenced by increased participation and positive feedback from educational events.	Organizing Events: Hosting seminars, workshops, and training programs to disseminate knowledge and foster professional development.
2	Prof. Piyush Kumar Soni	Faculty In-charge	Professional Development: To provide opportunities for career growth and skill enhancement for IT professionals through various programs and resources.	Increased Professional Skills: Better career advancement and skill enhancement, as reflected in the successful completion of certification programs and career growth among members.	Networking and Collaboration: Creating forums for networking among IT professionals and fostering collaborations between industry, and academia.
3	Gargi Jain 	Core Committee Member	Enhance IT Awareness: To raise awareness about the role and impact of IT on society and various sectors.	Greater IT Awareness: Enhanced students and public understanding of IT’s impact, supported by outreach efforts and media coverage.	Organizing Competitions and Hackathons: Hosting coding competitions, hackathons, and innovation challenges to stimulate creativity, problem-solving, and practical skills among participants.
4	Meet Maheshwari	Core Committee Member	\N	\N	\N
5	Vansh Julka	Core Committee Member	\N	\N	\N
6	Ashish Neelkanth	Core Committee Member	\N	\N	\N
7	Abhishek Pal	Core Committee Member	\N	\N	\N
8	Owais Burbere	Core Committee Member	\N	\N	\N
9	Vishwa Bhalodiya	Core Committee Member	\N	\N	\N
\.


--
-- Data for Name: crs_ilc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.crs_ilc (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Dr. Sankha Bhattacharya	Faculty In-charge	Providing platforms such as conferences, workshops, and publications for scientists, researchers, and industry professionals to share their findings and innovations.	Strengthened collaborations and networks among scientists, researchers, and industry professionals, leading to new partnerships, joint ventures, and multidisciplinary projects.	Facilitating Knowledge Exchange
2	Sarthak Khamitkar	Core Committee Member	Expanding the reach of the society by establishing chapters and networks in different regions to address local challenges and opportunities in controlled release.	Promotion of sustainable practices by developing eco-friendly controlled-release products that contribute to environmental conservation and resource management.	Motivating Budding Researches
3	Khushi Gupta	Core Committee Member	Building partnerships and collaborations among academia, industry, and government organizations to advance the field of controlled release.	Successful integration of knowledge and techniques from various scientific disciplines, leading to holistic and comprehensive advancements in controlled release systems.	Organizing Conferences and Events 
4	Harsh Tiwari	Core Committee Member	\N	\N	Awareness about Novel Research
5	Rupesh More	Core Committee Member	\N	\N	\N
6	Sourav chaudhari	Core Committee Member	\N	\N	\N
7	Janhvi Borkar	Core Committee Member	\N	\N	\N
8	Aditi Samdani	Core Committee Member	\N	\N	\N
9	Atharva Kurkute	Core Committee Member	\N	\N	\N
10	Sarbani Roy	Core Committee Member	\N	\N	\N
11	Abhiram Patil	Core Committee Member	\N	\N	\N
12	Shivika Gupta	Core Committee Member	\N	\N	\N
13	Bhushan Mahajan	Core Committee Member	\N	\N	\N
14	Tanvi Maheshwari	Core Committee Member	\N	\N	\N
15	Rutuja More	Core Committee Member	\N	\N	\N
16	Rahul Anand	Core Committee Member	\N	\N	\N
\.


--
-- Data for Name: cultural_activity_forum; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cultural_activity_forum (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Dr. Mahendra Prajapati	Faculty In-charge	To encourage the students to join various committees under the forum.	Personal growth and development of various skills in students.	Identification and planning for the event.
2	Dr. Amit Pandit	Faculty In-charge	To provide opportunities for the students to participate in activities as an extension of the academic activities.	Leadership, Teamwork and Time Management qualities buildup in students.	Allocating and managing funds for various activities and requirements
3	Dr. Anitha Kuttiapyan	Faculty In-charge	To plan and organize various cultural activities in an academic year as per the Academic Calendar.	Relief from academic stress and promotion mental well-being of students.	Formation of the organizing committee for the events.
4	Durvaa Desai	Core Committee Member	To increase the cordial relations between students and faculty.	Networking and social Connections buildup abilities in students.	Getting all the prior permissions to ensure the smooth conduction of events.
5	Shrushti Samdadiya	Core Committee Member	To inculcate good governance and develop skills through teamwork and organizing \n various activities.	Discovering new passion and interests of students.	Marketing and publicity of the event on various platforms.
6	Krisha Shah	Core Committee Member	\N	\N	To identify sponsors, connect with them, negotiation and getting the sponsorship.
7	\N	\N	\N	\N	Engaging with students and faculty to encourage participation.
8	\N	\N	\N	\N	To plan the Pre-events for the Protsahan college fest.
9	\N	\N	\N	\N	Ensuring sound systems, stage and lighting, and other technical aspects are functioning.
10	\N	\N	\N	\N	Conducting cultural competitions like dance competitions, singing, competitions, music band competions and other cultural performances.
11	\N	\N	\N	\N	Arrange all the logistics requirement.
12	\N	\N	\N	\N	Documenting the event through photos, videos, and reports for future \nreference.
\.


--
-- Data for Name: eoso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.eoso (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Dr. Payal Dande	Faculty In-charge	Spreading smiles especially to the other sections of the society	Educational Support: We provide resources and support to students of ashram schools to enhance learning experiences and achieve their learning outcome.	Seek approvals from managements to arrange pick up and drop facilities
2	Mahi Sahu	Core Committee Member	Uplifting the society by educating underprivileged students	Cultural Events: We organize events, celebrate birthdays and other cultural occasions like Ganeshutsav, diwali, holi and Christmas with ashram school students to create a sense of equality and togetherness.	Event planning and coordination
3	Swaraj Borkar	Core Committee Member	Strengthening the society by raising donations to meet basic needs	Health and Wellness Programs: We implement initiatives like hygiene camps and cleanliness drives, blood donation camps to improve the health and well-being of school children.	Content Creation for Social Media advocacy
4	Varsha Kumari	Core Committee Member	\N	Environmental Projects: We promote sustainability and ecological awareness by running various activities like (Say No to single use plastic, Best out of waste, Recycle, reuse and reduce, bags out of old cloths, plantation)  within school communities.	Cultural and Social Integration
5	Hanusha Sharma	Core Committee Member	\N	Providing basic needs and emergency help: We raise funds for any health or similar emergency and to provide basic needs, facilities and equipment which help in growth of the other sections of society	Preparing real-time reports and articles for newspaper clippings of events and activities
6	Amrutha Pillai	Core Committee Member	\N	\N	Fundraising and maintenance of donation accounts
7	Mita Tamhankar	Core Committee Member	\N	\N	\N
8	Avneesh Taneja	Core Committee Member	\N	\N	\N
9	Harsh Jain	Core Committee Member	\N	\N	\N
10	Yuvraj Alandikar	Core Committee Member	\N	\N	\N
11	Sanhita Sahane	Core Committee Member	\N	\N	\N
12	Yash Shah	Core Committee Member	\N	\N	\N
\.


--
-- Data for Name: event_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_details (id, event_id, event_dates, school_audience, audience, clubs, resources, created_at, updated_at, eventtype, objectives, title, description, guests, registration) FROM stdin;
12	15	[{"date": "2024-11-13", "venues": ["A-Wing"], "end_time": "00:49", "start_time": "22:45"}]	{"year": ["1st Year"], "class": ["AI/ML"], "branch": ["BTech"], "school": ["MPSTME"]}	299	{}	"g"	2024-09-30 18:46:12.972715	2024-09-30 18:46:12.972715	{"Freshers Party"}	{h,h,h}	event 1(Reject)	good	[{"name": "g", "designation": "g"}]	\N
13	16	[{"date": "2024-09-30", "venues": ["Lab", "LR - 1", "LR - 4", "LR - 5", "LR - 2", "LR - 3", "LR - 7", "LR - 10", "LR - 11", "LR - 8", "LR - 9"], "end_time": "01:57", "start_time": "01:57"}, {"date": "2024-10-03", "venues": ["Music Room"], "end_time": "19:03", "start_time": "00:58"}]	{"year": ["1st Year", "3rd Year"], "class": ["MPharma + MBA", "IT", "CS", "AI/ML"], "branch": ["BTech", "MPharma", "MPharmaMBA"], "school": ["MPSTME", "SPTM"]}	300	{}	"h"	2024-09-30 19:59:21.284093	2024-09-30 19:59:21.284093	{Intership}	{h,h,h}	event 2(accept)	hi	[{"name": "h", "designation": "h"}]	\N
14	18	[{"date": "2024-10-24", "venues": ["Playground"], "end_time": "06:56", "start_time": "04:56"}]	{"year": ["1st Year"], "class": ["AI/ML"], "branch": ["BTech"], "school": ["MPSTME"], "externalInput": ""}	50	{}	"room"	2024-10-02 23:02:55.191479	2024-10-02 23:02:55.191479	{Conferences}	{hi,its,coding}	coding	its coding	[{"name": "me", "designation": "meeeeee"}]	
16	20	[{"date": "2024-10-02", "venues": ["Playground"], "end_time": "10:47", "start_time": "10:43"}]	{"year": ["1st Year", "2nd Year", "3rd Year", "4th Year"], "class": ["AI/ML", "CE", "CS", "IT", "CE", "BPharma + MBA", "MPharma + MBA", "B.Pharma", "M.Pharma", "AGRICULTURE"], "branch": ["BTech", "MBATech", "BPharma", "MPharma", "BPharmaMBA", "MPharmaMBA", "Agriculture"], "school": ["MPSTME", "SPTM", "SAST"], "externalInput": ""}	54678	{}	[]	2024-10-03 10:43:12.903269	2024-10-03 10:43:12.903269	{Conferences}	{trial1,trail2,trail3}	trial	trial 1	[{"name": "", "designation": ""}]	
\.


--
-- Data for Name: eventapprovals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.eventapprovals (id, event_id, approver_id, status, reason, created_at, updated_at) FROM stdin;
21	15	2	Rejected	\N	2024-09-30 18:46:12.972715	2024-09-30 18:46:57.52104
22	16	2	Approved	\N	2024-09-30 19:59:21.284093	2024-09-30 20:03:46.042482
23	16	1	Approved	\N	2024-09-30 20:03:46.042482	2024-09-30 20:04:10.8445
25	18	2	Approved	\N	2024-10-02 23:02:55.191479	2024-10-02 23:58:32.266522
26	18	1	Approved	\N	2024-10-02 23:58:05.413657	2024-10-02 23:59:08.909483
27	18	1	Approved	\N	2024-10-02 23:58:32.266522	2024-10-02 23:59:08.909483
29	20	2	Pending	\N	2024-10-03 10:43:12.903269	2024-10-03 10:43:12.903269
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, created_by, status, current_approver, created_at, updated_at) FROM stdin;
15	3	Rejected	\N	2024-09-30 18:46:12.972715	2024-09-30 18:46:57.52104
16	3	Approved	\N	2024-09-30 19:59:21.284093	2024-09-30 20:04:10.8445
18	24	Approved	\N	2024-10-02 23:02:55.191479	2024-10-02 23:59:08.909483
20	3	Pending	2	2024-10-03 10:43:12.903269	2024-10-03 10:43:12.903269
\.


--
-- Data for Name: ieee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ieee (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Prof.Atul Patil	Faculty In-charge	Promoting Technological Innovation: IEEE aims to drive technological advancement and innovation through its publications, conferences, and standards developments.	Technological Advancements: IEEE’s work in research, standards development, and conferences often leans to significant advancement in technology and engineering practices. Innovation and improvement in fields telecommunications, computing, and electrical systems frequently result from IEEE’s activities.	Conferences
2	Prof. Rehan Ahmed	Faculty In-charge	Supporting Professional Development:  The organization provides resources for professional growth, including educational programs, certifications, and networking opportunities for engineers and technologists	Education Resources: IEEE provides a wealth of educational material, including journals, conference proceedings, and online courses. These resources support the continuous learning and professional development of engineering and technologists	Guest Lecture Series
3	Yomesh Khandalwal	Core Committee Member	Fostering Collaboration: IEEE encourages collaboration among professionals. Researchers and academics to advance knowledge and address complex challenges in technology	Professional Networking: IEEE’s conferences, local chapters, and special interest groups offer opportunities for professionals to connect, collaborate and share knowledge. This networking fosters career growth and partnership within the engineering community	Seminars
4	Amay Thakkar	Core Committee Member	\N	\N	Quiz Contest
5	\N	\N	\N	\N	Coding Competition
6	\N	\N	\N	\N	Social Activities
\.


--
-- Data for Name: iste; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.iste (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Dr. Suresh Kurumbanshi	Faculty In-charge	Organize   workshops, and guest lectures to provide students with insights into the latest developments in technology and engineering fields.	Students gain up-to-date insights into emerging technologies and trends in engineering and technology, broadening their academic and practical understanding.	Publish newsletters or magazines to keep members informed about chapter activities, achievements, and upcoming events
2	\N	\N	Conduct skill development programs and technical training to help students gain practical experience and industry-relevant skills.	Networking opportunities with guest speakers and workshop facilitators can lead to mentorship or future career opportunities.	Provide opportunities for students to take on leadership roles within the chapter, helping them develop organizational and managerial skills
3	\N	\N	Encourage and support student projects and research activities, fostering a collaborative environment for innovation and problem-solving.	Students acquire hands-on experience with tools, technologies, and methodologies that are relevant in the industry, enhancing their practical skills.	Handle the administrative functions of the chapter, including organizing meetings, managing finances, and coordinating with the parent ISTE organization.
4	\N	\N	\N	\N	Facilitate networking opportunities with professionals, alumni, and peers to help students build a strong professional network.
5	\N	\N	\N	\N	Arrange visits to companies and research labs to give students firsthand experience of industrial environments and practices.
\.


--
-- Data for Name: learn_tech; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learn_tech (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Prof. Dhananjay Joshi	Faculty In-charge	Organizing various technical training programs	Engineering Knowledge	Workshops, Seminars and webinars
2	Rasanath Kulkarni	Core Committee Member	Offering a platform to Emphasizes continuous self-learning	Problem Analysis	Projects and Competitions
3	Anjali Agrawal	Core Committee Member	Promote Social Outreach	Design/Development of Solutions	Guest Lectures
4	Dhananjay Khairnar	Core Committee Member	\N	Investigation of Complex Problems	Networking Events
5	Abhisek Pal	Core Committee Member	\N	Modern Tool Usage	Collaborative Learning
6	Dhyani Shah	Core Committee Member	\N	Engineer and Society	Community Outreach
7	Utkarsh Mandloi	Core Committee Member	\N	Individual and Team Work	\N
8	Syed Farhanuddin	Core Committee Member	\N	Communication	\N
9	\N	\N	\N	Project Management and Finance	\N
10	\N	\N	\N	Life-Long Learning	\N
\.


--
-- Data for Name: nmmun; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nmmun (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Dr. Rakesh Chaudhari	Faculty In-charge	To develop universally acceptable drafts of the proposals for the existing global issues.	Global Awareness: Stay informed about global issues, boosting confidence in discussions	Information Gathering: Researching and staying updated on global issues
2	Owais Fahim Bubere	Core Committee Members	To educate the people about the working process of the United Nations.	Confidence Building: Improve public speaking and communication skills.	Public Speaking: Enhancing communication and presentation skills
3	Nishtha Desai	Core Committee Members	To voice an opinion of the Youth across the world to be considered in the United Nations as a viewpoint.	Business Skills: Gain practical experience in planning, marketing, and leadership	Event Management: Organizing, planning, and strategizing for successful execution.
4	Meet Maheshwari	Core Committee Members	To develop skills in the Youth to solve issues and manage negotiations.	Networking: Interact with knowledgeable peers, expanding your network.	Networking: Building relationships and expanding professional networks.
5	Nitya Chourasia	Core Committee Members	\N	Resume Boost: Enhance your resume with valuable extracurricular experience.	Skill Development: Improving leadership, marketing, and business acumen.
6	Aastha Tiwari	Core Committee Members	\N	\N	Resume Building: Adding weight to academic and career profiles
7	Vrudhi Varma	Core Committee Members	\N	\N	\N
8	Aditya Patil	Core Committee Members	\N	\N	\N
9	Rushikesh Patil	Core Committee Members	\N	\N	\N
10	Avneesh Taneja	Core Committee Members	\N	\N	\N
11	Rasanath Kulkarni	Core Committee Members	\N	\N	\N
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification (id, user_id, event_id, notification_type, message, sent_at) FROM stdin;
24	2	20	Approval_Required	You have a new event titled "trial" awaiting your approval.	2024-10-03 10:43:12.903269
\.


--
-- Data for Name: report; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report (id, event_id, created_at, updated_at, title, event_type, guest_speakers, start_date, start_time, end_date, end_time, objectives, venue, resources, audience, description, photos, faculty_coordinators, student_coordinators, schools, branches, classes, years, clubs) FROM stdin;
63	16	2024-10-01 15:47:28.149898	2024-10-01 15:47:28.149898	event 2(accept)	\N	[{"name": "h", "designation": "h"}]	2024-09-30	01:57:00	2024-09-30	01:57:00	{h,h,h}	Lab, LR - 1, LR - 4, LR - 5, LR - 2, LR - 3, LR - 7, LR - 10, LR - 11, LR - 8, LR - 9	"h"	300	hi	{}	[{"name": ""}]	[{"name": ""}, {"name": ""}, {"name": ""}]	{MPSTME,SPTM}	{BTech,MPharma,MPharmaMBA}	{"MPharma + MBA",IT,CS,AI/ML}	{"1st Year","3rd Year"}	N/A
\.


--
-- Data for Name: request_assign; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.request_assign (created_by, approver) FROM stdin;
3	2
2	1
14	2
15	2
16	2
17	2
18	2
19	2
20	2
21	2
22	2
23	2
24	2
25	2
26	2
27	2
28	2
29	2
30	2
31	2
32	2
33	2
34	2
35	2
36	2
37	2
8	2
\.


--
-- Data for Name: s4ds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.s4ds (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Prof. Rajesh Verma	Faculty In-charge	Foster awareness and understanding of Data Science through workshops, training sessions, and guest lectures, empowering students to pursue careers in this field.	Enhanced Technical Skills: Conducting workshops and training sessions on IoT and data science to improve students technical knowledge and practical skills	Conducting events that help members develop a range of skills, including administrative, technical, and managerial abilities.
2	\N	\N	Provide a platform for students, researchers, companies, and governments to exchange ideas and collaborate on real-life data science applications and solutions.	Foster Collaboration: Strengthen the collaboration between industry, academia, and government to accelerate the deployment of IoT infrastructure.	Offering certification programs on disruptive technologies to enhance technical knowledge.
3	\N	\N	Develop educational initiatives, form partnerships with government and industry, and organize seminars, conferences, and recognition programs to highlight exemplary work in Data Science.	Professional Growth: Offering membership benefits that include access to conferences, seminars, and professional networking events to support student`s career growth	Opportunities to host or partner in organizing the International Conference on Data Management, Analytics, and Innovation
\.


--
-- Data for Name: soft_skill_club; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.soft_skill_club (id, name, role, objectives, outcomes, functions) FROM stdin;
1	SINOY SUGUNAN	Faculty In-charge	To develop leadership and teamwork abilities	Students will demonstrate enhanced verbal and non-verbal communication skills, enabling them to articulate their ideas clearly and confidently in both academic and professional settings.	Organize regular workshops and training sessions focused on various soft skills such as communication, leadership, teamwork, emotional intelligence, time management, and conflict resolution.
2	Ms. KHUSHI RATHI	Core Committee Members	To foster emotional intelligence and interpersonal skills	Members will exhibit stronger leadership qualities and an improved ability to work effectively within teams, showcasing their ability to manage projects, delegate tasks, and collaborate efficiently.	Invite industry professionals, alumni, and experts to share their experiences and insights on the importance of soft skills in the professional world.
3	Mr. DARSHILKUMAR PATEL	Core Committee Members	To enhance communication skills	Participants will develop greater emotional intelligence, including better self-awareness, empathy, and conflict resolution skills, leading to improved relationships and a more supportive community	Provide opportunities for members to practice public speaking and presentations in a supportive environment, including feedback and constructive criticism to help them improve.
4	Ms. DIPLAXMI RANE	Core Committee Members	\N	\N	Conduct team-building exercises and activities that encourage collaboration, problem-solving, and trust among members.
5	Ms.APURVA MASULE	Core Committee Members	\N	\N	Facilitate peer mentoring programs where experienced members can guide and support new members in developing their soft skills. Organize networking events to help members build connections.
6	Mr. HARSHAL PATIL	Core Committee Members	\N	\N	Encourage members to work on group projects and initiatives that require effective communication, coordination, and teamwork.
\.


--
-- Data for Name: team_uas_nmims; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.team_uas_nmims (id, name, role, objectives, outcomes, functions) FROM stdin;
1	 Prof. Sachin Chavan	Faculty In-charge	Team UAS NMIMS specializes in drone technology and has been conducting extensive research and development.	Members will gain hands-on experience in building, programming, and piloting drones, improving their technical proficiency.	Workshops and Training Sessions
2	Prof. Mayank Kothari	Faculty In-charge	Provide members with opportunities to learn about drone technology, including building, programming, and piloting drones.	The club will produce innovative projects and applications for drones, showcasing creativity and problem-solving skills.	Project Development
3	Vaibhav Tayal	Core Committee Members	Encourage members to innovate and create new applications for drones in various fields such as photography, agriculture, and search and rescue.	Through events and workshops, the club will raise awareness about the benefits of drones and engage the local community.	Competitions and Challenges
4	Om Biscuitwala	Core Committee Members	Participate in drone competitions and challenges to foster a spirit of friendly competition and continuous improvement.	Participation in competitions and challenges will lead to recognition and accolades, fostering a sense of achievement.	\N
5	Parth Sharma	Core Committee Members	Provide a platform for members to network, share ideas, and collaborate on projects.	Members will build a network of like-minded individuals, facilitating collaboration and idea-sharing.	\N
6	Vismay Kansara	Core Committee Members	\N	\N	\N
7	Shrinivas Ahirrao	Core Committee Members	\N	\N	\N
8	Yomesh Khandelwal	Core Committee Members	\N	\N	\N
\.


--
-- Data for Name: the_writers_hub; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.the_writers_hub (id, name, role, objectives, outcomes, functions) FROM stdin;
1	Dr. Preeti C. Sangave	Faculty In-charge	To provide a platform for all those who express themselves through the art of literature.	Official Newsletter – CLIFFNOTES issue 2021, 2022, 2023	Original Content Creations
2	Dr. Sanjay Shrivastava	Faculty In-charge	Create, Design Newsletter - Written Form	Ink and Insights – Poet’s Evening 2024	Handle Social Media Handles (Insta, FB, LinkedIn)
3	Ms.Mahi Sahu	Core Committee Members	Create, Perform – On Stage events	CV Writing Workshop 2023	Graphic Designs
4	Ms.Hanusha Sharma	Core Committee Members	\N	TWH event at Ganesh Utsav & at AlmaCohesion 2024 Alumni meet	Event Planning, approvals & Execution
5	Ms.Aastha Gawali	Core Committee Members	\N	\N	Public Outreach
6	Ms.Durvaa Desai	Core Committee Members	\N	\N	Organize events & Competitions
7	Mr.Rasnath Kulkarni	Core Committee Members	\N	\N	Student Member committee selections
8	Mr.Avneesh Kumar Taneja	Core Committee Members	\N	\N	\N
9	Ms.Mita Tamhankar	Core Committee Members	\N	\N	\N
10	Mr.Ritvik Kharde	Core Committee Members	\N	\N	\N
11	Mr.Adishwar Jain	Core Committee Members	\N	\N	\N
12	Ms.Riya Vengurlekar	Core Committee Members	\N	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, role, coordinator) FROM stdin;
1	Director	director@example.com	$2a$10$FcIkoWDiTwjfL3H2YeWocOR69G84ugzpcSTuVS3wupYyfTa6LswRy	director	\N
2	Dean	dean@example.com	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	dean	\N
3	Faculty	faculty@example.com	$2a$10$dw0ycvXF8hiA0Sw0LujosOtLymaobCklid4HUQPRGqE3ZmBs0FdpK	faculty	\N
8	IIC	iic_mptp.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	\N
28	Google Developer's Club	Gdsc_mpstme.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	\N
14	INSTITUTIONS INNOVATION COUNCIL (IIC)	iic_mptp.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Sachin Bhandari
15	IPR CELL	\N	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Shashikant Bagade
16	E-CELL	\N	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Saurabh Maru
17	INSTITUTE–INDUSTRY INTERACTION AND INTERNSHIP CELL (I4C)	\N	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Prof. Bhushan Inje
18	NATIONAL INNOVATION AND START-UP POLICY (NISP) CELL	\N	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Prof. Rajesh Verma
19	Saturday 10 am	saturday10am@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Payal Dande and Prof. Harshal Kotwal
20	EACH ONE SAVE ONE	socialforumshirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Payal Dande
21	The Writers Hub	thewritershub.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Preeti Sangave and Dr. Sanjay Shrivastava
22	RAW VISION CLUB	RAWVISION_MPTP.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Piyush Ghode & Prof. Bhushan Inje
24	Computer Society of India (CSI)	CSI_MPSTME.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Mayank Sohani & Dr. Piyush Soni
25	NMMUN (Narsee Monjee Model United Nation)	Nmmun_mptp.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Rakesh Chaudhari, Dr. Upendra Verma and Dr. Preeti Sangave
26	Coding Club	CODINGCLUB_MPSTME.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Suraj Patil & Dr. Pravin Landge
27	App Development Club	APPDEVCLUB_MPSTME.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Prof. Dhiraj Bhise
29	TEAM UAS NMIMS (Drone Club)	DRONECLUB_MPSTME.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Prof. Sachin Chavan & Prof. Mayank Kothari
30	ISTE	ISTE_MPSTME.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Suresh Kurumbanshi
31	IEEE	IEEE_MPSTME.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Prof. Atul Patil and Prof. Rehan Ahmad
32	Society 4DS	SOCIETY4Ds_MPSTME.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Prof. Rajesh Verma
23	ATRANGI CLUB	ATRANGIARTCLUB.MPTP@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Piyush Ghode & Prof. Sonia Relan
33	AVINYA - IOT LAB	\N	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Suresh Kurumbanshi
34	Learn Tech with NMIMS Shirpur	LEARNTECH_MPSTME.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Prof. Dhananjay Joshi
35	FLAVIUM	FLAVIUM_MPSTME.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Vishal Fegade, Prof. Kiran Salunke, Prof. Mayank Kothari, Dr. Tawseef Rashid
36	AMBIORA - Technical Event	AMBIORA_MPSTME.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Suyog Pande
37	PROTSAHAN	PROTSAHAN_MPSTME.shirpur@nmims.edu	$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa	faculty	Dr. Rakesh Chaudhari and Prof. Sonia Relan
\.


--
-- Name: app_development_club_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.app_development_club_id_seq', 12, true);


--
-- Name: atrangi_club_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.atrangi_club_id_seq', 5, true);


--
-- Name: clubs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clubs_id_seq', 1, false);


--
-- Name: coding_club_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coding_club_id_seq', 15, true);


--
-- Name: competitive_preparation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.competitive_preparation_id_seq', 4, true);


--
-- Name: computer_society_of_india_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.computer_society_of_india_id_seq', 9, true);


--
-- Name: crs_ilc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.crs_ilc_id_seq', 16, true);


--
-- Name: cultural_activity_forum_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cultural_activity_forum_id_seq', 12, true);


--
-- Name: eoso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eoso_id_seq', 12, true);


--
-- Name: event_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_details_id_seq', 16, true);


--
-- Name: eventapprovals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eventapprovals_id_seq', 29, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 20, true);


--
-- Name: ieee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ieee_id_seq', 6, true);


--
-- Name: iste_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.iste_id_seq', 5, true);


--
-- Name: learn_tech_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.learn_tech_id_seq', 10, true);


--
-- Name: nmmun_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nmmun_id_seq', 11, true);


--
-- Name: notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notification_id_seq', 24, true);


--
-- Name: report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_id_seq', 63, true);


--
-- Name: s4ds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.s4ds_id_seq', 3, true);


--
-- Name: soft_skill_club_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.soft_skill_club_id_seq', 6, true);


--
-- Name: team_uas_nmims_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.team_uas_nmims_id_seq', 8, true);


--
-- Name: the_writers_hub_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.the_writers_hub_id_seq', 12, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 37, true);


--
-- Name: app_development_club app_development_club_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_development_club
    ADD CONSTRAINT app_development_club_pkey PRIMARY KEY (id);


--
-- Name: atrangi_club atrangi_club_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atrangi_club
    ADD CONSTRAINT atrangi_club_pkey PRIMARY KEY (id);


--
-- Name: clubs clubs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT clubs_pkey PRIMARY KEY (id);


--
-- Name: coding_club coding_club_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coding_club
    ADD CONSTRAINT coding_club_pkey PRIMARY KEY (id);


--
-- Name: competitive_preparation competitive_preparation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitive_preparation
    ADD CONSTRAINT competitive_preparation_pkey PRIMARY KEY (id);


--
-- Name: computer_society_of_india computer_society_of_india_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.computer_society_of_india
    ADD CONSTRAINT computer_society_of_india_pkey PRIMARY KEY (id);


--
-- Name: crs_ilc crs_ilc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crs_ilc
    ADD CONSTRAINT crs_ilc_pkey PRIMARY KEY (id);


--
-- Name: cultural_activity_forum cultural_activity_forum_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cultural_activity_forum
    ADD CONSTRAINT cultural_activity_forum_pkey PRIMARY KEY (id);


--
-- Name: eoso eoso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eoso
    ADD CONSTRAINT eoso_pkey PRIMARY KEY (id);


--
-- Name: event_details event_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_details
    ADD CONSTRAINT event_details_pkey PRIMARY KEY (id);


--
-- Name: eventapprovals eventapprovals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventapprovals
    ADD CONSTRAINT eventapprovals_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: ieee ieee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ieee
    ADD CONSTRAINT ieee_pkey PRIMARY KEY (id);


--
-- Name: iste iste_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iste
    ADD CONSTRAINT iste_pkey PRIMARY KEY (id);


--
-- Name: learn_tech learn_tech_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learn_tech
    ADD CONSTRAINT learn_tech_pkey PRIMARY KEY (id);


--
-- Name: nmmun nmmun_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nmmun
    ADD CONSTRAINT nmmun_pkey PRIMARY KEY (id);


--
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id);


--
-- Name: report report_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_pkey PRIMARY KEY (id);


--
-- Name: request_assign request_assign_created_by_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_assign
    ADD CONSTRAINT request_assign_created_by_key UNIQUE (created_by);


--
-- Name: request_assign request_assign_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_assign
    ADD CONSTRAINT request_assign_pkey PRIMARY KEY (created_by, approver);


--
-- Name: s4ds s4ds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.s4ds
    ADD CONSTRAINT s4ds_pkey PRIMARY KEY (id);


--
-- Name: soft_skill_club soft_skill_club_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.soft_skill_club
    ADD CONSTRAINT soft_skill_club_pkey PRIMARY KEY (id);


--
-- Name: team_uas_nmims team_uas_nmims_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_uas_nmims
    ADD CONSTRAINT team_uas_nmims_pkey PRIMARY KEY (id);


--
-- Name: the_writers_hub the_writers_hub_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.the_writers_hub
    ADD CONSTRAINT the_writers_hub_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: event_details event_details_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_details
    ADD CONSTRAINT event_details_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: eventapprovals eventapprovals_approver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventapprovals
    ADD CONSTRAINT eventapprovals_approver_id_fkey FOREIGN KEY (approver_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: eventapprovals eventapprovals_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventapprovals
    ADD CONSTRAINT eventapprovals_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: events events_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: events events_current_approver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_current_approver_fkey FOREIGN KEY (current_approver) REFERENCES public.users(id);


--
-- Name: notification notification_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id);


--
-- Name: notification notification_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: report report_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id);


--
-- Name: request_assign request_assign_approver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_assign
    ADD CONSTRAINT request_assign_approver_fkey FOREIGN KEY (approver) REFERENCES public.users(id);


--
-- Name: request_assign request_assign_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_assign
    ADD CONSTRAINT request_assign_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

