const envVariables = { ...{ ...process.env }  };
console.log(envVariables)
export const env = { ...envVariables };
