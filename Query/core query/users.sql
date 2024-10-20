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

SET default_tablespace = '';

SET default_table_access_method = heap;

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
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


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
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 37, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

