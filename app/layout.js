export const metadata = {
  title: "INNOUT RECORD",
  description: "농구 기록 앱",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
