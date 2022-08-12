import { createContext } from 'react';
import { todoContext } from '../types/types';

export const TodosContext = createContext<todoContext | null>(null);
