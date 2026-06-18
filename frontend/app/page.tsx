import { redirect } from "next/navigation";

export default function RootPage() {
  // Redireciona quem acessar a raiz direto para o login
  redirect("/login");
}