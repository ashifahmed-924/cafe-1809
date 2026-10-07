'use client';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ReservationDialog from './ReservationDialog';
import GiftCardDialog from './GiftCardDialog';
import MembershipDialog from './MembershipDialog';
import DishDialog from './DishDialog';
import LightboxDialog from './LightboxDialog';

const DialogContext = createContext({ open: () => {}, close: () => {} });
export const useDialogs = () => useContext(DialogContext);

/** UI-only dialogs. Nothing is submitted anywhere. */
export default function DialogProvider({ children }) {
  const [current, setCurrent] = useState(null);
  const open = useCallback((name, props = {}) => setCurrent({ name, props }), []);
  const close = useCallback(() => setCurrent(null), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <DialogContext.Provider value={value}>
      {children}
      {current?.name === 'reservation' && <ReservationDialog onClose={close} />}
      {current?.name === 'gift' && <GiftCardDialog onClose={close} />}
      {current?.name === 'membership' && <MembershipDialog onClose={close} />}
      {current?.name === 'dish' && <DishDialog onClose={close} {...current.props} />}
      {current?.name === 'photo' && <LightboxDialog onClose={close} {...current.props} />}
    </DialogContext.Provider>
  );
}
