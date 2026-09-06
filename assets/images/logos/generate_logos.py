import os

logos_dir = r'C:\Users\Dell\.gemini\antigravity\scratch\rishav-portfolio\assets\images\logos'
os.makedirs(logos_dir, exist_ok=True)

svgs = {
    'growthsquare.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="22" fill="#090d16"/>
  <rect x="4" y="4" width="92" height="92" rx="18" stroke="#1e293b" stroke-width="2"/>
  <!-- Modern Growth Square Geometry -->
  <path d="M28 68 L28 48 L46 48 L46 68 Z" fill="#10b981" opacity="0.3"/>
  <path d="M46 68 L46 34 L64 34 L64 68 Z" fill="#10b981" opacity="0.6"/>
  <path d="M64 68 L64 22 L82 22 L82 68 Z" fill="#10b981"/>
  <!-- Growth Arrow -->
  <path d="M24 58 L48 38 L62 48 L78 28" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline points="68,28 78,28 78,38" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="50" y="88" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#94a3b8" text-anchor="middle" letter-spacing="1">GROWTH SQ</text>
</svg>''',

    'vedantu.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="22" fill="#ff6b00"/>
  <!-- Vedantu iconic speech bubble and character -->
  <circle cx="50" cy="50" r="34" fill="#ffffff"/>
  <path d="M36 42 C36 42, 42 62, 50 62 C58 62, 64 42, 64 42" stroke="#ff6b00" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <!-- Smile dots / eyes -->
  <circle cx="43" cy="38" r="4.5" fill="#ff6b00"/>
  <circle cx="57" cy="38" r="4.5" fill="#ff6b00"/>
  <text x="50" y="90" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">VEDANTU</text>
</svg>''',

    'metvy.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="22" fill="#0a1128"/>
  <rect x="5" y="5" width="90" height="90" rx="18" stroke="#d4af37" stroke-width="2" opacity="0.6"/>
  <!-- Fellowship Laurel and Monogram -->
  <path d="M22 50 C22 32, 34 22, 50 22 C66 22, 78 32, 78 50 C78 68, 66 78, 50 78 C34 78, 22 68, 22 50 Z" stroke="#d4af37" stroke-width="2" stroke-dasharray="4 3" fill="none"/>
  <!-- Stylized M -->
  <path d="M34 64 L34 36 L50 52 L66 36 L66 64" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="50" y="88" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8.5" font-weight="800" fill="#d4af37" text-anchor="middle" letter-spacing="1">CMO FELLOWSHIP</text>
</svg>''',

    'physicswallah.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="22" fill="#000000"/>
  <circle cx="50" cy="50" r="44" stroke="#ffffff" stroke-width="2" opacity="0.2"/>
  <!-- PW Text -->
  <text x="50" y="58" font-family="'Plus Jakarta Sans', Impact, sans-serif" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="-1">PW</text>
  <!-- Red accent underline -->
  <rect x="30" y="66" width="40" height="4" rx="2" fill="#e11d48"/>
  <text x="50" y="86" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#9ca3af" text-anchor="middle" letter-spacing="1">SOS FELLOW</text>
</svg>''',

    'levo.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="22" fill="#4f46e5"/>
  <!-- Levo Geometric L -->
  <path d="M35 28 L35 70 L68 70" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="68" cy="40" r="8" fill="#38bdf8"/>
  <text x="50" y="89" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="#e0e7ff" text-anchor="middle" letter-spacing="1">LEVO</text>
</svg>''',

    'smavy.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="22" fill="#0284c7"/>
  <!-- Graduation cap / academy icon -->
  <polygon points="50,26 80,40 50,54 20,40" fill="#ffffff"/>
  <path d="M30 48 L30 64 C30 72, 70 72, 70 64 L70 48" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none"/>
  <line x1="76" y1="42" x2="76" y2="66" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
  <circle cx="76" cy="68" r="3" fill="#fde047"/>
  <text x="50" y="88" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#e0f2fe" text-anchor="middle" letter-spacing="1">SMAVY</text>
</svg>''',

    'pixstory.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="22" fill="#0f172a"/>
  <!-- Colorful Camera Aperture / Iris -->
  <circle cx="50" cy="46" r="24" stroke="#38bdf8" stroke-width="5" fill="none"/>
  <circle cx="50" cy="46" r="14" fill="#f43f5e"/>
  <circle cx="50" cy="46" r="6" fill="#ffffff"/>
  <circle cx="68" cy="28" r="4" fill="#eab308"/>
  <text x="50" y="88" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#cbd5e1" text-anchor="middle" letter-spacing="0.5">PIXSTORY</text>
</svg>''',

    'vit.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="22" fill="#003366"/>
  <!-- VIT Crest Elements -->
  <circle cx="50" cy="48" r="32" stroke="#d4af37" stroke-width="3" fill="#ffffff"/>
  <!-- Open Book & Torch -->
  <path d="M35 52 Q50 48 50 60 Q50 48 65 52" stroke="#003366" stroke-width="3" fill="none"/>
  <path d="M50 32 L50 58" stroke="#d4af37" stroke-width="3.5" stroke-linecap="round"/>
  <polygon points="50,26 46,33 54,33" fill="#ff4500"/>
  <text x="50" y="70" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="900" fill="#003366" text-anchor="middle">VIT</text>
  <text x="50" y="90" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#d4af37" text-anchor="middle" letter-spacing="1">BHOPAL</text>
</svg>''',

    'jhu.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="22" fill="#002d72"/>
  <!-- Johns Hopkins Shield -->
  <path d="M50 18 L76 26 L76 56 C76 72, 50 82, 50 82 C50 82, 24 72, 24 56 L24 26 Z" fill="#68ace5" stroke="#ffffff" stroke-width="3"/>
  <!-- Inner Book and Cross -->
  <path d="M34 40 L66 40 M50 28 L50 64" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
  <text x="50" y="74" font-family="'Plus Jakarta Sans', serif" font-size="9" font-weight="900" fill="#002d72" text-anchor="middle">JHU</text>
</svg>''',

    'ieee.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="22" fill="#00629b"/>
  <!-- IEEE Diamond -->
  <polygon points="50,18 82,50 50,82 18,50" stroke="#ffffff" stroke-width="4" fill="none"/>
  <!-- Inner IEEE symbols: circle & arrow -->
  <circle cx="50" cy="50" r="16" stroke="#ffffff" stroke-width="3" fill="none"/>
  <path d="M38 50 L62 50 M56 44 L62 50 L56 56" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="50" y="94" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">IEEE</text>
</svg>'''
}

for filename, content in svgs.items():
    path = os.path.join(logos_dir, filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f'Wrote {filename}')

print('All SVGs generated successfully!')
