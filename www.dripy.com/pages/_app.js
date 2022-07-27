import "@/styles/globals.css";

import { AuthProvider } from "../firebase/context";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  
  function setupLandbot() {
    new Landbot.Livechat({
      configUrl: "https://landbot.site/v3/H-1326771-M40WPVTX4D1UXBR2/index.json"
    });
  }
  
  
// function setupLandbot() {
//   new Landbot.Livechat({
//     configUrl: "https://chats.yexir.com/v3/H-10503-NYE2UEZ0OZYFHRU9/index.json"
//   });
// }
// <Script
// strategy="lazyOnload"
// src="https://static.landbot.io/landbot-3/landbot-3.0.0.js"
// onLoad={setupLandbot}
// />
  return (
    <AuthProvider>
      
<Script
  strategy="lazyOnload"
  src="https://static.landbot.io/landbot-3/landbot-3.0.0.js"
  onLoad={setupLandbot}
/>
      <Component {...pageProps}  />
    </AuthProvider>
  );
}

export default MyApp;
