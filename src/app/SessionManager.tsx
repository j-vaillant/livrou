"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

type LivrouSessionStatus = "authenticated" | "unauthenticated";

type LivrouSession = {
  logOut: () => void;
  data: Session | null;
  status: LivrouSessionStatus;
};

export const SessionContext = createContext({} as LivrouSession);

export const useCurrentSession = () => {
  return useContext(SessionContext);
};

const fetchSession = async (): Promise<Session | null> => {
  return await getSession();
};

const SessionManager: FC<PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<LivrouSessionStatus>("unauthenticated");
  const pathName = usePathname();

  useEffect(() => {
    if (session) {
      return;
    }

    const retrieveSession = async () => {
      try {
        const sessionData = await fetchSession();
        if (sessionData) {
          setSession(sessionData);
          setStatus("authenticated");
          return;
        }
      } catch {
        setStatus("unauthenticated");
      }
    };

    retrieveSession();
  }, [pathName, session]);

  const logOut = async () => {
    await signOut();
    setSession(null);
    setStatus("unauthenticated");
  };

  return (
    <>
      <SessionContext.Provider value={{ logOut, data: session, status }}>
        {children}
      </SessionContext.Provider>
    </>
  );
};

export default SessionManager;
