import { Toast, useToast as useHookToast } from "@/components/ui/toast"

export function useToast() {
  const { toast } = useHookToast()
  return { toast }
}