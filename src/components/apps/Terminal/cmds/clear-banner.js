const clearBanner = () => {
  localStorage.removeItem('hasSeenBanner');
  return ['Banner state reset. The welcome banner will show next time you open a new terminal.'];
};

export default clearBanner; 