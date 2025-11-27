import { AuthContext, AuthContextProvider } from "@/composables/authentication";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
        {children}
    </AuthContextProvider>
  );
}
