// src/seller/hooks/useInactivityLogout.ts
import { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes in milliseconds
const WARNING_BEFORE = 60 * 1000;        // Show warning 1 minute before logout

export const useInactivityLogout = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAllTimers = () => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    if (warningTimer.current) clearTimeout(warningTimer.current);
    if (countdownInterval.current) clearInterval(countdownInterval.current);
  };

  const handleLogout = async () => {
    clearAllTimers();
    setShowWarning(false);
    await signOut(auth);
  };

  const resetTimers = () => {
    clearAllTimers();
    setShowWarning(false);
    setSecondsLeft(60);

    // Show warning 1 minute before logout
    warningTimer.current = setTimeout(() => {
      setShowWarning(true);
      setSecondsLeft(60);

      // Start countdown
      countdownInterval.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, INACTIVITY_LIMIT - WARNING_BEFORE);

    // Auto logout after full inactivity limit
    logoutTimer.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    // Events that count as activity
    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleActivity = () => resetTimers();

    // Start timers on mount
    resetTimers();

    // Listen for activity
    activityEvents.forEach((event) =>
      window.addEventListener(event, handleActivity)
    );

    // Cleanup on unmount
    return () => {
      clearAllTimers();
      activityEvents.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, []);

  return { showWarning, secondsLeft, resetTimers, handleLogout };
};