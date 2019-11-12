function singular(s) {
  if (s.substr(s.length - 3) === 'ies') return s.substr(0, s.length - 3) + 'y';
  if (s.charAt(s.length - 1) === 's') return s.substr(0, s.length - 1);
  return s;
}

module.exports =  {
  prompt: ({prompter, args}) => {
    return new Promise((resolve, reject) => {
      if (!args.duck) {
        prompter.prompt({
          type: 'input',
          name: 'duck',
          message: 'Name of the duck (users, orders, summary, ...)?',
        }).then(values => {
          resolve({...args, ...values})
        });
      } else {
        resolve({...args});
      }
    }).then(values => {
      const duckSingular = singular(values.duck);
      const duckUcFirst = duckSingular.charAt(0).toUpperCase() + duckSingular.substr(1);
      const duckUpcase = duckSingular.toUpperCase();
      return prompter.prompt({
        type: 'form',
        name: 'names',
        message: 'Do these look alright for you?',
        choices: [
          {name: 'duckModel', message:'Duck model', initial: duckUcFirst},
          {name: 'duckActions', message:'Duck actions', initial: duckUcFirst + 'Actions'},
          {name: 'duckTypes', message:'Duck action types (enum)', initial: duckUcFirst + 'Types'},
          {name: 'duckSelectors', message:'Duck selectors', initial: duckUcFirst + 'Selectors'},
          {name: 'duckState', message:'Duck state', initial: duckUcFirst + 'State'},
        ]
      }).then(previous => ({...values, ...previous.names, duckSingular, duckUpcase, duckUcFirst}));
    });
  }
}
