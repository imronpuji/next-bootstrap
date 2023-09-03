const defaultCallback = (url: any) => url
export const widgetCloudinary = (cb = defaultCallback, folderName = "client") => {
  const loadWindow: any = window
  loadWindow.widgetCloudinary = loadWindow.cloudinary.createUploadWidget(
    {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
      uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
      folder: `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/${folderName}`,

      autoMinimize: true,
      cropping: true,
      croppingShowDimensions: true,
      singleUploadAutoClose: true,
    },
    (
      error: string | null | undefined,
      result: {
        event: string
        info: {
          url: string
        }
      }
    ) => {
      if (!error && result && result.event === "success") {
        cb(result?.info?.url)
      }
    }
  )
}
