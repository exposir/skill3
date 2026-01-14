// ============================================
// Shared React Hooks
// ============================================

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { debounce } from '@collab-saas/shared-utils'

// --- State Hooks ---

export function useToggle(initialValue = false): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle, setValue]
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const valueToStore = value instanceof Function ? value(prev) : value
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
      return valueToStore
    })
  }, [key])

  return [storedValue, setValue]
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

// --- Effect Hooks ---

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

export function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    const id = setTimeout(() => savedCallback.current(), delay)
    return () => clearTimeout(id)
  }, [delay])
}

export function useMount(effect: () => void | (() => void)): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}

export function useUnmount(cleanup: () => void): void {
  const cleanupRef = useRef(cleanup)
  cleanupRef.current = cleanup
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => cleanupRef.current(), [])
}

// --- DOM Hooks ---

export function useClickOutside<T extends HTMLElement>(
  handler: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return
      handler()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler])

  return ref
}

export function useWindowSize(): { width: number; height: number } {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }, 100)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

export function useScrollPosition(): { x: number; y: number } {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = debounce(() => {
      setPosition({ x: window.scrollX, y: window.scrollY })
    }, 50)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return position
}

// --- Async Hooks ---

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useAsync<T>(
  asyncFn: () => Promise<T>,
  deps: unknown[] = []
): AsyncState<T> & { execute: () => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null })
    try {
      const data = await asyncFn()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    execute()
  }, [execute])

  return { ...state, execute }
}

export function useFetch<T>(url: string, options?: RequestInit): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const abortController = new AbortController()

    const fetchData = async () => {
      setState({ data: null, loading: true, error: null })
      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        setState({ data, loading: false, error: null })
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setState({ data: null, loading: false, error: error as Error })
        }
      }
    }

    fetchData()

    return () => abortController.abort()
  }, [url, options])

  return state
}

// --- Form Hooks ---

export function useForm<T extends Record<string, unknown>>(
  initialValues: T
): {
  values: T
  errors: Partial<Record<keyof T, string>>
  handleChange: (name: keyof T, value: unknown) => void
  handleSubmit: (onSubmit: (values: T) => void) => (e: React.FormEvent) => void
  reset: () => void
  setError: (name: keyof T, error: string) => void
  clearErrors: () => void
} {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const handleChange = useCallback((name: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }, [])

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void) => (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(values)
    },
    [values]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  const setError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [])

  const clearErrors = useCallback(() => setErrors({}), [])

  return { values, errors, handleChange, handleSubmit, reset, setError, clearErrors }
}

// --- Clipboard Hook ---

export function useClipboard(): {
  copied: boolean
  copy: (text: string) => Promise<void>
} {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [])

  return { copied, copy }
}

// --- Keyboard Hook ---

export function useKeyPress(targetKey: string, handler: () => void): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        handler()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [targetKey, handler])
}

// --- Pagination Hook ---

export function usePagination(
  totalItems: number,
  itemsPerPage: number,
  initialPage = 1
): {
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  canNext: boolean
  canPrev: boolean
} {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(initialPage)

  const setPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }, [totalPages])

  const nextPage = useCallback(() => setPage(currentPage + 1), [currentPage, setPage])
  const prevPage = useCallback(() => setPage(currentPage - 1), [currentPage, setPage])

  return {
    currentPage,
    totalPages,
    setPage,
    nextPage,
    prevPage,
    canNext: currentPage < totalPages,
    canPrev: currentPage > 1,
  }
}

// --- Search Hook ---

export function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  delay = 300
): {
  query: string
  setQuery: (query: string) => void
  results: T[]
} {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, delay)

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return items
    const lowerQuery = debouncedQuery.toLowerCase()
    return items.filter(item =>
      searchFields.some(field => {
        const value = item[field]
        return typeof value === 'string' && value.toLowerCase().includes(lowerQuery)
      })
    )
  }, [items, searchFields, debouncedQuery])

  return { query, setQuery, results }
}
