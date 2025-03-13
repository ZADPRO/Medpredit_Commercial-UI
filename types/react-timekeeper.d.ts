declare module 'react-timekeeper' {
    import React from 'react';
  
    interface TimeKeeperProps {
      time: string;
      onChange: (newTime: { formatted: string, formatted24: string, hour: number, minute: number }) => void;
      switchToMinuteOnHourSelect?: boolean;
      onDoneClick?: () => void; 
      coarseMinutes?: number;
      forceCoarseMinutes?: boolean;
      closeOnMinuteSelect?: boolean;
      doneButton?: boolean;
      showTimezone?: boolean;
      hour24Mode?: boolean;
    }
  
    const TimeKeeper: React.FC<TimeKeeperProps>;
  
    export default TimeKeeper;
  }
  