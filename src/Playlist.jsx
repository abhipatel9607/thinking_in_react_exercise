/* eslint-disable react/prop-types */
import React from "react";
import "./Playlist.css";

const INITIAL_VIDEO_ITEMS = [
	{
		id: 1,
		title: "video1",
		url: "https://youtube.com/v/e9r9349394",
		isMarkedAsCompleted: true,
		length: 300,
	},
	{
		id: 2,
		title: "video2",
		url: "https://youtube.com/v/e9r9349394",
		isMarkedAsCompleted: true,
		length: 300,
	},
	{
		id: 3,
		title: "video3",
		url: "https://youtube.com/v/e9r9349394",
		isMarkedAsCompleted: false,
		length: 300,
	},
	{
		id: 4,
		title: "video4",
		url: "https://youtube.com/v/e9r9349394",
		isMarkedAsCompleted: false,
		length: 300,
	},
	{
		id: 5,
		title: "video5",
		url: "https://youtube.com/v/e9r9349394",
		isMarkedAsCompleted: false,
		length: 300,
	},
	{
		id: 6,
		title: "video6",
		url: "https://youtube.com/v/e9r9349394",
		isMarkedAsCompleted: false,
		length: 300,
	},
];

export default function Playlist() {
	const [videoItems, setVideoItems] = React.useState(INITIAL_VIDEO_ITEMS);
	const [currentVideoId, setCurrentVideoId] = React.useState(3);

	function onVideoSelected(videoId) {
		setCurrentVideoId(videoId);
	}

	const currentVideo = videoItems.find(
		(videoItem) => videoItem.id === currentVideoId
	);

	return (
		<div className="playlist">
			<header>
				<h1 className="playlist-heading">Playlist</h1>
			</header>
			<div className="content-container">
				<main>
					<CurrentVideoTitle video={currentVideo} />
					<VideoPlayer
						video={currentVideo}
						setCurrentVideoId={setCurrentVideoId}
						videoItems={videoItems}
						setVideoItems={setVideoItems}
					/>
				</main>
				<Sidebar
					videoItems={videoItems}
					currentVideoId={currentVideoId}
					setCurrentVideoId={onVideoSelected}
				/>
			</div>
		</div>
	);
}

function CurrentVideoTitle({ video }) {
	return <div className="current-video-title">{video.title}</div>;
}

function VideoPlayer({ video, videoItems, setVideoItems, setCurrentVideoId }) {
	function handleMarkAsComplete() {
		const updatedVideoItems = videoItems.map((videoItem) => {
			if (videoItem.id === video.id) {
				videoItem.isMarkedAsCompleted = true;
			}
			return videoItem;
		});
		setVideoItems(updatedVideoItems);
	}
	return (
		<div className="video-player-container">
			<div>Video Player</div>
			<div>
				<pre>
					<code>{JSON.stringify(video, null, 4)}</code>
				</pre>
			</div>
			<div className="buttons">
				<button
					onClick={() => {
						setCurrentVideoId(video.id >= 2 ? video.id - 1 : video.id);
					}}
				>
					Previous
				</button>
				<button onClick={handleMarkAsComplete}>Mark Video As completed</button>
				<button
					onClick={() =>
						setCurrentVideoId(video.id <= 5 ? video.id + 1 : video.id)
					}
				>
					Next
				</button>
			</div>
		</div>
	);
}

function Sidebar({ videoItems, currentVideoId, setCurrentVideoId }) {
	return (
		<div className="sidebar">
			<WatchedVideosProgress videoItems={videoItems} />
			<VideoItemList
				videoItems={videoItems}
				currentVideoId={currentVideoId}
				setCurrentVideoId={setCurrentVideoId}
			/>
		</div>
	);
}

function WatchedVideosProgress({ videoItems }) {
	const totalVideos = videoItems.length;
	const watchedVideos = videoItems.filter(
		(video) => video.isMarkedAsCompleted
	).length;
	return (
		<div className="watched-videos-progress">
			{watchedVideos} video watched of {totalVideos}
		</div>
	);
}

function VideoItemList({ videoItems, currentVideoId, setCurrentVideoId }) {
	return (
		<div className="video-item-list">
			<ul>
				{videoItems.map((item) => {
					let activeClassName = item.id === currentVideoId ? "active-item" : "";
					function handleClick() {
						setCurrentVideoId(item.id);
					}
					return (
						<li
							key={item.id}
							className={`${activeClassName}`}
							onClick={handleClick}
						>
							{item.title}
							{item.isMarkedAsCompleted && (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="1em"
									viewBox="0 0 448 512"
								>
									<style>{`svg{fill:#000000}`}</style>
									<path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
								</svg>
							)}{" "}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
