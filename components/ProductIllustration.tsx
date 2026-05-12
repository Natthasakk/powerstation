export default function ProductIllustration() {
  return (
    <svg
      viewBox="0 0 760 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="VoltCore Pro 2000 portable power station"
      className="block w-full max-w-[760px]"
    >
      {/* Shadow */}
      <ellipse cx="380" cy="350" rx="280" ry="14" fill="#1D1D1F" opacity="0.10" />

      {/* Main body */}
      <rect x="100" y="60" width="560" height="272" rx="24" fill="#1D1D1F" />
      <rect x="100" y="60" width="560" height="2" rx="1" fill="#3A3A3C" opacity="0.8" />
      <rect x="100" y="60" width="2" height="272" rx="1" fill="#3A3A3C" opacity="0.5" />

      {/* Front face */}
      <rect x="108" y="68" width="544" height="256" rx="18" fill="#242426" />

      {/* Handle */}
      <rect x="310" y="36" width="140" height="36" rx="18" fill="#2C2C2E" />
      <rect x="316" y="42" width="128" height="24" rx="12" fill="#1A1A1C" />

      {/* Display screen */}
      <rect x="130" y="100" width="210" height="148" rx="10" fill="#0A0A0C" />
      <rect x="138" y="108" width="194" height="132" rx="7" fill="#0D1117" />
      <rect x="138" y="108" width="194" height="132" rx="7" fill="url(#screenGlow)" opacity="0.6" />

      {/* Screen: percentage */}
      <text x="235" y="168" textAnchor="middle" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif" fontSize="42" fontWeight="700" fill="#0071E3">
        86%
      </text>
      {/* Screen: charge bar bg */}
      <rect x="158" y="178" width="154" height="8" rx="4" fill="#1C1C1E" />
      <rect x="158" y="178" width="132" height="8" rx="4" fill="#0071E3" />

      {/* Screen: labels row */}
      <text x="158" y="203" fontFamily="-apple-system,sans-serif" fontSize="11" fill="#48484A">INPUT</text>
      <text x="235" y="203" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="11" fill="#48484A">REMAINING</text>
      <text x="312" y="203" textAnchor="end" fontFamily="-apple-system,sans-serif" fontSize="11" fill="#48484A">OUTPUT</text>
      <text x="158" y="220" fontFamily="-apple-system,sans-serif" fontSize="13" fontWeight="600" fill="#34C759">800W</text>
      <text x="235" y="220" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="11" fill="#636366">4.2 hrs left</text>
      <text x="312" y="220" textAnchor="end" fontFamily="-apple-system,sans-serif" fontSize="13" fontWeight="600" fill="#FF9F0A">340W</text>

      {/* AC outlets label */}
      <text x="370" y="116" fontFamily="-apple-system,sans-serif" fontSize="10" fill="#636366" letterSpacing="1">AC OUTPUT</text>

      {/* AC outlet 1 */}
      <rect x="368" y="124" width="54" height="44" rx="6" fill="#1A1A1C" />
      <ellipse cx="384" cy="143" rx="6.5" ry="8" stroke="#636366" strokeWidth="1.5" fill="none" />
      <ellipse cx="406" cy="143" rx="6.5" ry="8" stroke="#636366" strokeWidth="1.5" fill="none" />
      <line x1="395" y1="154" x2="395" y2="162" stroke="#636366" strokeWidth="1.5" strokeLinecap="round" />

      {/* AC outlet 2 */}
      <rect x="430" y="124" width="54" height="44" rx="6" fill="#1A1A1C" />
      <ellipse cx="446" cy="143" rx="6.5" ry="8" stroke="#636366" strokeWidth="1.5" fill="none" />
      <ellipse cx="468" cy="143" rx="6.5" ry="8" stroke="#636366" strokeWidth="1.5" fill="none" />
      <line x1="457" y1="154" x2="457" y2="162" stroke="#636366" strokeWidth="1.5" strokeLinecap="round" />

      {/* AC outlet 3 */}
      <rect x="368" y="176" width="54" height="44" rx="6" fill="#1A1A1C" />
      <ellipse cx="384" cy="195" rx="6.5" ry="8" stroke="#636366" strokeWidth="1.5" fill="none" />
      <ellipse cx="406" cy="195" rx="6.5" ry="8" stroke="#636366" strokeWidth="1.5" fill="none" />
      <line x1="395" y1="206" x2="395" y2="214" stroke="#636366" strokeWidth="1.5" strokeLinecap="round" />

      {/* AC outlet 4 */}
      <rect x="430" y="176" width="54" height="44" rx="6" fill="#1A1A1C" />
      <ellipse cx="446" cy="195" rx="6.5" ry="8" stroke="#636366" strokeWidth="1.5" fill="none" />
      <ellipse cx="468" cy="195" rx="6.5" ry="8" stroke="#636366" strokeWidth="1.5" fill="none" />
      <line x1="457" y1="206" x2="457" y2="214" stroke="#636366" strokeWidth="1.5" strokeLinecap="round" />

      {/* USB label */}
      <text x="502" y="116" fontFamily="-apple-system,sans-serif" fontSize="10" fill="#636366" letterSpacing="1">USB</text>

      {/* USB-C 140W × 2 */}
      <rect x="500" y="124" width="28" height="14" rx="3" fill="#0071E3" opacity="0.9" />
      <text x="514" y="134" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="white" fontWeight="600">140W</text>
      <rect x="500" y="142" width="28" height="14" rx="3" fill="#0071E3" opacity="0.9" />
      <text x="514" y="152" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="white" fontWeight="600">140W</text>

      {/* USB-C 60W × 2 */}
      <rect x="500" y="160" width="28" height="14" rx="3" fill="#5AC8FA" opacity="0.9" />
      <text x="514" y="170" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="white" fontWeight="600">60W</text>
      <rect x="500" y="178" width="28" height="14" rx="3" fill="#5AC8FA" opacity="0.9" />
      <text x="514" y="188" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="white" fontWeight="600">60W</text>

      {/* USB-A × 2 */}
      <rect x="500" y="196" width="28" height="10" rx="2" fill="#3A3A3C" />
      <text x="514" y="204" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="#9D9D9F">USB-A</text>
      <rect x="500" y="210" width="28" height="10" rx="2" fill="#3A3A3C" />
      <text x="514" y="218" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="7" fill="#9D9D9F">USB-A</text>

      {/* DC label */}
      <text x="548" y="116" fontFamily="-apple-system,sans-serif" fontSize="10" fill="#636366" letterSpacing="1">DC</text>

      {/* Car outlet */}
      <circle cx="571" cy="148" r="22" fill="#1A1A1C" />
      <circle cx="571" cy="148" r="15" stroke="#636366" strokeWidth="1.5" fill="none" />
      <circle cx="571" cy="148" r="5" fill="#636366" />
      <text x="571" y="183" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="9" fill="#636366">12V / 10A</text>

      {/* Anderson / Solar */}
      <rect x="548" y="196" width="46" height="24" rx="5" fill="#1A1A1C" />
      <circle cx="564" cy="208" r="6" stroke="#FF9F0A" strokeWidth="1.5" fill="none" />
      <circle cx="580" cy="208" r="6" stroke="#FF9F0A" strokeWidth="1.5" fill="none" />

      {/* Bottom brand */}
      <line x1="130" y1="285" x2="630" y2="285" stroke="#1A1A1C" strokeWidth="1" />
      <text x="380" y="305" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="11" fontWeight="500" fill="#48484A" letterSpacing="3">
        VOLTCORE PRO 2000
      </text>
      <line x1="200" y1="318" x2="560" y2="318" stroke="#1A1A1C" strokeWidth="1" />
      <line x1="210" y1="323" x2="550" y2="323" stroke="#1A1A1C" strokeWidth="0.75" />

      <defs>
        <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0071E3" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
