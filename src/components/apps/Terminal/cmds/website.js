const website = (args) => {
  const sites = {
    github: 'https://github.com/wyattgill9',
    linkedin: 'https://www.linkedin.com/in/wyatt-gill-17380b323/',
    portfolio: 'https://wyattgill.dev'
  };

  if (args.length > 0 && sites[args[0]]) {
    window.open(sites[args[0]], '_blank');
    return [`Opening ${args[0]}...`];
  }

  window.open(sites.portfolio, '_blank');
  return ['Opening portfolio website...'];
};

export default website; 