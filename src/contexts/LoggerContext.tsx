import * as React from 'react';
import { createContext, useReducer, useContext, ReactNode } from 'react';

interface LoggerState {
  id: string;
  center: { x: number, y: number };
}

type LoggerAction =
  | { type: 'ADD_LOGGER'; id: string; center: { x: number, y: number } }
  | { type: 'UPDATE_LOGGER'; id: string; center: { x: number, y: number } }
  | { type: 'REMOVE_LOGGER'; id: string };

interface LoggerContextType {
  state: LoggerState[];
  dispatch: React.Dispatch<LoggerAction>;
}

const LoggerContext = createContext<LoggerContextType | undefined>(undefined);

const loggerReducer = (state: LoggerState[], action: LoggerAction): LoggerState[] => {

  switch (action.type) {
    case 'ADD_LOGGER':
      return [...state, { id: action.id, center: action.center }];
    case 'UPDATE_LOGGER':
      return state.map(logger =>
        logger.id === action.id ? { ...logger, center: action.center } : logger
      );
    case 'REMOVE_LOGGER':
      return state.filter(logger => logger.id !== action.id);
    default:
      return state;
  }
};

export const LoggerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(loggerReducer, []);
  return (
    <LoggerContext.Provider value={{ state, dispatch }}>
      {children}
    </LoggerContext.Provider>
  );
};

export const useLoggerContext = () => {
  const context = useContext(LoggerContext);
  console.log(context?.state)
  if (!context) throw new Error('useLoggerContext must be used within LoggerProvider');
  return context;
};
