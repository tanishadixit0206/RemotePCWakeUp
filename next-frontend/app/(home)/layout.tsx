import AuthProvider from "@/auth/AuthProvider";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
        <AuthProvider>{children}</AuthProvider>
  );
}
