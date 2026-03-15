"use client";

import { useEffect } from "react";
import { clarity } from "@microsoft/clarity";
import { initFirebaseServices } from "@/lib/firebase";

export default function Analytics() {
  useEffect(() => {
    const clarityId = "vuh584t40j";
    
    // Initialize Microsoft Clarity
    clarity.init(clarityId);
    
    // Initialize Firebase Analytics and other services
    initFirebaseServices();
  }, []);

  return null;
}
