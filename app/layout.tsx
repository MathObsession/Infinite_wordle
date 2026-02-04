import './globals.css'

export const metadata = {
  title: 'Infinite Wordle',
  description: 'A fun Wordle game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
