"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityComponent({ projectId }: { projectId: string }) {
  useEffect(() => {
    if (projectId) {
      Clarity.init(projectId);
    }
  }, [projectId]);

  return null;
}
