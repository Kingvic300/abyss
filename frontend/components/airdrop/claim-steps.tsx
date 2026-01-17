import React from "react";

/**
 * Server component for displaying claim steps
 * No "use client" needed - static content only
 */
export function ClaimSteps() {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-white mb-3">How to claim</h3>
      <ol className="space-y-2 text-sm">
        <li className="flex gap-3 text-gray-300">
          <span className="text-gray-600 shrink-0">1.</span>
          <span>Click "Claim Now" to start</span>
        </li>
        <li className="flex gap-3 text-gray-300">
          <span className="text-gray-600 shrink-0">2.</span>
          <span>Connect with Google</span>
        </li>
        <li className="flex gap-3 text-gray-300">
          <span className="text-gray-600 shrink-0">3.</span>
          <span>Receive tokens instantly</span>
        </li>
      </ol>
    </div>
  );
}
