import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useAxiosUploader(config: {
  url: string
  manual?: boolean
}) {
  const [progress, setProgress] = useState(0)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const [loading, setBusy] = useState(null)

  const onUploadProgress = (callback) => {
    return (event) => {
      const percentCompleted = Math.round((event.loaded * 100) / event.total)
      callback && callback(percentCompleted)
    }
  }

  const upload = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    axios

      .post(config.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onUploadProgress(setProgress),
      })
      .then((result) => {
        setData(result)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setBusy(false)
        setProgress(0)
        setFile(null)
      })
  }

  const uploadFile = (file: File) => {
    setFile && setFile(file)
  }

  useEffect(() => {
    if (file) {
      upload(file as unknown as File)
    }
  }, [file])
  return [
    {
      progress,
      data,
      error,
      loading,
    },
    uploadFile,
  ] as const
}
