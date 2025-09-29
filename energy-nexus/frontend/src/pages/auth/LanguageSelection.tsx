import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Check, Zap, ChevronRight, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelection: React.FC = () => {
  const navigate = useNavigate();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [suggestedLanguage, setSuggestedLanguage] = useState<string>('');
  const [userLocation, setUserLocation] = useState<string>('');

  // Auto-detect user location and suggest language
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try to get user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              // Mock location detection - in production, use proper geocoding service
              const mockLocations = {
                'mumbai': { lat: 19.0760, lng: 72.8777, lang: 'hi', region: 'Maharashtra, India' },
                'chennai': { lat: 13.0827, lng: 80.2707, lang: 'ta', region: 'Tamil Nadu, India' },
                'hyderabad': { lat: 17.3850, lng: 78.4867, lang: 'te', region: 'Telangana, India' },
                'kolkata': { lat: 22.5726, lng: 88.3639, lang: 'bn', region: 'West Bengal, India' },
                'ahmedabad': { lat: 23.0225, lng: 72.5714, lang: 'gu', region: 'Gujarat, India' },
                'pune': { lat: 18.5204, lng: 73.8567, lang: 'mr', region: 'Maharashtra, India' },
              };
              
              // Find closest location (simplified)
              let closestLocation = 'mumbai';
              let minDistance = Infinity;
              
              Object.entries(mockLocations).forEach(([city, loc]) => {
                const distance = Math.sqrt(
                  Math.pow(latitude - loc.lat, 2) + Math.pow(longitude - loc.lng, 2)
                );
                if (distance < minDistance) {
                  minDistance = distance;
                  closestLocation = city;
                }
              });
              
              const detected = mockLocations[closestLocation];
              setSuggestedLanguage(detected.lang);
              setUserLocation(detected.region);
            },
            () => {
              // Fallback: use browser language
              const browserLang = navigator.language.split('-')[0];
              const supportedLang = availableLanguages.find(lang => lang.code === browserLang);
              if (supportedLang) {
                setSuggestedLanguage(browserLang);
              }
            }
          );
        }
      } catch (error) {
        console.error('Location detection failed:', error);
      }
    };

    detectLocation();
  }, [availableLanguages]);

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
  };

  const handleContinue = () => {
    changeLanguage(selectedLanguage);
    // Store that language selection is complete
    localStorage.setItem('energynexus-language-selected', 'true');
    
    // Navigate to signup or login based on user preference
    navigate('/signup');
  };

  const getLanguageText = (langCode: string, textKey: string) => {
    const texts = {
      en: {
        welcome: 'Welcome to EnergyNexus',
        subtitle: 'Choose your preferred language',
        suggested: 'Suggested for your location',
        continue: 'Continue'
      },
      hi: {
        welcome: 'एनर्जीनेक्सस में आपका स्वागत है',
        subtitle: 'अपनी पसंदीदा भाषा चुनें',
        suggested: 'आपके स्थान के लिए सुझाया गया',
        continue: 'जारी रखें'
      },
      ta: {
        welcome: 'எனர்ஜிநெக்சசில் உங்களை வரவேற்கிறோம்',
        subtitle: 'உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
        suggested: 'உங்கள் இருப்பிடத்திற்கு பரிந்துரைக்கப்படுகிறது',
        continue: 'தொடரவும்'
      }
    };
    
    return texts[langCode]?.[textKey] || texts.en[textKey] || textKey;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getLanguageText(selectedLanguage, 'welcome')}
          </h1>
          <p className="text-gray-600">
            {getLanguageText(selectedLanguage, 'subtitle')}
          </p>
          
          {userLocation && (
            <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>Detected location: {userLocation}</span>
            </div>
          )}
        </motion.div>

        {/* Language Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden mb-6"
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-5 h-5 text-primary-600" />
              <h2 className="font-semibold text-gray-900">Select Language / भाषा चुनें</h2>
            </div>
            
            <div className="space-y-2">
              {availableLanguages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                    selectedLanguage === language.code
                      ? 'bg-primary-50 border-2 border-primary-200 text-primary-700'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{language.flag}</span>
                    <div className="text-left">
                      <p className="font-medium">{language.nativeName}</p>
                      <p className="text-sm opacity-75">{language.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {suggestedLanguage === language.code && (
                      <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                        {getLanguageText(selectedLanguage, 'suggested')}
                      </span>
                    )}
                    {selectedLanguage === language.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Preview Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-6 text-center"
        >
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <p className="font-medium text-gray-900">
            {selectedLanguage === 'en' && 'Trade solar energy with your neighbors'}
            {selectedLanguage === 'hi' && 'अपने पड़ोसियों के साथ सौर ऊर्जा का व्यापार करें'}
            {selectedLanguage === 'ta' && 'உங்கள் அண்டைவீட்டாருடன் சூரிய சக்தியை வர்த்தகம் செய்யுங்கள்'}
            {selectedLanguage === 'te' && 'మీ పొరుగువారితో సౌర శక్తిని వ్యాపారం చేయండి'}
            {selectedLanguage === 'bn' && 'আপনার প্রতিবেশীদের সাথে সৌর শক্তি ব্যবসা করুন'}
            {selectedLanguage === 'mr' && 'आपल्या शेजाऱ्यांशी सौर ऊर्जेचा व्यापार करा'}
            {selectedLanguage === 'gu' && 'તમારા પડોશીઓ સાથે સૌર ઊર્જાનો વેપાર કરો'}
          </p>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          onClick={handleContinue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>{getLanguageText(selectedLanguage, 'continue')}</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
          <p>You can change this later in settings</p>
          <p className="mt-2">सेटिंग्स में इसे बाद में बदला जा सकता है</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageSelection;