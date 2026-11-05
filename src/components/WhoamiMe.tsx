import { QRCodeSVG } from 'qrcode.react';
import portrait from '../assets/about/yaroslav.jpg';

const LINKEDIN_URL = 'https://www.linkedin.com/in/yarik-yermilov/';

/** Photo, LinkedIn handle and a live LinkedIn QR — the «whoami» column, also reused on the
 *  final slide so the closing QR matches the bio (and never goes stale like a screenshot). */
export function WhoamiMe() {
  return (
    <div className="whoami__me">
      <img className="whoami__photo" src={portrait} alt="Yaroslav Yermilov" />
      <div className="whoami__handle">
        <span className="whoami__in" aria-hidden="true">in</span>
        <span>yarik-yermilov</span>
      </div>
      <div className="whoami__qr-slot">
        <div className="whoami__qr">
          <QRCodeSVG value={LINKEDIN_URL} size={440} bgColor="transparent" fgColor="currentColor" level="M" />
        </div>
      </div>
    </div>
  );
}
