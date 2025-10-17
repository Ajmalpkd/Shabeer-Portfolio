/** @type {import('tailwindcss').Config} */
module.exports = {
  // നിങ്ങളുടെ html ഫയലുകളും js ഫയലുകളും എവിടെയാണെന്ന് ഇവിടെ നൽകുക
  content: ["./*.html", "./*.js"], 
  theme: {
    extend: {
      colors: {
        // പ്രധാന വയലറ്റ് നിറം: #701c8b (നിങ്ങൾ ആദ്യം നൽകിയ കളർ കോഡ്)
        'custom-purple': '#701c8b', 
        
        // മഞ്ഞ നിറം: #FFC000
        'custom-yellow': '#FFC000',
        
        // 'custom-dark-purple' ഉം ഇതേ കളർ കോഡിലേക്ക് മാറ്റി (ഇത് custom-purple എന്ന പേര് ഉപയോഗിക്കുന്നതാണ് കൂടുതൽ നല്ലത്)
        'custom-dark-purple': '#701c8b', 
      },
      zIndex: {

        'behind': '-10', 
      }
    },
  },
  plugins: [],
}