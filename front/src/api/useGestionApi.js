import { useState } from 'react';

export function useGestionApi() {
  const [chargement, setChargement] = useState(false); 
  const [erreur, setErreur] = useState(null);

  const executer = (promesse) => {
    setChargement(true);
    setErreur(null);

    return promesse
      .finally(() => {
        setChargement(false); 
      })
      .catch((err) => {
        setErreur(err.message);
        throw err;
      });
  };

  return { chargement, erreur, executer };
}