export interface AlbumResponse {
	album: Album;
	error: string;
}

interface Album {
	name: string,
	artist: string,
	playcount: number,
	image: string
}
