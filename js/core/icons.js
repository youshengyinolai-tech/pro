const PATHS = {
  mark:'<path d="M12 2 20 6.5v9L12 20l-8-4.5v-9L12 2Z"/><path d="m9 8-3 4 3 4M15 8l3 4-3 4M13.5 6l-3 12"/>',
  book:'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v17H6.5A2.5 2.5 0 0 0 4 21.5v-17ZM20 4.5A2.5 2.5 0 0 0 17.5 2H13v17h4.5a2.5 2.5 0 0 1 2.5 2.5v-17Z"/>',
  sword:'<path d="m14.5 4.5 5-2-2 5L9 16l-3 1 1-3 7.5-9.5ZM13 6l5 5M4 17l3 3M3 21l4-4"/>',
  target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
  unlock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2M12 14v3"/>',
  archive:'<path d="M4 7h16v14H4zM3 3h18v4H3zM9 11h6"/>',
  review:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  chip:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 9h6v6H9zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  shield:'<path d="M12 2 20 5v6c0 5-3.4 8.7-8 11-4.6-2.3-8-6-8-11V5l8-3Z"/><path d="m9 12 2 2 4-5"/>',
  enemy:'<path d="M5 9 3 4l5 2 4-3 4 3 5-2-2 5 1 4-3 7H7l-3-7 1-4Z"/><path d="M8 12h.01M16 12h.01M9 17l3-2 3 2"/>',
  trophy:'<path d="M8 3h8v5a4 4 0 0 1-8 0V3ZM8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4M12 12v5M8 21h8M9 17h6"/>',
  alert:'<path d="M12 3 2 21h20L12 3Z"/><path d="M12 9v5M12 18h.01"/>',
  check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  spark:'<path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"/>',
  terminal:'<path d="m5 7 4 4-4 4M11 16h8"/><rect x="2" y="3" width="20" height="18" rx="2"/>',
  node:'<circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="m9 11 6-4M9 13l6 4"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5M8 10h5M10.5 7.5v5"/>'
};

export function icon(name, cls){
  return '<svg class="uiicon'+(cls?' '+cls:'')+'" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+(PATHS[name]||PATHS.mark)+'</svg>';
}

export function stageIcon(id, isBoss){
  if(isBoss) return icon('enemy','stageglyph');
  var names=['terminal','node','chip','archive','book','node','sword','lock','review','node','enemy','terminal','chip'];
  var n=parseInt(String(id).replace(/\D/g,''),10);
  if(!Number.isFinite(n)) n=String(id).charCodeAt(String(id).length-1);
  return icon(names[Math.abs(n)%names.length],'stageglyph');
}
