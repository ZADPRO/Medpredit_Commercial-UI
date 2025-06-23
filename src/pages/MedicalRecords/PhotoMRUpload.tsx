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
  IonSpinner,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import {
  PhotoLibrary,
  LibraryItem,
  AlbumItem,
} from "@awesome-cordova-plugins/photo-library";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions";
import { isPlatform } from "@ionic/react";

const PhotoMRUpload: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [photosByAlbum, setPhotosByAlbum] = useState<
    Record<string, LibraryItem[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!isPlatform("cordova") && !isPlatform("capacitor")) {
        alert("Run this on a real mobile device.");
        return;
      }

      try {
        await AndroidPermissions.requestPermission(
          AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
        );

        await PhotoLibrary.requestAuthorization({ read: true });

        const albumList = await PhotoLibrary.getAlbums();
        setAlbums(albumList);

        PhotoLibrary.getLibrary(undefined, undefined, {
          thumbnailWidth: 512,
          thumbnailHeight: 384,
          quality: 0.8,
        }).subscribe({
          next: (items: LibraryItem[]) => {
            const grouped: Record<string, LibraryItem[]> = {};
            albumList.forEach((album) => {
              grouped[album.title] = items.filter((item) =>
                item.albumIds?.includes(album.id)
              );
            });
            setPhotosByAlbum(grouped);
          },
          error: (err) => {
            console.error("PhotoLibrary error:", err);
            alert("Failed to load photos.");
          },
        });
      } catch (error) {
        console.error("Permission error:", error);
        alert("Storage permission required.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/uploadMedicalRecords"
              icon={chevronBack}
            />
          </IonButtons>
          <IonTitle>Gallery Albums</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <IonSpinner name="dots" />
        ) : (
          albums.map((album) => (
            <div key={album.id}>
              <IonLabel
                style={{
                  fontWeight: "bold",
                  marginTop: "16px",
                  display: "block",
                }}
              >
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
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default PhotoMRUpload;
