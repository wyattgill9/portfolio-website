const starship = (args, { setPrompt }) => {
  if (!setPrompt) {
    throw new Error('Command not supported in this context');
  }

  setPrompt('starship');
  return ['Starship prompt activated! 🚀'];
};

export default starship; 