"use client";

// Site-wide "Edit mode" for admins. When on, editable text (<SiteText/>) and
// photos (<SiteImage/>) become click-to-edit right on the page, so an admin can
// browse any tab and change copy or swap images in place. The toggle lives in
// the floating AdminEditBar (admins only). State persists in localStorage so it
// survives navigation between pages.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const KEY = "gtre_edit_mode";

type EditModeCtx = { editMode: boolean; setEditMode: (v: boolean) => void };
const Ctx = createContext<EditModeCtx>({ editMode: false, setEditMode: () => {} });

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setState] = useState(false);

  useEffect(() => {
    try {
      setState(localStorage.getItem(KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  const setEditMode = (v: boolean) => {
    setState(v);
    try {
      localStorage.setItem(KEY, v ? "1" : "0");
    } catch {
      /* ignore */
    }
  };

  return <Ctx.Provider value={{ editMode, setEditMode }}>{children}</Ctx.Provider>;
}

export function useEditMode() {
  return useContext(Ctx);
}
