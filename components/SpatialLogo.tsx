import Image from 'next/image';

/** Two readable faces and four edges preserve the original brand artwork. */
export default function SpatialLogo() {
  return <div className="spatial-logo" role="img" aria-label="Botmate">
    <div className="spatial-logo-object" aria-hidden="true">
      <div className="spatial-logo-face spatial-logo-front"><Image src="/media/botmate-wordmark.png" alt="" width={978} height={178} sizes="320px" /></div>
      <div className="spatial-logo-face spatial-logo-back"><Image src="/media/botmate-wordmark.png" alt="" width={978} height={178} sizes="320px" /></div>
      <i className="spatial-logo-edge spatial-logo-top"/><i className="spatial-logo-edge spatial-logo-bottom"/>
      <i className="spatial-logo-edge spatial-logo-left"/><i className="spatial-logo-edge spatial-logo-right"/>
    </div>
    <div className="spatial-logo-shadow" aria-hidden="true"/>
  </div>;
}
