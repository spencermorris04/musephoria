// app/screenplay/page.tsx
import { getServerAuthSession } from "~/server/auth";
import PDFConverterForm from "./PDFConverterForm";
import ClientWrapper from "./ClientWrapper";

export default async function PDFConverterPage() {
  const session = await getServerAuthSession();

  return (
    <ClientWrapper session={session}>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">PDF to Text Converter</h1>
        <PDFConverterForm />
      </main>
    </ClientWrapper>
  );
}