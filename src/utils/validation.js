export const validateEmployee = (data) => {
  const errors = {};
  if (!data.fullName.trim()) errors.fullName = 'Full name is required';
  if (!data.dob) errors.dob = 'Date of birth is required';
  if (!data.state.trim()) errors.state = 'State is required';
  return errors;
};