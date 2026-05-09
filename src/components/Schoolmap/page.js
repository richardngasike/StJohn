import styles from './Map.module.css';

export default function SchoolMap() {
  return (
    <div className="mapWrapper">
      <div className="mapHeader">
        <h3>Find St Johns Training College</h3>
        <p>Maralal, Samburu County, Kenya</p>
      </div>

      <div className="mapContainer">
        <iframe
          src="https://www.google.com/maps?q=St%20Johns%20Training%20College%20Maralal&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title="St Johns Training College Location"
        ></iframe>
      </div>

      <div className="mapFooter">
        <a
          href="https://maps.app.goo.gl/xo8QvgqSt3jderKK8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps →
        </a>
      </div>
    </div>
  );
}