import { useState } from 'react';
import { dishes, questions, testimonials } from '../models/content.js';

export function useLandingViewModel() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function openSignup() {
    setSubmitted(false);
    setIsModalOpen(true);
    setIsMenuOpen(false);
  }

  function closeSignup() {
    setIsModalOpen(false);
  }

  function submitSignup(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  function toggleQuestion(index) {
    setActiveQuestion((current) => (current === index ? -1 : index));
  }

  function toggleMenu() {
    setIsMenuOpen((current) => !current);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return {
    dishes,
    questions,
    testimonials,
    activeQuestion,
    isModalOpen,
    isMenuOpen,
    submitted,
    openSignup,
    closeSignup,
    submitSignup,
    toggleQuestion,
    toggleMenu,
    closeMenu,
  };
}
