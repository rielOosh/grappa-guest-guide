import React from 'react';
import { IosIcon } from '../components/Icons';

export const getCardContent = (currentTheme, language, openImage) => [
  {
    id: 'gate',
    title: 'Gate Access',
    gradient: currentTheme === 'day' ? 'from-slate-100/50 to-slate-200/50' : 'from-gray-800/70 via-white/10 to-slate-900/70',
    content: (
      <div className={language === 'en' ? 'text-left' : 'text-right'} dir={language === 'en' ? 'ltr' : 'rtl'}>
        <p className={`mb-6 leading-relaxed ${currentTheme === 'day' ? 'text-gray-600' : 'text-white'}`}>
          {language === 'en'
            ? "This is a link to download the kibbutz gate opening app. Install the app, follow the instructions, and you'll be able to open the gate yourself. You need to get very close to the gate, almost touching it, then press the gate opening button in the app."
            : 'זהו קישור להורדת אפליקציה לפתיחת שער הקיבוץ. יש להתקין את האפליקציה, למלא אחר ההנחיות ואז ניתן לפתוח את השער בעצמך. צריך להתקרב ממש אל השער, כמעט להצמד, ואז ללחוץ על פתיחת השער באפליקציה.'}
        </p>
        <div className="space-y-4">
          <a href="https://goo.gl/fZTz4u" target="_blank" rel="noopener noreferrer" className="block bg-slate-800 text-white px-6 py-4 rounded-lg text-center hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold btn-premium haptic">
            <span className="flex items-center justify-center gap-2">
              <IosIcon />
              iPhone App
            </span>
          </a>
          <a href="https://goo.gl/Giopvd" target="_blank" rel="noopener noreferrer" className="block bg-green-600 text-white px-6 py-4 rounded-lg text-center hover:bg-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold btn-premium haptic">
            <span className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                android
              </span>
              Android App
            </span>
          </a>
        </div>
      </div>
    ),
  },
  {
    id: 'wifi',
    title: 'WiFi Access',
    gradient: currentTheme === 'day' ? 'from-slate-100/50 to-slate-200/50' : 'from-slate-900/70 via-gray-200/12 to-gray-800/70',
    content: (
      <div className="text-center">
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-8 rounded-xl border border-slate-200' : 'bg-slate-800/50 p-8 rounded-xl border border-slate-600'}>
          <div className={currentTheme === 'day' ? 'bg-white p-6 rounded-xl shadow-inner border border-slate-100 space-y-5' : 'bg-slate-900/50 p-6 rounded-xl shadow-inner border border-slate-700 space-y-5'}>
            <h4 className="font-bold text-2xl mb-2" style={{ color: currentTheme === 'day' ? '#1f2937' : '#fff' }}>
              WiFi Connection
            </h4>
            <div className={currentTheme === 'day' ? 'bg-slate-100 p-4 rounded-lg border' : 'bg-slate-800/50 p-4 rounded-lg border border-slate-700'}>
              <span className="font-semibold block mb-2" style={{ color: currentTheme === 'day' ? '#475569' : 'rgba(255,255,255,0.8)' }}>
                Network Name:
              </span>
              <p className="text-2xl font-mono font-bold select-all" style={{ color: currentTheme === 'day' ? '#334155' : '#fff' }}>
                GrappA Fiber
              </p>
            </div>
            <div className={currentTheme === 'day' ? 'bg-slate-100 p-4 rounded-lg border' : 'bg-slate-800/50 p-4 rounded-lg border border-slate-700'}>
              <span className="font-semibold block mb-2" style={{ color: currentTheme === 'day' ? '#475569' : 'rgba(255,255,255,0.8)' }}>
                Password:
              </span>
              <p className="text-2xl font-mono font-bold select-all" style={{ color: currentTheme === 'day' ? '#334155' : '#fff' }}>
                grappA321
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'tv',
    title: 'Entertainment',
    gradient: currentTheme === 'day' ? 'from-slate-100/50 to-slate-200/50' : 'from-gray-900/70 via-white/12 to-slate-700/70',
    content: (
      <div className="space-y-6">
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-6 rounded-xl border border-slate-200' : 'bg-slate-800/50 p-6 rounded-xl border border-slate-600'}>
          <h4 className="font-bold text-2xl mb-4 flex items-center justify-center gap-2" style={{ color: currentTheme === 'day' ? '#1e293b' : '#fff' }}>
            <span className="text-3xl">🏰</span> Disney+
          </h4>
          <div className={currentTheme === 'day' ? 'bg-white p-5 rounded-xl shadow-sm border border-slate-100 space-y-4' : 'bg-slate-900/50 p-5 rounded-xl shadow-sm border border-slate-700 space-y-4'}>
            <div className={currentTheme === 'day' ? 'bg-slate-100 p-3 rounded-lg border' : 'bg-slate-800/50 p-3 rounded-lg border border-slate-700'}>
              <span className="font-semibold" style={{ color: currentTheme === 'day' ? '#475569' : 'rgba(255,255,255,0.8)' }}>
                Profile:
              </span>
              <span className="ml-3 font-mono text-lg font-bold" style={{ color: currentTheme === 'day' ? '#334155' : '#fff' }}>
                GrappA
              </span>
            </div>
            <div className={currentTheme === 'day' ? 'bg-slate-100 p-3 rounded-lg border' : 'bg-slate-800/50 p-3 rounded-lg border border-slate-700'}>
              <span className="font-semibold" style={{ color: currentTheme === 'day' ? '#475569' : 'rgba(255,255,255,0.8)' }}>
                Password:
              </span>
              <span className="ml-3 font-mono text-lg font-bold" style={{ color: currentTheme === 'day' ? '#334155' : '#fff' }}>
                4114
              </span>
            </div>
          </div>
        </div>
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-6 rounded-xl border border-slate-200' : 'bg-slate-800/50 p-6 rounded-xl border border-slate-600'}>
          <h4 className="font-bold text-2xl mb-4 flex items-center justify-center gap-2" style={{ color: currentTheme === 'day' ? '#1e293b' : '#fff' }}>
            <span className="text-3xl">🎬</span> Netflix
          </h4>
          <div className={currentTheme === 'day' ? 'bg-white p-5 rounded-xl shadow-sm border border-slate-100' : 'bg-slate-900/50 p-5 rounded-xl shadow-sm border border-slate-700'}>
            <div className={currentTheme === 'day' ? 'bg-slate-100 p-3 rounded-lg border' : 'bg-slate-800/50 p-3 rounded-lg border border-slate-700'}>
              <span className="font-semibold" style={{ color: currentTheme === 'day' ? '#475569' : 'rgba(255,255,255,0.8)' }}>
                Profile:
              </span>
              <span className="ml-3 font-mono text-lg font-bold" style={{ color: currentTheme === 'day' ? '#334155' : '#fff' }}>
                GrappA
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'grocery',
    title: 'Grocery Store',
    gradient: currentTheme === 'day' ? 'from-slate-100/50 to-slate-200/50' : 'from-slate-700/70 via-gray-300/10 to-gray-900/70',
    content: (
      <div className={language === 'en' ? 'text-center space-y-6' : 'text-right space-y-6'} dir={language === 'en' ? 'ltr' : 'rtl'}>
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-6 rounded-xl border border-slate-200' : 'bg-slate-800/50 p-6 rounded-xl border border-slate-600'}>
          <h4 className="font-bold text-2xl text-center mb-6" style={{ color: currentTheme === 'day' ? '#1e293b' : '#fff' }}>
            {language === 'en' ? 'The Grocery Store' : 'המרכולית'}
          </h4>
          <div className={currentTheme === 'day' ? 'bg-white p-2 rounded-xl shadow-sm border border-slate-100 mb-4' : 'bg-slate-900/50 p-2 rounded-xl shadow-sm border border-slate-700 mb-4'}>
            <img src="/Grocery_hours.jpg" alt="Grocery store hours" className="w-full rounded-lg cursor-pointer" onClick={() => openImage('/Grocery_hours.jpg')} />
          </div>
          <a href="https://maps.app.goo.gl/ZQu19jrZTdUjW7pF6" target="_blank" rel="noopener noreferrer" className="block bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-md font-bold text-lg haptic">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
              Google Maps
            </span>
          </a>
        </div>
      </div>
    ),
  },
  {
    id: 'pool',
    title: 'Swimming Pool',
    gradient: currentTheme === 'day' ? 'from-slate-100/50 to-slate-200/50' : 'from-slate-800/70 via-white/20 to-slate-900/70',
    content: (
      <div className={language === 'en' ? 'text-center space-y-6' : 'text-right space-y-6'} dir={language === 'en' ? 'ltr' : 'rtl'}>
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-6 rounded-xl border border-slate-200' : 'bg-slate-800/50 p-6 rounded-xl border border-slate-600'}>
          <h4 className="font-bold text-2xl text-center mb-2 flex items-center justify-center gap-2" style={{ color: currentTheme === 'day' ? '#1e293b' : '#fff' }}>
            <span className="text-3xl">🏊‍♂️</span> {language === 'en' ? 'The Pool' : 'הבריכה'}
          </h4>
          <p className="text-sm text-center mb-4" style={{ color: currentTheme === 'day' ? '#475569' : 'rgba(255,255,255,0.9)' }}>
            {language === 'en' ? 'The bathing season begins on Passover and ends after Sukkot' : 'עונת הרחצה מתחילה בפסח ונגמרת אחרי סוכות'}
          </p>
          <div className={currentTheme === 'day' ? 'bg-white p-2 rounded-xl shadow-sm border border-slate-100 mb-4' : 'bg-slate-900/50 p-2 rounded-xl shadow-sm border border-slate-700 mb-4'}>
            <img src="/swiming_pool_instructions.png?v=4" alt="Pool hours" className="w-full rounded-lg cursor-pointer" onClick={() => openImage('/swiming_pool_instructions.png?v=4')} />
          </div>
          <a href="https://maps.app.goo.gl/2DS7aXFMvxGATqcY8" target="_blank" rel="noopener noreferrer" className="block bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-md font-bold text-lg haptic">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
              Google Maps
            </span>
          </a>
        </div>
      </div>
    ),
  },
  {
    id: 'spa',
    title: 'Spa & Wellness',
    gradient: currentTheme === 'day' ? 'from-slate-100/50 to-slate-200/50' : 'from-gray-700/70 via-gray-100/8 to-slate-900/70',
    content: (
      <div className={language === 'en' ? 'text-center' : 'text-right'} dir={language === 'en' ? 'ltr' : 'rtl'}>
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-8 rounded-xl border border-slate-200' : 'bg-slate-800/50 p-8 rounded-xl border border-slate-600'}>
          <h4 className="font-bold text-3xl mb-4 text-center" style={{ color: currentTheme === 'day' ? '#1f2937' : '#fff' }}>
            {language === 'en' ? 'Spa Services' : 'שירותי ספא'}
          </h4>
          <p className="text-lg mb-6 text-center" style={{ color: currentTheme === 'day' ? '#4b5563' : 'rgba(255,255,255,0.9)' }}>
            {language === 'en' ? 'To book treatments, please contact Dafna.' : 'להזמנת טיפולים, אנא צרו קשר עם דפנה.'}
          </p>
          <div className={currentTheme === 'day' ? 'bg-white p-5 rounded-xl shadow-sm border border-slate-100 space-y-4 text-center' : 'bg-slate-900/50 p-5 rounded-xl shadow-sm border border-slate-700 space-y-4 text-center'}>
            <p className="font-medium text-xl" style={{ color: currentTheme === 'day' ? '#475569' : 'rgba(255,255,255,0.9)' }}>
              <span className="font-semibold">{language === 'en' ? 'Dafna: ' : 'דפנה: '}</span>
              <a href="tel:050-555-1383" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                050-555-1383
              </a>
            </p>
            <div className={currentTheme === 'day' ? 'bg-white rounded-lg shadow-sm border' : 'bg-slate-800/50 rounded-lg shadow-sm border border-slate-700'}>
              <img src="https://i.imgur.com/5vg5NXj.png" alt="info" className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openImage('https://i.imgur.com/5vg5NXj.png')} />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'sushi',
    title: 'Sushi Restaurant',
    gradient: currentTheme === 'day' ? 'from-slate-100/50 to-slate-200/50' : 'from-gray-800/70 via-white/15 to-gray-700/70',
    content: (
      <div className={language === 'en' ? 'text-center' : 'text-right'} dir={language === 'en' ? 'ltr' : 'rtl'}>
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-6 rounded-xl border border-slate-200' : 'bg-slate-800/50 p-6 rounded-xl border border-slate-600'}>
          <h4 className="font-bold mb-6 text-2xl text-center flex items-center justify-center gap-2" style={{ color: currentTheme === 'day' ? '#1e293b' : '#fff' }}>
            <span className="text-3xl">🍣</span> {language === 'en' ? 'The Sushi Restaurant' : 'מסעדת הסושי'}
          </h4>
          <div className={currentTheme === 'day' ? 'bg-white p-4 rounded-xl shadow-sm border border-slate-100' : 'bg-slate-900/50 p-4 rounded-xl shadow-sm border border-slate-700'}>
            <img src="https://i.imgur.com/ChMRT7d.jpg" alt="Sushi Menu" className="w-full rounded-lg cursor-pointer shadow-md" onClick={() => openImage('https://i.imgur.com/ChMRT7d.jpg')} />
            <p className="text-sm mt-3 text-center font-semibold" style={{ color: currentTheme === 'day' ? '#4b5563' : 'rgba(255,255,255,0.8)' }}>
              {language === 'en' ? 'Full Menu with Prices' : 'תפריט מלא עם מחירים'}
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'trips',
    title: 'Local Hikes',
    gradient: currentTheme === 'day' ? 'from-slate-100/50 to-slate-200/50' : 'from-slate-800/70 via-gray-100/15 to-gray-900/70',
    content: (
      <div className={language === 'en' ? 'text-left space-y-6' : 'text-right space-y-6'} dir={language === 'en' ? 'ltr' : 'rtl'}>
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-4 rounded-lg border border-slate-200' : 'bg-slate-800/50 p-4 rounded-lg border border-slate-600'}>
          <h4 className="font-bold mb-3 text-lg" style={{ color: currentTheme === 'day' ? '#1e293b' : '#fff' }}>
            {language === 'en' ? 'Navigation Apps' : 'אפליקציית ניווט'}
          </h4>
          <div className="space-y-3">
            <a href="https://play.google.com/store/apps/details?id=altitude.alarm.erol.apps" target="_blank" rel="noopener noreferrer" className="block bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg text-center transition-all duration-300 haptic shadow-md">
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  android
                </span>
                ALTLAS app
              </span>
            </a>
            <a href="https://apps.apple.com/us/app/alltrails-hike-bike-run/id405075943" target="_blank" rel="noopener noreferrer" className="block bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg text-center transition-all duration-300 haptic shadow-md">
              <span className="flex items-center justify-center gap-2">
                <IosIcon />
                AllTrails app
              </span>
            </a>
          </div>
        </div>
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-4 rounded-lg border border-slate-200' : 'bg-slate-800/50 p-4 rounded-lg border border-slate-600'}>
          <h4 className="font-bold mb-3 text-lg" style={{ color: currentTheme === 'day' ? '#1e293b' : '#fff' }}>
            {language === 'en' ? 'Trail Gate Location' : 'מיקום השער למסלולים'}
          </h4>
          <a href="https://maps.app.goo.gl/Xght4GWp1JN8Botg7" target="_blank" rel="noopener noreferrer" className="block bg-slate-600 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg text-center transition-all duration-300 haptic shadow-md">
            Google Maps
          </a>
        </div>
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-4 rounded-lg border border-slate-200' : 'bg-slate-800/50 p-4 rounded-lg border border-slate-600'}>
          <h4 className="font-bold mb-3 text-lg flex items-center justify-center gap-2" style={{ color: currentTheme === 'day' ? '#1e293b' : '#fff' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              download
            </span>
            {language === 'en' ? 'Downloadable Trails' : 'מסלולים להורדה'}
          </h4>
          <div className="space-y-3">
            <a href="/walk_to_the_bulbouse_mountain.gpx" download="Bulbous_Mountain_Trail.gpx" className="block bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg text-center transition-all duration-300 shadow-md font-semibold btn-premium haptic">
              {language === 'en' ? '5km Trail to White Mountain and Bulbous Rocks' : 'מסלול 5 ק"מ להר הלבן ולבולבוסים'}
            </a>
            <a href="/Zepp20230405100344.gpx" download="14km_trip_to_the_mountains.gpx" className="block bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg text-center transition-all duration-300 shadow-md font-semibold btn-premium haptic">
              {language === 'en' ? '14km Trail to the High Mountain' : 'מסלול להר הגבוה 14 ק"מ'}
            </a>
            <a href="/Zepp20230118153553.gpx" download="12km_trip_to_mountains.gpx" className="block bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg text-center transition-all duration-300 shadow-md font-semibold btn-premium haptic">
              {language === 'en' ? '12km Trail to Southern and Western Views' : 'מסלול אל נופי הדרום והמערב 12 ק"מ'}
            </a>
            <a href="/12km_walk.gpx" download="12km_trip.gpx" className="block bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg text-center transition-all duration-300 shadow-md font-semibold btn-premium haptic">
              {language === 'en' ? '12km Trail to Southern Views' : 'מסלול אל נופי הדרום 12 ק"מ'}
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'trail_services',
    title: 'Trail Services',
    gradient: currentTheme === 'day' ? 'from-slate-100/50 to-slate-200/50' : 'from-gray-700/70 via-white/8 to-slate-800/70',
    content: (
      <div className={language === 'en' ? 'text-center space-y-6' : 'text-right space-y-6'} dir={language === 'en' ? 'ltr' : 'rtl'}>
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-4 rounded-lg border border-slate-200' : 'bg-slate-800/50 p-4 rounded-lg border border-slate-600'}>
          <h4 className="font-bold mb-3 text-lg text-center" style={{ color: currentTheme === 'day' ? '#1e293b' : '#fff' }}>
            {language === 'en' ? 'Pablo' : 'פאבלו'} -{' '}
            <a href="tel:053-9646316" className="text-blue-600 hover:text-blue-700 hover:underline">
              053-9646316
            </a>
          </h4>
          <div className="bg-white rounded-lg shadow-sm border">
            <img src="https://i.imgur.com/MBYTWps.png" alt="Logistics info" className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openImage('https://i.imgur.com/MBYTWps.png')} />
          </div>
        </div>
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-6 rounded-xl border border-slate-200' : 'bg-slate-800/50 p-6 rounded-xl border border-slate-600'}>
          <h4 className="font-bold mb-4 text-lg text-center" style={{ color: currentTheme === 'day' ? '#1e293b' : '#fff' }}>
            {language === 'en' ? 'Jeep Tours with Mr. Desert' : "טיולי ג'יפים עם מר מדבר"}
          </h4>
          <div className={currentTheme === 'day' ? 'bg-white p-4 rounded-xl shadow-sm border border-slate-100 space-y-3 text-center' : 'bg-slate-900/50 p-4 rounded-xl shadow-sm border border-slate-700 space-y-3 text-center'}>
            <p className="font-medium" style={{ color: currentTheme === 'day' ? '#475569' : 'rgba(255,255,255,0.9)' }}>
              <span className="font-semibold">{language === 'en' ? 'Phone: ' : 'טלפון: '}</span>
              <a href="tel:054-4249783" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                054-4249783
              </a>
            </p>
            <p className="font-medium" style={{ color: currentTheme === 'day' ? '#475569' : 'rgba(255,255,255,0.9)' }}>
              <span className="font-semibold">{language === 'en' ? 'Email: ' : 'אימייל: '}</span>
              <a href="mailto:marmidbar@gmail.com" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                marmidbar@gmail.com
              </a>
            </p>
            <a href="https://aravadesert.co.il/marmaidbar/" target="_blank" rel="noopener noreferrer" className="!mt-4 block bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg text-center transition-all duration-300 haptic font-semibold shadow-md">
              {language === 'en' ? 'Visit Website' : 'לאתר האינטרנט'}
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'checkout',
    title: 'Check-out Info',
    gradient: currentTheme === 'day' ? 'from-slate-100/50 to-slate-200/50' : 'from-gray-900/70 via-white/12 to-slate-700/70',
    content: (
      <div className={language === 'en' ? 'text-left' : 'text-right'} dir={language === 'en' ? 'ltr' : 'rtl'}>
        <div className={currentTheme === 'day' ? 'bg-slate-50 p-8 rounded-xl border border-slate-200' : 'bg-slate-800/50 p-8 rounded-xl border border-slate-600'}>
          <h4 className="font-bold mb-4 text-2xl text-center" style={{ color: currentTheme === 'day' ? '#1e293b' : '#fff' }}>
            {language === 'en' ? 'Check-out Instructions' : "הוראות צ'ק-אאוט"}
          </h4>
          <div className="space-y-4 text-lg" style={{ color: currentTheme === 'day' ? '#475569' : 'rgba(255,255,255,0.9)' }}>
            <p>
              {language === 'en' ? 'Check-out time is until' : "זמן הצ'ק-אאוט הוא עד השעה"}{' '}
              <strong className="font-semibold" style={{ color: currentTheme === 'day' ? '#1e293b' : '#fff' }}>
                11:00
              </strong>{' '}
              {language === 'en' ? 'AM' : 'בבוקר'}.
            </p>
            <p>{language === 'en' ? 'Please ensure all windows are closed and the air conditioner is turned off.' : 'אנא ודאו שכל החלונות סגורים והמזגן כבוי.'}</p>
            <p>{language === 'en' ? "Leave the key on the table and make sure you haven't forgotten anything." : 'את המפתח השאירו על השולחן וודאו שלא שכחתם דבר.'}</p>
            <p className="mt-6 font-semibold">{language === 'en' ? 'Thank you and we hope you enjoyed your stay!' : 'תודה רבה ומקווים שנהניתם!'}</p>
          </div>
        </div>
      </div>
    ),
  },
];
