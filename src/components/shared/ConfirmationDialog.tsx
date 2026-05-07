import { useEffect, useRef } from 'react'

type ConfirmationDialogProps = {
  cancelLabel?: string
  confirmLabel?: string
  isOpen: boolean
  message: string
  onCancel: () => void
  onConfirm: () => void
  title: string
}

export function ConfirmationDialog({
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  isOpen,
  message,
  onCancel,
  onConfirm,
  title,
}: ConfirmationDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    cancelButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onCancel])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm">
      <div
        aria-describedby="confirmation-dialog-message"
        aria-modal="true"
        className="w-full max-w-md rounded-[1.5rem] border border-white/10 bg-ink p-6 shadow-2xl shadow-black/40"
        role="dialog"
      >
        <h2 className="font-display text-2xl font-black tracking-[-0.04em] text-white">
          {title}
        </h2>
        <p id="confirmation-dialog-message" className="mt-3 text-sm leading-6 text-white/62">
          {message}
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/72 transition hover:bg-white/6 hover:text-white"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full border border-coral/25 bg-coral/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-coral"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
