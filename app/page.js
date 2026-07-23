import PantallaCarga from '@/components/PantallaCarga';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuienesSomos from '@/components/QuienesSomos';
import NuestraEmpresa from '@/components/NuestraEmpresa';
import Productos from '@/components/Productos';
import PorQueElegirnos from '@/components/PorQueElegirnos';
import Galeria from '@/components/Galeria';
import FormularioCotizacion from '@/components/FormularioCotizacion';
import MapaContacto from '@/components/MapaContacto';
import Footer from '@/components/Footer';
import BotonesFlotantes from '@/components/BotonesFlotantes';
import ChatBot from '@/components/ChatBot';

// ============================================================
// Página principal: la landing completa con todas las
// secciones en orden. Cada sección vive en su propio
// componente dentro de /components.
// ============================================================
export default function Home() {
  return (
    <>
      {/* Pantalla de carga con los logos (se desvanece al cargar) */}
      <PantallaCarga />
      <Navbar />
      <main>
        <Hero />
        <QuienesSomos />
        <NuestraEmpresa />
        <Productos />
        <PorQueElegirnos />
        <Galeria />
        <FormularioCotizacion />
        <MapaContacto />
      </main>
      <Footer />
      <BotonesFlotantes />
      {/* Asistente virtual con IA (chat) */}
      <ChatBot />
    </>
  );
}
