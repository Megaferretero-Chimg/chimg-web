import Image from "next/image";
import styles from "./page.module.scss";

export const metadata = {
  title: "Video de presentación",
  description: "Conoce CHIMG a través de nuestro video de presentación.",
};

// Public delivery URLs only; Cloudinary credentials stay in the local environment.
const videoUrl = "https://res.cloudinary.com/djljgsbz3/video/upload/v1791765379/chimg/presentacion/video-chimg-c69e0ba0.mp4";

export default function VideoPage() {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.presentation}>
        <Image
          className={styles.logo}
          src="/logo-chimg-w.svg"
          alt="CHIMG"
          width={897}
          height={399}
          priority
        />
        <div className={styles.frame}>
          <video
            className={styles.video}
            controls
            playsInline
            preload="metadata"
            poster="/videos/chimg-poster.jpg"
            width={1920}
            height={1080}
            aria-label="Video de presentación de CHIMG"
          >
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no permite reproducir este video. <a href={videoUrl}>Abrir video</a>.
          </video>
        </div>
      </div>
    </main>
  );
}
