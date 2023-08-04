import { useContext } from 'react';
import { EnvVariablesContext } from '../contexts/EnvVariablesContext';

// This is just a boilerplate hook to expose the Environment Variables context
// to the rest of your app.

export const useEnvVariables = () => useContext(EnvVariablesContext);
