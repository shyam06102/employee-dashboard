const EMPLOYEES_KEY = 'employees';

export const getEmployees = () => {
  const data = localStorage.getItem(EMPLOYEES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEmployees = (employees) => {
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
};

if (!localStorage.getItem(EMPLOYEES_KEY)) {
  saveEmployees([
    {
      id: 1,
      fullName: 'John Doe',
      gender: 'Male',
      dob: '1990-05-15',
      state: 'California',
      status: true,
      imageUrl: ''
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      gender: 'Female',
      dob: '1985-11-22',
      state: 'Texas',
      status: false,
      imageUrl: ''
    }
  ]);
}