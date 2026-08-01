"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function RecoveryHashHandler() {
  useEffect(() => {
    const parameters = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = parameters.get("access_token");
    const refreshToken = parameters.get("refresh_token");
    const type = parameters.get("type");

    if (type !== "recovery" || !accessToken || !refreshToken) return;

    // Remove credentials from the address bar and browser history immediately.
    window.history.replaceState(null, "", window.location.pathname + window.location.search);

    const supabase = createClient();
    void supabase.auth
      .setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error }) => {
        window.location.replace(error ? "/admin/login?error=invalid-recovery" : "/activate?recovery=1");
      });
  }, []);

  return null;
}
