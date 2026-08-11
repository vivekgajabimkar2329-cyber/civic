import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    title: "Civic AI",
    tagline: "AI-Powered Civic Management",
    welcomeBack: "Welcome Back",
    signInMessage: "Sign in to access your digital governance dashboard.",
    email: "Email Address",
    password: "Password",
    role: "Select Your Role",
    citizen: "Citizen",
    department_admin: "Admin",
    super_admin: "Super Admin",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    signingIn: "Signing in...",
    orContinueWith: "Or continue with",
    dontHaveAccount: "Don't have an account?",
    signUp: "Create an Account",
    helpCenter: "Help Centre",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms & Conditions",
    illustrations: {
      smartCity: "Smart City Solutions",
      smartCityDesc: "AI assists in automated grievance routing and prioritization.",
      analytics: "Digital Governance & Analytics",
      analyticsDesc: "Real-time tracking of civic complaints, status, and resolution metrics.",
      community: "Empowering Citizens",
      communityDesc: "Easily report road damage, waste management, water supply issues, and more."
    },
    validation: {
      emailRequired: "Email address is required",
      emailInvalid: "Please enter a valid email address",
      passwordRequired: "Password is required",
      passwordMin: "Password must be at least 8 characters",
      passwordStrength: "Must contain uppercase, lowercase, number, and special character",
      roleRequired: "Please select a role to proceed",
      authFailed: "Invalid credentials. Please verify your details."
    }
  },
  hi: {
    title: "सिविक एआई",
    tagline: "एआई-संचालित नागरिक प्रबंधन",
    welcomeBack: "आपका स्वागत है",
    signInMessage: "अपने डिजिटल गवर्नेंस डैशबोर्ड में लॉग इन करें।",
    email: "ईमेल पता",
    password: "पासवर्ड",
    role: "अपनी भूमिका चुनें",
    citizen: "नागरिक",
    department_admin: "एडमिन",
    super_admin: "सुपर एडमिन",
    rememberMe: "मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    signIn: "साइन इन करें",
    signingIn: "साइन इन हो रहा है...",
    orContinueWith: "या इसके साथ जारी रखें",
    dontHaveAccount: "खाता नहीं है?",
    signUp: "नया खाता बनाएं",
    helpCenter: "सहायता केंद्र",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "नियम और शर्तें",
    illustrations: {
      smartCity: "स्मार्ट सिटी समाधान",
      smartCityDesc: "एआई शिकायतों के स्वचालित रूटिंग और प्राथमिकता में मदद करता है।",
      analytics: "डिजिटल गवर्नेंस और एनालिटिक्स",
      analyticsDesc: "नागरिक शिकायतों, स्थिति और समाधान मेट्रिक्स की रीयल-टाइम ट्रैकिंग।",
      community: "नागरिकों को सशक्त बनाना",
      communityDesc: "सड़क क्षति, कचरा प्रबंधन, जलापूर्ति आदि समस्याओं की रिपोर्ट करें।"
    },
    validation: {
      emailRequired: "ईमेल पता आवश्यक है",
      emailInvalid: "कृपया एक मान्य ईमेल दर्ज करें",
      passwordRequired: "पासवर्ड आवश्यक है",
      passwordMin: "पासवर्ड कम से कम 8 वर्णों का होना चाहिए",
      passwordStrength: "अपरकेस, लोअरकेस, अंक और विशेष वर्ण होना आवश्यक है",
      roleRequired: "आगे बढ़ने के लिए कृपया एक भूमिका चुनें",
      authFailed: "अमान्य क्रेडेंशियल। कृपया अपने विवरण सत्यापित करें।"
    }
  },
  te: {
    title: "సివిక్ AI",
    tagline: "AI-ఆధారిత పౌర నిర్వహణ",
    welcomeBack: "స్వాగతం",
    signInMessage: "మీ డిజిటల్ గవర్నెన్స్ డాష్‌బోర్డ్ యాక్సెస్ చేయడానికి లాగిన్ అవ్వండి.",
    email: "ఈమెయిల్ చిరునామా",
    password: "పాస్‌వర్డ్",
    role: "మీ పాత్రను ఎంచుకోండి",
    citizen: "పౌరుడు",
    department_admin: "అడ్మిన్",
    super_admin: "సూపర్ అడ్మిన్",
    rememberMe: "గుర్తుంచుకో",
    forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
    signIn: "సైన్ ఇన్ చేయండి",
    signingIn: "సైన్ ఇన్ అవుతోంది...",
    orContinueWith: "లేదా దీనితో కొనసాగించండి",
    dontHaveAccount: "ఖాతా లేదా?",
    signUp: "ఖాతాను సృష్టించండి",
    helpCenter: "సహాయ కేంద్రం",
    privacyPolicy: "గోప్యతా విధానం",
    termsOfService: "నిబంధనలు & నిబంధనలు",
    illustrations: {
      smartCity: "స్మార్ట్ సిటీ సొల్యూషన్స్",
      smartCityDesc: "AI సహాయంతో ఫిర్యాదుల స్వయంచాలక రూటింగ్ మరియు ప్రాధాన్యత.",
      analytics: "డిజిటల్ గవర్నెన్స్ & అనలిటిక్స్",
      analyticsDesc: "పౌర ఫిర్యాదులు, స్థితి మరియు పరిష్కార కొలమానాల నిజ-సమయ ట్రాకింగ్.",
      community: "పౌరుల సాధికారత",
      communityDesc: "రోడ్డు దెబ్బతినడం, వ్యర్థాల నిర్వహణ, నీటి సరఫరా సమస్యలు మరియు మరిన్నింటిని నివేదించండి."
    },
    validation: {
      emailRequired: "ఈమెయిల్ చిరునామా తప్పనిసరి",
      emailInvalid: "దయచేసి సరైన ఈమెయిల్ నమోదు చేయండి",
      passwordRequired: "పాస్‌వర్డ్ తప్పనిసరి",
      passwordMin: "పాస్‌వర్డ్ కనీసం 8 అక్షరాలు ఉండాలి",
      passwordStrength: "అప్పర్ కేస్, లోయర్ కేస్, సంఖ్య మరియు ప్రత్యేక అక్షరం ఉండాలి",
      roleRequired: "కొనసాగడానికి దయచేసి ఒక పాత్రను ఎంచుకోండి",
      authFailed: "చెల్లని ఆధారాలు. దయచేసి మీ వివరాలను ధృవీకరించండి."
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key, section = null) => {
    if (section) {
      return translations[lang]?.[section]?.[key] || translations['en']?.[section]?.[key] || key;
    }
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
