import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Loader } from 'lucide-react';

const ServerStatus: React.FC = () => {
  const [isServerLive, setIsServerLive] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  const checkServerStatus = async () => {
    try {
      const response = await fetch('https://ai-travel-agent-d8wv.onrender.com/health', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setIsServerLive(response.ok);
    } catch (error) {
      console.error('Server status check failed:', error);
      setIsServerLive(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkServerStatus();
    
    // Check server status every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (isChecking) return 'bg-yellow-500';
    if (isServerLive) return 'bg-green-500';
    return 'bg-red-500';
  };

  const getStatusIcon = () => {
    if (isChecking) return <Loader className="w-4 h-4 animate-spin" />;
    if (isServerLive) return <Wifi className="w-4 h-4" />;
    return <WifiOff className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (isChecking) return 'Checking...';
    if (isServerLive) return 'Server Live';
    return 'Server Offline';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg text-white font-medium ${getStatusColor()}`}>
        {getStatusIcon()}
        <span className="text-sm">{getStatusText()}</span>
      </div>
    </div>
  );
};

export default ServerStatus; 