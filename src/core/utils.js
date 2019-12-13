export const usernameValidator = username => {
  const re = /\S+@\S+\.\S+/;

  if (!username || username.length <= 0) return 'Username cannot be empty.';
  // if (!re.test(username)) return 'Ooops! We need a valid username address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};
