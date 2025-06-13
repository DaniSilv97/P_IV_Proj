import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import PropTypes from 'prop-types';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const socketRef = useRef(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (user && !socketRef.current) {
      socketRef.current = io('http://localhost:5000', {
        withCredentials: true,
      });

      socketRef.current.on('connect', () => {
        console.log('Socket connected');
      });

      socketRef.current.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      socketRef.current.on('weather_update', (data) => {
        console.log('Weather update from server:', data);
        setWeather(data);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, weather }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSocket = () => useContext(SocketContext);
