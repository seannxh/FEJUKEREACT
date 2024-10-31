import TrackList from "../TrackList/TrackList.jsx";

const Home = ({tracks}) => {

  return (
    <main>
      <h1>Welcome to Trackify!</h1>
      <h3>Hello, you are on the landing page for Trackify!</h3>
      <h5>
        Listen to new tracks on the latest app with the best quality! Sign up for free to get access right away!
      </h5>

      <TrackList tracks={tracks}/>
    </main>
  );
}

export default Home;
