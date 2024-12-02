const calc = (args) => {
  if (!args.length) {
    throw new Error('calc: missing expression');
  }

  const expression = args.join(' ');
  
  try {
    // Using Function instead of eval for better security
    const result = new Function('return ' + expression)();
    
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Invalid result');
    }
    
    return [result.toString()];
  } catch (error) {
    throw new Error('Invalid expression');
  }
};

export default calc; 