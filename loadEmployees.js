if (!localStorage.getItem('employees')) {
  fetch('generated_users.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then(employees => {
      localStorage.setItem('employees', JSON.stringify(employees));
    })
    .catch(error => {
      console.error("Erreur lors du chargement des employés :", error);
    });
};