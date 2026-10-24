import React from 'react';

interface MophLogoProps {
  className?: string;
  size?: number | string;
}

export function MophLogo({ className = "select-none flex-shrink-0", size = 44 }: MophLogoProps) {
  // #007044 is the authentic official vibrant green from the Ministry of Public Health logo
  const MOPH_GREEN = "#007044";
  
  return (
    <svg 
      className={className} 
      style={{ width: size, height: size }}
      viewBox="0 0 160 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      id="moph-official-seal"
    >
      {/* Outer Circle White Base */}
      <circle cx="80" cy="80" r="78" fill="#ffffff" />
      {/* Outermost thin green border */}
      <circle cx="80" cy="80" r="76" stroke={MOPH_GREEN} strokeWidth="1.6" />
      {/* Secondary thin green border to form the beautiful double-line of the outer ring */}
      <circle cx="80" cy="80" r="73.2" stroke={MOPH_GREEN} strokeWidth="0.8" />
      
      {/* Inner Green Circle Base filled with authentic forest-slate green */}
      <circle cx="80" cy="80" r="51.5" fill={MOPH_GREEN} />
      {/* Outer borders of the inner green circle to form the beautiful double-line of the inner ring */}
      <circle cx="80" cy="80" r="54" stroke={MOPH_GREEN} strokeWidth="1.3" />
      <circle cx="80" cy="80" r="56.5" stroke={MOPH_GREEN} strokeWidth="0.7" />
      
      {/* White Accent Ring inside the green circle to add gorgeous contrast and match the official seal */}
      <circle cx="80" cy="80" r="48.5" stroke="#ffffff" strokeWidth="0.9" fill="none" />
      
      {/* Central Emblem Group (Rod of Asclepius, Serpents, Flame, Wings) */}
      <g transform="translate(80, 80) scale(0.92)">
        {/* Rod / Staff of Asclepius */}
        <line x1="0" y1="-32" x2="0" y2="38" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="0" cy="-35" r="3.5" fill="#ffffff" />
        
        {/* Sacred Flame Torch Head (curls and layered fire elements in pure white for high contrast on green) */}
        {/* Center torch flame tongue */}
        <path d="M 0 -35 C -3 -42, -1 -52, 0 -58 C 1 -52, 3 -42, 0 -35 Z" fill="#ffffff" />
        {/* Left flame tongue */}
        <path d="M -2 -34 C -7 -38, -10 -46, -6 -50 C -5 -45, -3 -41, -2 -34 Z" fill="#ffffff" />
        {/* Right flame tongue */}
        <path d="M 2 -34 C 7 -38, 10 -46, 6 -50 C 5 -45, 3 -41, 2 -34 Z" fill="#ffffff" />
        
        {/* Torch support cup at top of staff */}
        <path d="M -5 -32 L 5 -32 L 3 -28 L -3 -28 Z" fill="#ffffff" />

        {/* High-Fidelity Multi-Layered Thai Style Wings */}
        {/* Left Wing Layers */}
        <path d="M -2,-13 C -14,-22 -32,-20 -38,-4 C -34,1 -24,4 -14,-1 Z" fill="#ffffff" stroke={MOPH_GREEN} strokeWidth="0.85" />
        <path d="M -2,-8 C -12,-15 -28,-11 -32,4 C -28,7 -18,8 -10,3 Z" fill="#ffffff" stroke={MOPH_GREEN} strokeWidth="0.85" />
        <path d="M -2,-3 C -10,-8 -22,-4 -24,10 C -20,11 -12,10 -6,6 Z" fill="#ffffff" stroke={MOPH_GREEN} strokeWidth="0.85" />
        <path d="M -2,2 C -7,0 -14,3 -14,14 C -10,13 -6,11 -2,7 Z" fill="#ffffff" stroke={MOPH_GREEN} strokeWidth="0.85" />

        {/* Right Wing Layers */}
        <path d="M 2,-13 C 14,-22 32,-20 38,-4 C 34,1 24,4 14,-1 Z" fill="#ffffff" stroke={MOPH_GREEN} strokeWidth="0.85" />
        <path d="M 2,-8 C 12,-15 28,-11 32,4 C 28,7 18,8 10,3 Z" fill="#ffffff" stroke={MOPH_GREEN} strokeWidth="0.85" />
        <path d="M 2,-3 C 10,-8 22,-4 24,10 C 20,11 12,10 6,6 Z" fill="#ffffff" stroke={MOPH_GREEN} strokeWidth="0.85" />
        <path d="M 2,2 C 7,0 14,3 14,14 C 10,13 6,11 2,7 Z" fill="#ffffff" stroke={MOPH_GREEN} strokeWidth="0.85" />

        {/* Beautifully Intertwined Coiled Serpents (Phaya Naga style) with detailed scaling outlines */}
        {/* Serpent Bodies: Left snake winding */}
        <path d="M0,32 C-12,27 -12,17 0,12 C12,7 12,-3 0,-8 C-12,-13 -12,-21 0,-25" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M0,32 C-12,27 -12,17 0,12 C12,7 12,-3 0,-8 C-12,-13 -12,-21 0,-25" stroke={MOPH_GREEN} strokeWidth="0.8" strokeLinecap="round" fill="none" />
        
        {/* Serpent Bodies: Right snake winding */}
        <path d="M0,32 C12,27 12,17 0,12 C-12,7 -12,-3 0,-8 C12,-13 12,-21 0,-25" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M0,32 C12,27 12,17 0,12 C-12,7 -12,-3 0,-8 C12,-13 12,-21 0,-25" stroke={MOPH_GREEN} strokeWidth="0.8" strokeLinecap="round" fill="none" />

        {/* Dragon-Naga heads with elegant decorative crown crests */}
        {/* Left head facing right */}
        <path d="M -2,-25 Q -5,-27 -8,-25 Q -10,-22 -7,-20 Q -4,-22 -2,-25" fill="#ffffff" />
        <path d="M -8,-25 C -12,-31 -11,-24 -8,-25" stroke="#ffffff" strokeWidth="1.2" fill="#ffffff" strokeLinecap="round" />
        <circle cx="-5" cy="-23" r="0.6" fill={MOPH_GREEN} />

        {/* Right head facing left */}
        <path d="M 2,-25 Q 5,-27 8,-25 Q 10,-22 7,-20 Q 4,-22 2,-25" fill="#ffffff" />
        <path d="M 8,-25 C 12,-31 11,-24 8,-25" stroke="#ffffff" strokeWidth="1.2" fill="#ffffff" strokeLinecap="round" />
        <circle cx="5" cy="-23" r="0.6" fill={MOPH_GREEN} />

        {/* Traditional Thai Pedestal Base at bottom of the staff */}
        <path d="M -12,34 C -6,36 6,36 12,34 L 8,40 C 4,38 -4,38 -8,40 Z" fill="#ffffff" />
        <path d="M -6,40 L 6,40 L 4,44 L -4,44 Z" fill="#ffffff" />
        <circle cx="0" cy="46" r="2" fill="#ffffff" />
      </g>
      
      {/* Decorative Thai Phikul/Prachamyam Flower Ornaments on Left and Right Sides */}
      {/* Left side flower ornament */}
      <g transform="translate(15, 80) scale(0.48)">
        <circle cx="0" cy="0" r="3.5" fill={MOPH_GREEN} />
        <path d="M 0,0 C -3,-6 0,-12 0,-12 C 0,-12 3,-6 0,0 Z" fill={MOPH_GREEN} stroke="#ffffff" strokeWidth="0.8" />
        <path d="M 0,0 C -3,6 0,12 0,12 C 0,12 3,6 0,0 Z" fill={MOPH_GREEN} stroke="#ffffff" strokeWidth="0.8" />
        <path d="M 0,0 C -6,-3 -12,0 -12,0 C -12,0 -6,3 0,0 Z" fill={MOPH_GREEN} stroke="#ffffff" strokeWidth="0.8" />
        <path d="M 0,0 C 6,-3 12,0 12,0 C 12,0 6,3 0,0 Z" fill={MOPH_GREEN} stroke="#ffffff" strokeWidth="0.8" />
        {/* Diamond leaves */}
        <path d="M 0,0 L -5,-5" stroke={MOPH_GREEN} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 0,0 L 5,-5" stroke={MOPH_GREEN} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 0,0 L -5,5" stroke={MOPH_GREEN} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 0,0 L 5,5" stroke={MOPH_GREEN} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="0" cy="0" r="1" fill="#ffffff" />
      </g>
      {/* Right side flower ornament */}
      <g transform="translate(145, 80) scale(0.48)">
        <circle cx="0" cy="0" r="3.5" fill={MOPH_GREEN} />
        <path d="M 0,0 C -3,-6 0,-12 0,-12 C 0,-12 3,-6 0,0 Z" fill={MOPH_GREEN} stroke="#ffffff" strokeWidth="0.8" />
        <path d="M 0,0 C -3,6 0,12 0,12 C 0,12 3,6 0,0 Z" fill={MOPH_GREEN} stroke="#ffffff" strokeWidth="0.8" />
        <path d="M 0,0 C -6,-3 -12,0 -12,0 C -12,0 -6,3 0,0 Z" fill={MOPH_GREEN} stroke="#ffffff" strokeWidth="0.8" />
        <path d="M 0,0 C 6,-3 12,0 12,0 C 12,0 6,3 0,0 Z" fill={MOPH_GREEN} stroke="#ffffff" strokeWidth="0.8" />
        {/* Diamond leaves */}
        <path d="M 0,0 L -5,-5" stroke={MOPH_GREEN} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 0,0 L 5,-5" stroke={MOPH_GREEN} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 0,0 L -5,5" stroke={MOPH_GREEN} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 0,0 L 5,5" stroke={MOPH_GREEN} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="0" cy="0" r="1" fill="#ffffff" />
      </g>

      {/* Curved Paths for elegant Text layout inside the white concentric track (Radius 65) */}
      <path id="textPathTop" d="M 15 80 A 65 65 0 0 1 145 80" fill="none" />
      <path id="textPathBottom" d="M 15 80 A 65 65 0 0 0 145 80" fill="none" />

      {/* Curved Text - Thai (Top, clockwise-facing outwards) with authentic font */}
      <text fontSize="11" fontWeight="800" fill={MOPH_GREEN} letterSpacing="0.4" fontFamily="Sarabun, Inter, system-ui, sans-serif">
        <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
          กระทรวงสาธารณสุข
        </textPath>
      </text>

      {/* Curved Text - English (Bottom, counterclockwise-facing inwards) */}
      <text fontSize="7.8" fontWeight="850" fill={MOPH_GREEN} letterSpacing="0.45" fontFamily="Sarabun, Inter, system-ui, sans-serif">
        <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
          MINISTRY OF PUBLIC HEALTH
        </textPath>
      </text>
    </svg>
  );
}
