'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface SubmitButtonProps {
  children: React.ReactNode
  formAction?: (formData: FormData) => void
  className?: string
}

export function SubmitButton({ children, formAction, className }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      formAction={formAction}
      disabled={pending}
      className={className}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Please wait...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
