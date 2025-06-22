import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
  IonLabel,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import {
  PhotoLibrary,
  LibraryItem,
} from "@awesome-cordova-plugins/photo-library";
import { chevronBack } from "ionicons/icons";

type AlbumType = {
  id: string;
  title: string;
};

const PhotoMRUpload: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [photosByAlbum, setPhotosByAlbum] = useState<
    Record<string, LibraryItem[]>
  >({});

  useEffect(() => {
    PhotoLibrary.requestAuthorization({ read: true, write: false })
      .then(() => {
        // Fetch albums
        return PhotoLibrary.getAlbums();
      })
      .then((albumList) => {
        setAlbums(albumList);

        // For each album, fetch its photos
        albumList.forEach((album) => {
          PhotoLibrary.getLibrary({
            album: album.title,
            thumbnailWidth: 512,
            thumbnailHeight: 384,
            quality: 0.8,
          }).then((library) => {
            setPhotosByAlbum((prev) => ({
              ...prev,
              [album.title]: library.library,
            }));
          });
        });
      })
      .catch((error) => {
        console.error("Permission or loading error:", error);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              mode="md"
              defaultHref="/uploadMedicalRecords"
              icon={chevronBack}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>Gallery Albums</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {albums.map((album) => (
          <div key={album.id}>
            <IonLabel style={{ fontWeight: "bold", marginTop: "16px" }}>
              {album.title}
            </IonLabel>
            {photosByAlbum[album.title]?.map((item, idx) => (
              <IonImg
                key={idx}
                src={item.thumbnailURL}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            ))}
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default PhotoMRUpload;
