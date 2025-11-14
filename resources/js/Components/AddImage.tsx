import React from 'react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

type Props = {
  images: any[]
  onChange: (images: any[]) => void
}

export default function AddImage({ images, onChange }: Props) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const objectUrlsRef = React.useRef<Array<string | null>>([])

  const addImage = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const updatedImages = [...images]
      for (let i = 0; i < files.length; i++) {
        updatedImages.push(files[i])
      }
      onChange(updatedImages)
    }
    // reset so selecting same file again will trigger change
    event.currentTarget.value = ''
  }

  const getPreviewSrc = (image: any, index: number) => {
    if (!image) return null
    if (image instanceof File) {
      if (!objectUrlsRef.current[index]) {
        objectUrlsRef.current[index] = URL.createObjectURL(image)
      }
      return objectUrlsRef.current[index]
    }
    if (typeof image === 'string') return image
    return null
  }

  const handleReplaceFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files
    if (files && files[0]) {
      const updatedImages = [...images]
      if (objectUrlsRef.current[index]) {
        try {
          URL.revokeObjectURL(objectUrlsRef.current[index]!)
        } catch (e) {
          /* ignore */
        }
        objectUrlsRef.current[index] = null
      }
      updatedImages[index] = files[0]
      objectUrlsRef.current[index] = URL.createObjectURL(files[0])
      onChange(updatedImages)
    }
    event.currentTarget.value = ''
  }

  const removeImage = (index: number) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    if (objectUrlsRef.current[index]) {
      try {
        URL.revokeObjectURL(objectUrlsRef.current[index]!)
      } catch (e) {
        /* ignore */
      }
    }
    objectUrlsRef.current.splice(index, 1)
    onChange(updatedImages)
  }

  // cleanup object URLs on unmount
  React.useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((u) => {
        if (u) {
          try {
            URL.revokeObjectURL(u)
          } catch (e) {
            /* ignore */
          }
        }
      })
      objectUrlsRef.current = []
    }
  }, [])

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={addImage}
        className="h-20 w-20 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <PlusIcon className="h-8 w-8" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelection}
      />

      {images.map((image: any, index: number) => {
        const previewSrc = getPreviewSrc(image, index)
        const fileName =
          image instanceof File
            ? image.name
            : typeof image === 'string'
            ? image.split('/').pop()
            : `Imagen ${index + 1}`
        return (
          <div
            key={index}
            className="mb-4 flex items-center gap-4 relative"
          >
            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
              {previewSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewSrc}
                  alt={fileName}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-xs text-gray-500">Sin preview</span>
              )}
            </div>

            <div className="absolute right-1 top-1 bg-white rounded-full h-6 w-6 flex items-center justify-center">
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="text-sm text-red-600 hover:underline"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
