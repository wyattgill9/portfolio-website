const system = () => {
  return [
    'System Information:',
    '',
    `OS: WyattOS v1.0.0`,
    `Browser: ${navigator.userAgent}`,
    `Language: ${navigator.language}`,
    `Platform: ${navigator.platform}`,
    `Screen Resolution: ${window.screen.width}x${window.screen.height}`,
    `Window Size: ${window.innerWidth}x${window.innerHeight}`,
    `Color Depth: ${window.screen.colorDepth}-bit`,
    `Time Zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
    ''
  ];
};

export default system; 