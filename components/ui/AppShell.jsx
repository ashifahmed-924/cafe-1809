'use client';
import DialogProvider from '@/components/dialogs/DialogProvider';
import ScrollOrchestrator from '@/components/ui/ScrollOrchestrator';
import MotionDebugger from '@/components/ui/MotionDebugger';

/**
 * Client shell: dialog context, scene-handoff orchestrator (mounted AFTER the page so its
 * triggers are created last) and the dev-only motion debugger.
 */
export default function AppShell({ children }) {
  return (
    <DialogProvider>
      {children}
      <ScrollOrchestrator />
      <MotionDebugger />
    </DialogProvider>
  );
}
