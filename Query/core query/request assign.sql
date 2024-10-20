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
-- Name: request_assign; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.request_assign (
    created_by integer NOT NULL,
    approver integer NOT NULL
);


ALTER TABLE public.request_assign OWNER TO postgres;

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

