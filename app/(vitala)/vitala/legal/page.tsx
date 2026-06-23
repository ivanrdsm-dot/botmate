import { vitala } from "@/lib/vitala/brand";

export const metadata = { title: "Aviso de salud y privacidad" };

export default function Legal() {
  return (
    <article className="prose-invert mx-auto max-w-2xl space-y-6 text-sm leading-relaxed opacity-90">
      <h1 className="text-3xl font-bold">Aviso de salud y privacidad</h1>

      <section>
        <h2 className="text-lg font-semibold" style={{ color: vitala.colors.brandLight }}>1. Carácter informativo</h2>
        <p>
          {vitala.name} es una herramienta educativa de orientación nutricional y de
          bienestar. <strong>No realiza diagnósticos médicos, no prescribe
          tratamientos y no sustituye</strong> la valoración de un médico,
          nutriólogo o profesional de la salud calificado.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold" style={{ color: vitala.colors.brandLight }}>2. Antes de seguir un plan</h2>
        <p>
          Consulta a un profesional de la salud antes de iniciar cualquier plan
          alimentario, especialmente si tienes alguna condición médica, estás
          embarazada o en lactancia, tomas medicamentos, o eres menor de edad.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold" style={{ color: vitala.colors.brandLight }}>3. Alergias e intolerancias</h2>
        <p>
          Filtramos las recomendaciones según los alérgenos que declares, pero
          tú eres responsable de verificar los ingredientes de cada alimento.
          Ante cualquier reacción, suspende y busca atención médica.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold" style={{ color: vitala.colors.brandLight }}>4. Privacidad</h2>
        <p>
          Tus datos de salud se almacenan localmente en tu dispositivo. No los
          vendemos ni los compartimos. Si en el futuro activas la sincronización
          en la nube, será de forma cifrada y con tu consentimiento explícito,
          conforme a normativas como GDPR y la legislación local de protección de
          datos.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold" style={{ color: vitala.colors.brandLight }}>5. Emergencias</h2>
        <p>
          {vitala.name} no es un servicio de emergencia. Si presentas síntomas
          graves o una crisis, contacta de inmediato a los servicios de
          emergencia de tu país.
        </p>
      </section>
    </article>
  );
}
