import API from './api';

export const signUp = async (data: { username: string; email: string; password: string }) => {
  const response = await API.post('/auth/signup', data);
  return response.data.data;
};

export const signIn = async (data: { email: string; password: string }) => {
  const response = await API.post('/auth/signin', data);
  return response.data.data;
};
