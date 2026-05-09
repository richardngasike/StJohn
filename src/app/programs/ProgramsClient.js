'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  FiClock,
  FiUsers,
  FiBook,
  FiAward,
  FiArrowRight,
  FiSearch
} from 'react-icons/fi';

import {
  MdOutlineComputer,
  MdOutlineBusinessCenter,
  MdOutlineEngineering,
  MdOutlineSchool,
  MdOutlineConstruction,
  MdOutlineDirectionsCar
} from 'react-icons/md';

import styles from './programs.module.css';

const categories = [
  'All',
  'Certificate',
  'Diploma',
  'Short Course',
  'Artisan',
  'CBET',
  'Professional',
  'Driving'
];

const allPrograms = [

  // ================= CERTIFICATE COURSES =================

  {
    title: 'Certificate in Community Development and Social Work',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Hair Dressing and Beauty Therapy',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Business Administration and Management',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Human Resource Management',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Secretarial Studies',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Information Communication Technology',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1-2 Years'
  },

  {
    title: 'Certificate in Nutrition and Dietetics',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Community Health Assistant',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Health Records and IT',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Front Office',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Tourism Management',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in General Agriculture',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Food Production & Catering',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Counseling Psychology',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Supply Chain',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Finance and Banking',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Tour Guide',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Store Keeping',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  {
    title: 'Certificate in Health Support Service / Nurse Assistant',
    level: 'Certificate',
    cat: 'KNEC',
    duration: '1 Year'
  },

  // ================= DIPLOMA COURSES =================

  {
    title: 'Diploma in Community Development and Social Work',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Human Resource Management',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Business Administration and Management',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Information Communication Technology',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2-3 Years'
  },

  {
    title: 'Diploma in Nutrition and Dietetics',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Community Health Assistant',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Health Records and IT',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Secretarial Studies',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Teacher Education (Primary & ECDE)',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '3 Years'
  },

  {
    title: 'Diploma in Secondary Teacher Education',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '3 Years'
  },

  {
    title: 'Diploma in General Agriculture',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Counseling Psychology',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Food Production & Catering',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Supply Chain',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Finance and Banking',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Tour Guide',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  {
    title: 'Diploma in Health Support Services',
    level: 'Diploma',
    cat: 'KNEC',
    duration: '2 Years'
  },

  // ================= SHORT COURSES =================

  {
    title: 'Short Course: Plumbing and Pipe Fitting',
    level: 'Short Course',
    cat: 'Short',
    duration: '3-6 Months'
  },

  {
    title: 'Short Course: Tailoring and Dress Making',
    level: 'Short Course',
    cat: 'Short',
    duration: '3-6 Months'
  },

  {
    title: 'Short Course: Electrical Installation',
    level: 'Short Course',
    cat: 'Short',
    duration: '3-6 Months'
  },

  {
    title: 'Short Course: Solar Installation',
    level: 'Short Course',
    cat: 'Short',
    duration: '3 Months'
  },

  {
    title: 'Short Course: Interior Design Decorations',
    level: 'Short Course',
    cat: 'Short',
    duration: '3 Months'
  },

  {
    title: 'Short Course: Masonry Construction',
    level: 'Short Course',
    cat: 'Short',
    duration: '3-6 Months'
  },

  {
    title: 'Short Course: Mobile Repair',
    level: 'Short Course',
    cat: 'Short',
    duration: '2-3 Months'
  },

  {
    title: 'Short Course: Motor Cycle Repair',
    level: 'Short Course',
    cat: 'Short',
    duration: '2-3 Months'
  },

  {
    title: 'Short Course: Mechanical Engineering',
    level: 'Short Course',
    cat: 'Short',
    duration: '6 Months'
  },

  {
    title: 'Short Course: Electrical Wireman',
    level: 'Short Course',
    cat: 'Short',
    duration: '3 Months'
  },

  {
    title: 'Short Course: Welding and Fabrication',
    level: 'Short Course',
    cat: 'Short',
    duration: '3-6 Months'
  },

  // ================= DRIVING SCHOOL =================

  {
    title: 'Short Course: Professional Driving Training',
    level: 'Driving',
    cat: 'NTSA',
    duration: '1-2 Months'
  },
];

const colorMap = {
  Diploma: {
    bg: 'var(--green-100)',
    color: 'var(--green-700)'
  },

  Certificate: {
    bg: 'var(--gold-100)',
    color: 'var(--gold-700)'
  },

  'Short Course': {
    bg: 'var(--brown-100)',
    color: 'var(--brown-700)'
  },

  Artisan: {
    bg: 'var(--blue-100)',
    color: 'var(--blue-700)'
  },

  CBET: {
    bg: 'var(--purple-100)',
    color: 'var(--purple-700)'
  },

  Professional: {
    bg: 'var(--pink-100)',
    color: 'var(--pink-700)'
  },

  Driving: {
    bg: 'var(--orange-100)',
    color: 'var(--orange-700)'
  },
};

const iconMap = {
  Diploma: MdOutlineSchool,
  Certificate: MdOutlineSchool,
  'Short Course': MdOutlineComputer,
  Artisan: MdOutlineConstruction,
  CBET: MdOutlineEngineering,
  Professional: MdOutlineBusinessCenter,
  Driving: MdOutlineDirectionsCar,
};

export default function ProgramsClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allPrograms.filter((p) => {
    const matchCat =
      activeCategory === 'All' ||
      p.level === activeCategory;

    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase());

    return matchCat && matchSearch;
  });

  return (
    <>
      {/* KEEP YOUR EXISTING JSX UI HERE */}
    </>
  );
}