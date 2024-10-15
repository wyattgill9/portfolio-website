const projects = (args, flags, navigate) => {
    if (flags['-o']) navigate('/projects');
    else return ["Project 1: [Link to Project 1](#)", "Project 2: [Link to Project 2](#)", "Project 3: [Link to Project 3](#)"];
  };
  
  export default projects;
  