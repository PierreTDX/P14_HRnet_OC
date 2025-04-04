fetch('generated_users.json')
  .then(response => response.json())
  .then(employees => {
    localStorage.setItem('employees', JSON.stringify(employees));
  })
  .catch(error => {
    console.error("Erreur lors du chargement des employés :", error);
  });