export default function LineupIllustration() {
  return (
    <svg
      viewBox="0 0 820 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="VoltCore lineup — Lite 1000, Pro 2000, Max 4000"
      className="block w-full max-w-[820px]"
    >
      <defs>
        <radialGradient id="glowGreen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34C759" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#34C759" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glowBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0071E3" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glowOrange" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF9F0A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FF9F0A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── LITE 1000 — Left, small, green ── */}
      <ellipse cx="155" cy="342" rx="88" ry="7" fill="#1D1D1F" opacity="0.08" />
      <rect x="65" y="160" width="180" height="172" rx="16" fill="#1D1D1F" />
      <rect x="65" y="160" width="180" height="4" rx="2" fill="#34C759" />
      <rect x="73" y="168" width="164" height="156" rx="11" fill="#242426" />
      <rect x="112" y="138" width="86" height="24" rx="12" fill="#2C2C2E" />
      <rect x="118" y="144" width="74" height="12" rx="6" fill="#1A1A1C" />
      <rect x="84" y="180" width="78" height="56" rx="6" fill="#0A0A0C" />
      <rect x="90" y="186" width="66" height="44" rx="4" fill="#0D1117" />
      <rect x="90" y="186" width="66" height="44" rx="4" fill="url(#glowGreen)" opacity="0.7" />
      <text x="123" y="212" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="22" fontWeight="700" fill="#34C759">74%</text>
      <rect x="96" y="219" width="54" height="5" rx="2.5" fill="#1C1C1E" />
      <rect x="96" y="219" width="40" height="5" rx="2.5" fill="#34C759" />
      <text x="178" y="192" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="8" fill="#636366" letterSpacing="1">AC</text>
      <rect x="165" y="198" width="40" height="30" rx="4" fill="#1A1A1C" />
      <ellipse cx="177" cy="211" rx="4.5" ry="5.5" stroke="#636366" strokeWidth="1.2" fill="none" />
      <ellipse cx="193" cy="211" rx="4.5" ry="5.5" stroke="#636366" strokeWidth="1.2" fill="none" />
      <line x1="185" y1="219" x2="185" y2="224" stroke="#636366" strokeWidth="1.2" strokeLinecap="round" />
      <text x="178" y="244" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="8" fill="#636366" letterSpacing="1">USB</text>
      <rect x="165" y="249" width="18" height="9" rx="2" fill="#34C759" opacity="0.8" />
      <rect x="185" y="249" width="18" height="9" rx="2" fill="#34C759" opacity="0.6" />
      <rect x="165" y="261" width="18" height="9" rx="2" fill="#3A3A3C" />
      <rect x="185" y="261" width="18" height="9" rx="2" fill="#3A3A3C" />
      <line x1="84" y1="296" x2="221" y2="296" stroke="#1A1A1C" strokeWidth="1" />
      <text x="155" y="312" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="9" fontWeight="500" fill="#48484A" letterSpacing="2.5">LITE 1000</text>
      <text x="155" y="352" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="13" fontWeight="600" fill="#34C759">$899</text>

      {/* ── PRO 2000 — Center, large, blue ── */}
      <ellipse cx="410" cy="358" rx="155" ry="10" fill="#1D1D1F" opacity="0.12" />
      <rect x="260" y="68" width="300" height="280" rx="22" fill="#1D1D1F" />
      <rect x="260" y="68" width="300" height="5" rx="2.5" fill="#0071E3" />
      <rect x="270" y="77" width="280" height="263" rx="16" fill="#242426" />
      <rect x="345" y="40" width="130" height="32" rx="16" fill="#2C2C2E" />
      <rect x="352" y="47" width="116" height="18" rx="9" fill="#1A1A1C" />
      <rect x="284" y="96" width="124" height="92" rx="9" fill="#0A0A0C" />
      <rect x="292" y="104" width="108" height="76" rx="6" fill="#0D1117" />
      <rect x="292" y="104" width="108" height="76" rx="6" fill="url(#glowBlue)" opacity="0.7" />
      <text x="346" y="152" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="36" fontWeight="700" fill="#0071E3">86%</text>
      <rect x="302" y="160" width="88" height="7" rx="3.5" fill="#1C1C1E" />
      <rect x="302" y="160" width="76" height="7" rx="3.5" fill="#0071E3" />
      <text x="302" y="177" fontFamily="-apple-system,sans-serif" fontSize="9" fill="#48484A">IN: 800W</text>
      <text x="390" y="177" textAnchor="end" fontFamily="-apple-system,sans-serif" fontSize="9" fill="#48484A">Out: 340W</text>
      <text x="428" y="104" fontFamily="-apple-system,sans-serif" fontSize="9" fill="#636366" letterSpacing="1">AC OUTPUT</text>
      <rect x="424" y="112" width="40" height="32" rx="5" fill="#1A1A1C" />
      <ellipse cx="436" cy="127" rx="5" ry="6" stroke="#636366" strokeWidth="1.3" fill="none" />
      <ellipse cx="452" cy="127" rx="5" ry="6" stroke="#636366" strokeWidth="1.3" fill="none" />
      <line x1="444" y1="135" x2="444" y2="140" stroke="#636366" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="468" y="112" width="40" height="32" rx="5" fill="#1A1A1C" />
      <ellipse cx="480" cy="127" rx="5" ry="6" stroke="#636366" strokeWidth="1.3" fill="none" />
      <ellipse cx="496" cy="127" rx="5" ry="6" stroke="#636366" strokeWidth="1.3" fill="none" />
      <line x1="488" y1="135" x2="488" y2="140" stroke="#636366" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="424" y="150" width="40" height="32" rx="5" fill="#1A1A1C" />
      <ellipse cx="436" cy="165" rx="5" ry="6" stroke="#636366" strokeWidth="1.3" fill="none" />
      <ellipse cx="452" cy="165" rx="5" ry="6" stroke="#636366" strokeWidth="1.3" fill="none" />
      <line x1="444" y1="173" x2="444" y2="178" stroke="#636366" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="468" y="150" width="40" height="32" rx="5" fill="#1A1A1C" />
      <ellipse cx="480" cy="165" rx="5" ry="6" stroke="#636366" strokeWidth="1.3" fill="none" />
      <ellipse cx="496" cy="165" rx="5" ry="6" stroke="#636366" strokeWidth="1.3" fill="none" />
      <line x1="488" y1="173" x2="488" y2="178" stroke="#636366" strokeWidth="1.3" strokeLinecap="round" />
      <text x="428" y="200" fontFamily="-apple-system,sans-serif" fontSize="9" fill="#636366" letterSpacing="1">USB-C</text>
      <rect x="424" y="207" width="38" height="11" rx="2.5" fill="#0071E3" opacity="0.9" />
      <text x="443" y="216" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="white" fontWeight="600">140W</text>
      <rect x="424" y="221" width="38" height="11" rx="2.5" fill="#0071E3" opacity="0.8" />
      <text x="443" y="230" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="white" fontWeight="600">140W</text>
      <rect x="466" y="207" width="38" height="11" rx="2.5" fill="#5AC8FA" opacity="0.9" />
      <text x="485" y="216" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="white" fontWeight="600">60W</text>
      <rect x="466" y="221" width="38" height="11" rx="2.5" fill="#5AC8FA" opacity="0.8" />
      <text x="485" y="230" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="white" fontWeight="600">60W</text>
      <text x="428" y="248" fontFamily="-apple-system,sans-serif" fontSize="9" fill="#636366" letterSpacing="1">USB-A</text>
      <rect x="424" y="254" width="38" height="9" rx="2" fill="#3A3A3C" />
      <rect x="466" y="254" width="38" height="9" rx="2" fill="#3A3A3C" />
      <circle cx="530" cy="168" r="20" fill="#1A1A1C" />
      <circle cx="530" cy="168" r="13" stroke="#636366" strokeWidth="1.3" fill="none" />
      <circle cx="530" cy="168" r="4.5" fill="#636366" />
      <text x="530" y="198" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="8" fill="#636366">12V/10A</text>
      <rect x="512" y="212" width="38" height="22" rx="4" fill="#1A1A1C" />
      <circle cx="524" cy="223" r="5" stroke="#FF9F0A" strokeWidth="1.3" fill="none" />
      <circle cx="538" cy="223" r="5" stroke="#FF9F0A" strokeWidth="1.3" fill="none" />
      <line x1="284" y1="310" x2="536" y2="310" stroke="#1A1A1C" strokeWidth="1" />
      <text x="410" y="326" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="10" fontWeight="500" fill="#48484A" letterSpacing="3">VOLTCORE PRO 2000</text>
      <rect x="348" y="336" width="124" height="20" rx="10" fill="#0071E3" />
      <text x="410" y="350" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="9" fontWeight="700" fill="white" letterSpacing="0.8">MOST POPULAR</text>
      <text x="410" y="376" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="14" fontWeight="700" fill="#0071E3">$1,799</text>

      {/* ── MAX 4000 — Right, largest, orange ── */}
      <ellipse cx="670" cy="348" rx="110" ry="8" fill="#1D1D1F" opacity="0.10" />
      <rect x="575" y="110" width="200" height="230" rx="18" fill="#1D1D1F" />
      <rect x="575" y="110" width="200" height="4" rx="2" fill="#FF9F0A" />
      <rect x="584" y="119" width="183" height="213" rx="13" fill="#242426" />
      <rect x="623" y="88" width="94" height="24" rx="12" fill="#2C2C2E" />
      <rect x="629" y="94" width="82" height="12" rx="6" fill="#1A1A1C" />
      <rect x="596" y="132" width="90" height="66" rx="7" fill="#0A0A0C" />
      <rect x="603" y="139" width="76" height="52" rx="5" fill="#0D1117" />
      <rect x="603" y="139" width="76" height="52" rx="5" fill="url(#glowOrange)" opacity="0.7" />
      <text x="641" y="171" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="28" fontWeight="700" fill="#FF9F0A">92%</text>
      <rect x="610" y="178" width="62" height="6" rx="3" fill="#1C1C1E" />
      <rect x="610" y="178" width="57" height="6" rx="3" fill="#FF9F0A" />
      <text x="706" y="140" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="8" fill="#636366" letterSpacing="1">AC</text>
      <rect x="697" y="146" width="36" height="28" rx="4" fill="#1A1A1C" />
      <ellipse cx="707" cy="159" rx="4" ry="5" stroke="#636366" strokeWidth="1.2" fill="none" />
      <ellipse cx="721" cy="159" rx="4" ry="5" stroke="#636366" strokeWidth="1.2" fill="none" />
      <line x1="714" y1="166" x2="714" y2="171" stroke="#636366" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="697" y="178" width="36" height="28" rx="4" fill="#1A1A1C" />
      <ellipse cx="707" cy="191" rx="4" ry="5" stroke="#636366" strokeWidth="1.2" fill="none" />
      <ellipse cx="721" cy="191" rx="4" ry="5" stroke="#636366" strokeWidth="1.2" fill="none" />
      <line x1="714" y1="199" x2="714" y2="204" stroke="#636366" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="655" y="210" width="36" height="28" rx="4" fill="#1A1A1C" />
      <ellipse cx="665" cy="223" rx="4" ry="5" stroke="#636366" strokeWidth="1.2" fill="none" />
      <ellipse cx="679" cy="223" rx="4" ry="5" stroke="#636366" strokeWidth="1.2" fill="none" />
      <line x1="672" y1="230" x2="672" y2="235" stroke="#636366" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="697" y="210" width="36" height="28" rx="4" fill="#1A1A1C" />
      <ellipse cx="707" cy="223" rx="4" ry="5" stroke="#636366" strokeWidth="1.2" fill="none" />
      <ellipse cx="721" cy="223" rx="4" ry="5" stroke="#636366" strokeWidth="1.2" fill="none" />
      <line x1="714" y1="230" x2="714" y2="235" stroke="#636366" strokeWidth="1.2" strokeLinecap="round" />
      <text x="655" y="147" fontFamily="-apple-system,sans-serif" fontSize="8" fill="#636366" letterSpacing="1">USB-C</text>
      <rect x="653" y="152" width="32" height="10" rx="2" fill="#FF9F0A" opacity="0.85" />
      <text x="669" y="160" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="white" fontWeight="600">140W</text>
      <rect x="653" y="165" width="32" height="10" rx="2" fill="#FF9F0A" opacity="0.75" />
      <text x="669" y="173" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="white" fontWeight="600">140W</text>
      <rect x="653" y="178" width="32" height="10" rx="2" fill="#FF9F0A" opacity="0.65" />
      <text x="669" y="186" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="white" fontWeight="600">140W</text>
      <rect x="653" y="191" width="32" height="10" rx="2" fill="#FF9F0A" opacity="0.55" />
      <text x="669" y="199" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="white" fontWeight="600">140W</text>
      <rect x="596" y="212" width="46" height="26" rx="5" fill="#1A1A1C" />
      <circle cx="612" cy="225" r="7" stroke="#FF9F0A" strokeWidth="1.5" fill="none" />
      <circle cx="628" cy="225" r="7" stroke="#FF9F0A" strokeWidth="1.5" fill="none" />
      <text x="619" y="250" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="#636366">SOLAR 1600W</text>
      <line x1="596" y1="296" x2="754" y2="296" stroke="#1A1A1C" strokeWidth="1" />
      <text x="675" y="312" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="9" fontWeight="500" fill="#48484A" letterSpacing="2.5">MAX 4000</text>
      <text x="675" y="358" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="13" fontWeight="600" fill="#FF9F0A">$3,299</text>
    </svg>
  );
}
