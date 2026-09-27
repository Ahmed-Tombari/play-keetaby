import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'متعة التعلم، تعلم، ألعب، واكتشف',
    short_name: 'متعة التعلم',
    description: 'موقع تفاعلي لتعليم الأطفال الحروف العربية والأرقام، بالصوت والصورة.',
    start_url: '/',
    display: 'fullscreen',
    orientation: 'landscape',
    background_color: '#14183C',
    theme_color: '#14183C',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
