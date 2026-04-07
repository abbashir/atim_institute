import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = {
    en: { label: "English", short: "EN", code: "en" },
    bn: { label: "বাংলা", short: "BN", code: "bn" },
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    if (langCode === i18n.language) {
      setIsOpen(false);
      return;
    }
    // 1. Instant client-side update
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLang = languages[i18n.language] || languages.en;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-x-2 focus:outline-none group"
      >
        {/* Globe Icon */}
        <img
          src="/images/admin/language_icon.svg"
          alt="Language"
          className="w-5 h-5 text-gray-600"
        />

        {/* Text Container */}
        <span className="text-[#1F2937] text-[15px] font-normal leading-none pt-0.5 text-left">

          {/* Mobile View: Shows 'EN' or 'BN' */}
          <span className="md:hidden">
            {currentLang.short}
          </span>

          {/* Desktop View: Shows 'English' or 'বাংলা' */}
          <span className="hidden md:inline-block min-w-[50px]">
            {currentLang.label}
          </span>

        </span>

        {/* Arrow Bottom */}
        <img
          src="/images/admin/arrow_bottom.svg"
          alt="Toggle"
          className={`w-3 h-3 transition-transform duration-200 mt-0.5 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 py-1">
          {Object.values(languages).map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                i18n.language === lang.code
                  ? "text-blue-600 font-semibold bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}